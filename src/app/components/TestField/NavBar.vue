<template>
    <nav>
        <v-app-bar dense app class="white" elevation="1">
            
            <v-app-bar-nav-icon 
                class="d-lg-none" 
                @click="hamburguer = !hamburguer"
            ></v-app-bar-nav-icon>

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

            <v-divider
                class="mx-2"
                inset
                vertical
            ></v-divider> 

            <v-row class="d-none d-lg-flex" align="center">
                <v-col cols="auto">
                    <v-btn @click="redirectToHome" text tile color="grey darken-2" class="px-2 mr-3">
                        <v-icon size="20" class="mr-1">{{ icons.mdiHome }}</v-icon>
                        {{ $t("navBar.home") }}
                    </v-btn>
                </v-col> 

                <!-- if connected  -->
                <v-row v-if = isConnected align="center" class="mr-1">
                    <v-btn @click="redirectToDashboard" text tile color="grey darken-2" class=" px-2 mr-3">
                        {{ $t("navBar.dashboard") }}
                    </v-btn>

                    <v-btn text tile color="grey darken-2" class=" px-2 mr-3">
                        <v-icon size="20" class="mr-1">{{ icons.mdiEmail }}</v-icon>
                        {{ $t("navBar.mail") }}
                    </v-btn>

                    <v-btn @click="redirectToCloudPage" text tile color="grey darken-2" class=" px-2 mr-3">
                        <v-icon size="20" class="mr-1">{{ icons.mdiCloud }}</v-icon>
                        {{ $t("navBar.cloud") }}
                    </v-btn>

                    <v-btn @click="redirectToTestField" text tile color="grey darken-2" class=" px-2">
                        {{ $t("navBar.test") }}
                    </v-btn>


                    <v-spacer></v-spacer>

                    <LocaleSelect/>


                    <div class="text-center mx-5">
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
                                <img v-if="userAvatar" 
                                    :src="userAvatar" 
                                    alt="user avatar"
                                    height="32"
                                    width="32"
                                    rounded-circle
                                />
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
                                        
                                            <img v-if="userAvatar" 
                                                :src="userAvatar" 
                                                alt="user avatar"
                                                height="70"
                                                width="70"
                                                rounded-circle
                                            />

                                            <v-avatar v-else
                                                class="avatar-name white--text my-4 text-uppercase"
                                                color="orange"
                                                size="70">
                                                {{ authenticatedUser.initials }}
                                            </v-avatar>
                                        </v-badge>
                                        
                                    </div>
                                    <div>
                                        <div class="name font-weight-medium">
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

                    
                    
                </v-row>

                <!-- if not connected : login -->
                <v-row v-else align="center" class="mr-1">
                    <v-spacer></v-spacer>
                    
                    <v-btn @click="redirectToLoginPage" text tile color="grey darken-3">
                        <v-icon >{{ icons.mdiLoginVariant }}</v-icon>
                        {{ $t("navBar.login") }}
                    </v-btn>
                        
                    <LocaleSelect/>
                </v-row>
            </v-row>
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
                            <v-list-item @click="redirectToHome">
                                <v-list-item-icon>
                                    <v-icon>mdi-home</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>{{ $t("navBar.home") }}</v-list-item-title>
                            </v-list-item>

                            <div v-if = isConnected>
                                <v-list-item @click="redirectToDashboard">
                                    <v-list-item-icon>
                                    <v-icon>{{ icons.mdiApps }}</v-icon>
                                </v-list-item-icon>
                                    <v-list-item-title>{{ $t("navBar.dashboard") }}</v-list-item-title>
                                </v-list-item>

                                <v-list-item @click="redirectToProfilePage">
                                    <v-list-item-icon>
                                        <v-icon>mdi-account</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title class="text-capitalize">{{authenticatedUser.prenom}}</v-list-item-title>
                                </v-list-item>

                                <v-list-item @click="onLogout">
                                    <v-list-item-icon>
                                        <v-icon>{{ icons.mdiLogoutVariant }}</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title>{{ $t("navBar.signout") }}</v-list-item-title>
                                </v-list-item>
                            </div>

                            <div v-else>
                                <v-list-item @click="redirectToLoginPage">
                                    <v-list-item-icon>
                                        <v-icon>{{ icons.mdiLoginVariant }}</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title>{{ $t("navBar.login") }}</v-list-item-title>
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
import { router } from '../../router';

@Component({
  components: {
    LocaleSelect
  }
})
export default class NavBar extends Vue{

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
    .edit-btn, .logout-btn{
        font-size: 12px;
        font-weight: 600;
        border: 1px solid #dadce0;
    }

</style>
