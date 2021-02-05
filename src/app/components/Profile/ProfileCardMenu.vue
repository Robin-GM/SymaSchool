<template>
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
</template>

<script lang="ts">
import { Component, Prop, Vue} from "vue-property-decorator";

import { authStoreModule } from "@/app/store/auth";
import { router } from '../../router';
import { RouteNameConstants } from "@/app/constants/RouteNameConstants";
import { AuthenticatedUser } from "@/app/models/auth/AuthenticatedUser";

@Component
export default class ProfileCarMenu extends Vue{
    
    @Prop({ type: Object, required: true})
    readonly authenticatedUser!: AuthenticatedUser;

    //affichage du profil
    profile = false

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

    redirectToHome() {
        router.push({name : RouteNameConstants.HOME});
    }

    redirectToProfilePage() {
        router.push({name : RouteNameConstants.PROFILE});
    }
}
</script>

<style scoped>
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
</style>