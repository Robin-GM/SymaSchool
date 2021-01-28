<template>
    <v-container >
        <v-row>
            <v-col cols="10" xl="6" lg="8" class="pa-10 mt-16 mx-auto">
                
                <v-card class="
                            d-flex
                            justify-space-between
                            align-center
                            py-4
                            px-7"
                            color="white">

                    <v-card class="
                            d-flex
                            align-center"
                            flat
                            width="400">

                        <div class="mr-4">
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
                        </div>

                        <div class="name text-capitalize ">
                                {{ authenticatedUser.prenom }}
                                {{ authenticatedUser.nom }}
                        </div>
                    </v-card>
                    
                    <div class="right">
                        <div class="change-avatar">
                            <v-btn
                                tile
                                depressed
                                outlined
                                color="orange"
                                disabled>
                                Change avatar
                            </v-btn>
                        </div>
                    </div>
                </v-card>

                <v-card class="mt-5 py-4 px-10" color="white">
                    <v-card-text class="pl-0 black--text" >
                        <h1>{{ $t("newUserPage.title") }}</h1>
                    </v-card-text>

                    <ValidationObserver>
                        <v-form>

                            <v-row>
                                <v-col>
                                    <ValidationProvider
                                        name="Prénom"
                                        rules="required"
                                        v-slot="{ errors }"
                                    >
                                        
                                        <v-text-field
                                            :label="prenomLabel"
                                            v-model= "userPrenom"
                                            color="orange"
                                            outlined
                                            dense
                                            readonly
                                            :error-messages="errors"
                                        ></v-text-field>
                                        </ValidationProvider>
                                </v-col>     
                                <v-col>    
                                    <ValidationProvider
                                        name="Nom"
                                        rules="required"
                                        v-slot="{ errors }"
                                    >
                                        <v-text-field
                                            :label="nomLabel"
                                            v-model= "userNom"
                                            color="orange"
                                            outlined
                                            dense
                                            readonly
                                            :error-messages="errors"
                                        ></v-text-field>
                                    </ValidationProvider>
                                </v-col>    
                            </v-row>

                            <v-row>
                                <v-col>
                                    <ValidationProvider
                                        name="Username"
                                        rules="required"
                                        v-slot="{ errors }"
                                    >
                                        <v-text-field
                                            :label="usernameLabel"
                                            v-model= "userUsername"
                                            color="orange"
                                            outlined
                                            dense
                                            readonly
                                            :error-messages="errors"
                                        ></v-text-field>
                                    </ValidationProvider>
                                </v-col>

                                <v-col>
                                    <ValidationProvider
                                        name="Email"
                                        rules="required"
                                        v-slot="{ errors }"
                                    >
                                        <v-text-field
                                            :label="emailLabel"
                                            v-model= "userMail"
                                            color="orange"
                                            outlined
                                            dense
                                            readonly
                                            :error-messages="errors"
                                        ></v-text-field>
                                    </ValidationProvider>
                                </v-col>
                            </v-row>
                            

                        </v-form>
                    </ValidationObserver>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue} from "vue-property-decorator";

import { authStoreModule } from "@/app/store/auth";
import { RouteNameConstants } from "@/app/constants/RouteNameConstants";
import { AuthenticatedUser } from "@/app/models/auth/AuthenticatedUser";

@Component
export default class AuthenticatedUserProfile extends Vue{


    userPrenom = this.authenticatedUser?.prenom;
    userNom = this.authenticatedUser?.nom;
    userMail = this.authenticatedUser?.email;
    userUsername = this.authenticatedUser?.username;

    get authenticatedUser(): AuthenticatedUser | null {
        return authStoreModule.user;
    }

    get userAvatar(): string | null {
    return authStoreModule.userAvatar ?? null;
    }

    get prenomLabel(){
        return this.$t("newUserPage.form.firstname");
    }

    get nomLabel(){
        return this.$t("newUserPage.form.lastname");
    }

    get emailLabel(){
        return this.$t("newUserPage.form.email");
    }

    get usernameLabel(){
        return this.$t("newUserPage.form.username");
    }

    get passwordLabel(){
        return this.$t("newUserPage.form.password");
    }

    get rolesLabel(){
        return this.$t("newUserPage.form.roles");
    }
}

//todo Change password
</script>

<style scoped>
    .avatar-name{
        font-size: 35px;
        font-weight: 400;
    }
</style>