<template>
    <nav>
        <v-app-bar dense app class="white" elevation="1">
            
            <v-app-bar-nav-icon 
                class="d-lg-none" 
                @click="hamburguer = !hamburguer"
            ></v-app-bar-nav-icon>

            <div class="d-flex align-center">
                <v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2 ml-n2"
                    contain
                    src="@/assets/logoSC.png"
                    transition="scale-transition"
                    width="55"
                />
                <v-toolbar-title class="text-uppercase mr-3">
                    <span>Syma</span>
                    <span class="font-weight-light orange--text">School</span> 
                </v-toolbar-title>
            </div>

            <v-divider
                class="mx-2"
                inset
                vertical
            ></v-divider> 

            <div class="d-none d-lg-flex" id="contenantNav">
                <ul class="navBar" v-if= isConnected>
                    <router-link
                        tag="li"
                        v-for="item in navigationLinks.connectedMenu.largeScreen"
                        :key="item.title"
                        :to="{ name : item.to}"
                        exact
                    >{{item.title}}</router-link>
                </ul>

                <ul class="navBar" v-else>
                    <router-link
                        tag="li"
                        v-for="item in navigationLinks.disconnectedMenu"
                        :key="item.title"
                        :to="{ name : item.to}"
                    >{{item.title}}</router-link>
                </ul>

                <v-spacer></v-spacer>

                <div class="ml-3">
                    <LocaleSelect/>
                </div>

                <div class="text-center ml-5">
                    <v-menu
                        class="menu-profil"
                        v-model="profile"
                        :close-on-content-click="true"
                        offset-y 
                        nudge-bottom="22"
                        rounded="lg"
                        transition="slide-y-transition"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <!-- Si l'avatar a pu être récupéré on l'affiche -->
                            <img v-if="userAvatar" 
                                :src="userAvatar" 
                                alt="user avatar"
                                height="32"
                                width="32"
                                rounded-circle
                            />
                            <!-- Sinon on affiche la première lettre du prénom -->
                            <v-avatar v-else
                                class="white--text text-uppercase"
                                color="orange"
                                size="32"
                                v-bind="attrs"
                                v-on="on"
                            >
                            {{authenticatedUser.prenom[0]}}
                            </v-avatar>
                        </template>
                        <v-card class="profil-container d-flex flex-column text-center">
                            <div class="mx-4">
                                <div>
                                    <v-badge
                                        @click="redirectToProfilePage"
                                        icon="mdi-pencil"
                                        color="grey"
                                        bottom
                                        bordered
                                        offset-x="20"
                                        offset-y="35"
                                    >
                                        <!-- Si l'avatar a pu être récupéré on l'affiche -->
                                        <img v-if="userAvatar" 
                                            :src="userAvatar" 
                                            alt="user avatar"
                                            height="70"
                                            width="70"
                                            rounded-circle
                                        />
                                        <!-- Sinon on affiche les initiales -->
                                        <v-avatar v-else
                                            class="avatar-name white--text my-4 text-uppercase"
                                            color="orange"
                                            size="70">
                                            {{ authenticatedUser.initials }}
                                        </v-avatar>
                                    </v-badge>
                                    
                                </div>
                                <div>
                                    <div class="name font-weight-medium text-capitalize">
                                        {{authenticatedUser.prenom}} {{authenticatedUser.nom}}
                                    </div>
                                    <div class="email grey--text text--darken-2">
                                        {{authenticatedUser.email}}
                                    </div>
                                    <v-btn
                                        @click="redirectToProfilePage"
                                        class="edit-btn grey--text text--darken-2 text-capitalize my-4 mb-5"
                                        rounded
                                        outlined
                                        depressed
                                        small
                                    >
                                        {{ $t("navBar.editAccount") }}
                                    </v-btn>
                                </div>
                            </div>

                            <v-divider></v-divider>

                            <div>
                                <v-btn 
                                    @click="onLogout"
                                    class="logout-btn grey--text text--darken-2 text-capitalize my-4"
                                    outlined
                                    depressed
                                >
                                    {{ $t("navBar.signout") }}
                                </v-btn>
                            </div>

                        </v-card>
                    </v-menu>
                </div>

            </div>

            
        </v-app-bar>

        <v-navigation-drawer
            v-model="hamburguer"
            absolute
            temporary
        >
            <div class="boite d-flex flex-column justify-space-between">
                <div>
                    <div class="nav-top d-flex flex-row align-center ma-2">
                        <v-img
                            alt="Vuetify Logo"
                            class="shrink mr-2"
                            contain
                            src="@/assets/logoSC.png"
                            transition="scale-transition"
                            width="50"
                            />
                        <div class="symaschfont-weight-boldool text-uppercase ml-2">
                            Syma<span class="font-weight-light orange--text">School</span>
                        </div>
                    </div>

                    <v-divider></v-divider>

                    <v-list
                        nav
                        dense
                    >
                        <v-list-item-group
                            v-model="group"
                            active-class="orange--text text--accent-4"
                        >
                            <div v-if = isConnected>
                                <v-list-item
                                    v-for="item in navigationLinks.connectedMenu.smallScreen"
                                    :key="item.title"
                                    @click="item.redirectTo"
                                >
                                    <v-list-item-icon>
                                        <v-icon v-text="item.icon"></v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                </v-list-item>
                            </div>


                            <div v-else>
                                <v-list-item
                                    v-for="item in navigationLinks.disconnectedMenu"
                                    :key="item.title"
                                    @click="item.redirectTo"
                                >
                                    <v-list-item-icon>
                                        <v-icon v-text="item.icon"></v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                </v-list-item>
                            </div>
                        </v-list-item-group>
                    </v-list>
                </div>
                
                <div class="ml-3 mb-2">
                    <LocaleSelect/>
                </div>
            </div>
            
        </v-navigation-drawer>

    </nav>
</template>

<script lang="ts">
import { Component, Vue} from "vue-property-decorator";
import { mdiHome, mdiAccount, mdiLogoutVariant, mdiLoginVariant, mdiApps, mdiCloud, mdiEmail, } from '@mdi/js';

import { authStoreModule } from "@/app/store/auth";
import { RouteNameConstants } from "@/app/constants/RouteNameConstants";
import { RoleCodeConstants } from "@/app/constants/RoleCodeConstants";
import { AuthenticatedUser } from "@/app/models/auth/AuthenticatedUser";
import LocaleSelect from "./LocaleSelect.vue";
import { router } from '../router';

@Component({
  components: {
    LocaleSelect
  }
})
export default class NavBar extends Vue{
    
    navigationLinks = {
        connectedMenu : {
            largeScreen : [
                { title: this.$t("navBar.home"),to: RouteNameConstants.HOME, icon: mdiHome},
                { title: this.$t("navBar.dashboard"), to: RouteNameConstants.ADMIN_DASHBOARD, icon: mdiApps},
                { title: this.$t("navBar.mail"), to: RouteNameConstants.NOT_FOUND, icon: mdiEmail},
                { title: this.$t("navBar.cloud"), to: RouteNameConstants.CLOUD_PAGE, icon: mdiCloud},
                { title: this.$t("navBar.test"), to: RouteNameConstants.TEST_FIELD, icon: mdiApps}
            ],

            smallScreen : [
                { title: this.$t("navBar.home"), redirectTo: this.redirectToHome, icon: mdiHome},
                { title: this.$t("navBar.dashboard"), redirectTo: this.redirectToDashboard, icon: mdiApps},
                { title: this.$t("navBar.mail"), redirectTo: this.redirectToDashboard, icon: mdiEmail},
                { title: this.$t("navBar.cloud"), redirectTo: this.redirectToCloudPage, icon: mdiCloud},
                { title: this.$t("navBar.test"), redirectTo: this.redirectToTestField, icon: mdiApps},
                { title: this.getUserPrenom(), redirectTo: this.redirectToProfilePage, icon: mdiAccount},
                { title: this.$t("navBar.signout"), redirectTo: this.onLogout, icon: mdiLogoutVariant}
            ]
        },

        disconnectedMenu : [
            { title: this.$t("navBar.home"), to: RouteNameConstants.HOME, icon: mdiHome},
            { title: this.$t("navBar.login"), to: RouteNameConstants.LOGIN, icon: mdiLoginVariant},
        ]
    }


    //Gestion du responsive display
    hamburguer = false;
    group = null;

    //affichage du profil
    profile = false

    icons = {
            mdiHome,
            mdiAccount,
            mdiEmail,
            mdiCloud,
            mdiLogoutVariant,
            mdiLoginVariant,
            mdiApps
        };

    //Vérifier si l'utilisateur est connecté ou non
    get isConnected(): boolean {
        return authStoreModule.user ? true : false;
    }

    //Obtenir les données de l'utilisateur connecté
    get authenticatedUser(): AuthenticatedUser | null {
        return authStoreModule.user;
    }

    //Obtenir l'avatar de l'utilisateur (pas encore implémenté donc renvoie ses initiales)
    get userAvatar(): string | null {
    return authStoreModule.userAvatar ?? null;
    }

    getUserPrenom(){
        if(this.authenticatedUser != null){
            return this.authenticatedUser.prenom;
        }
        else {
            return "";
        }
    }

    //Fonction de déconnexion
    onLogout() {
        authStoreModule.logout();
        this.redirectToHome();
        this.profile = false
    }

    redirectToLoginPage() {
        router.push({name : RouteNameConstants.LOGIN});
    }

    redirectToHome() {
        router.push({name : RouteNameConstants.HOME});
    }

    redirectToProfilePage() {
        router.push({name : RouteNameConstants.PROFILE});
    }

    redirectToDashboard() {
        if (this.authenticatedUser != null){
			if(this.authenticatedUser.roles.includes(RoleCodeConstants.ADMIN)) {
				return router.push({name : RouteNameConstants.ADMIN_DASHBOARD});
			} else 
				return router.push({name : RouteNameConstants.ELEVE_PROF_DASHBOARD});

        }
        return router.push({name : RouteNameConstants.NOT_FOUND});
    } 

    redirectToCloudPage() {
        router.push({name : RouteNameConstants.CLOUD_PAGE});
    }

    redirectToTestField() {
        router.push({name : RouteNameConstants.TEST_FIELD});
    }
}
</script>

<style scoped>
    .boite{
        height: 100%;
    }

    .boite .symaschool{
        font-size: 1.1rem;
    }

    .profil-container{
        min-width: 300px;
    }
    .avatar-name{
        font-size: 35px;
        font-weight: 400;
    }
    .name{
        font-size: 16px;
    }
    .email{
        font-size: 14px;
        font-weight: 400;
    }
    .edit-btn, 
    .logout-btn{
        font-size: 12px;
        font-weight: 600;
        border: 1px solid #dadce0;
    }

    /* --NAVBAR-- */
    #contenantNav{
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
    }
    .navBar{
        list-style-type: none;
        font-weight: 500;
        margin: 0;
        padding: 0;
        display: flex;
        height: 100%;
    }
    .navBar li{
        margin: 0 10px 0 15px;
        cursor: pointer;
        color: rgb(139, 139, 139);
        border-bottom: 2px solid white;
        display: flex;
        align-items: center;
    }
    .navBar li:hover, 
    .navBar li.router-link-active{
        color: #ED8D00;
        border-bottom: 2px solid #ED8D00;
    }


</style>
