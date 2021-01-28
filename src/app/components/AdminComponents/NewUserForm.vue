<template>
    <v-container >
        <v-row>
            <v-col  class="pa-10 mt-16 mx-auto" cols="auto" >
                <v-btn
                    @click="goBack"
                    class=" mb-3"
                    color="orange"
                    tile
                    outlined
                    depressed
                >{{ $t("newUserPage.return") }}</v-btn>
                <v-card class="
                            d-flex
                            justify-space-between
                            align-center
                            py-4
                            px-10"
                            color="white">

                    <v-card class="
                            d-flex
                            align-center"
                            flat
                            width="400">

                        <div class="mr-4">
                            <v-avatar color="orange" size="64">
                                <span class="white--text headline text-uppercase">
                                    {{prenom[0]}}{{nom[0]}}
                                </span>
                            </v-avatar>
                        </div>

                        <div class="name">
                            <p class="text-capitalize">
                                {{prenom}} {{nom}}
                            </p>
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
                                {{ $t("newUserPage.avatar") }}
                            </v-btn>
                        </div>
                    </div>
                </v-card>

                <v-card class="mt-5 py-4 px-10" color="white">
                    <v-card-text class="pl-0 black--text" >
                        <h1>{{ $t("newUserPage.title") }}</h1>
                    </v-card-text>

                    <v-alert
                        :value="showErrorAlert"
                        icon="mdi-alert-circle-outline"
                        mode="in-out"
                        text
                        transition="scale-transition"
                        type="error"
                        >{{ error }}
                    </v-alert>

                    <ValidationObserver v-slot="{handleSubmit}">
                        <v-form @submit.prevent="handleSubmit(onSubmit)">

                            <v-row>
                                <v-col>
                                    <ValidationProvider
                                        name="Prénom"
                                        rules="required"
                                        v-slot="{ errors }"
                                    >
                                        
                                        <v-text-field
                                            :label="prenomLabel"
                                            v-model="prenom"
                                            color="orange"
                                            outlined
                                            dense
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
                                            v-model="nom"
                                            color="orange"
                                            outlined
                                            dense
                                            :error-messages="errors"
                                        ></v-text-field>
                                    </ValidationProvider>
                                </v-col>    
                            </v-row>

                            <ValidationProvider
                                name="Email"
                                rules="required"
                                v-slot="{ errors }"
                            >
                                <v-text-field
                                    :label="emailLabel"
                                    suffix="@symaschool.com"
                                    v-model="setEmail"
                                    color="orange"
                                    outlined
                                    dense
                                    readonly
                                    :error-messages="errors"
                                ></v-text-field>
                            </ValidationProvider>

                            <v-row>
                                <v-col>
                                    <ValidationProvider
                                        name="Username"
                                        rules="required"
                                        v-slot="{ errors }"
                                    >
                                        <v-text-field
                                            :label="usernameLabel"
                                            v-model="setUsername"
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
                                        name="Password"
                                        rules="required"
                                        v-slot="{ errors }"
                                    >
                                        <v-text-field
                                            :label="passwordLabel"
                                            v-model="password"
                                            color="orange"
                                            outlined
                                            dense
                                            :error-messages="errors"
                                        ></v-text-field>
                                    </ValidationProvider>
                                </v-col>
                            </v-row>
                            <ValidationProvider
                                name="Roles"
                                rules="required"
                                v-slot="{ errors }"
                            >
                                <v-select
                                    :label="rolesLabel"
                                    v-model="roles"
                                    :items="rolesChoice"
                                    color="orange"
                                    outlined
                                    dense
                                    :error-messages="errors"
                                ></v-select>
                            </ValidationProvider>

                            <v-btn
                                class="mb-3"
                                type="submit"
                                block
                                color="orange"
                                elevation="2"
                                tile
                                :loading="loading"
                                >{{ $t("newUserPage.form.validation") }}</v-btn>
                        </v-form>
                    </ValidationObserver>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue} from "vue-property-decorator";

import { SigninDataUser } from "@/app/models/signin/SigninDataUser";
import { RoleCodeConstants } from "@/app/constants/RoleCodeConstants";
import { RouteNameConstants } from "@/app/constants/RouteNameConstants";

import { router } from '../../router';

@Component
export default class NewUserForm extends Vue{

    @Prop({ type: Boolean, required: true })
    readonly loading!: boolean;

    @Prop({ type: String, required: true })
    readonly error!: string;

    @Prop({ type: Boolean, required: true})
    readonly showErrorAlert!: boolean;

    rolesChoice= ["Élève", "Professeur", "Administrateur"];

    nom="";
    prenom="";
    email="";
    username="";
    password="";
    roles="";


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

    get setUsername(): string {
        if (this.prenom !== "" && this.nom !== ""){
            this.username= `${this.prenom}.${this.nom}`;
        }else if (this.prenom !== ""){
            this.username= `${this.prenom}`;
        }else if (this.nom !== ""){
            this.username= `${this.nom}`;
        }else
            this.username = "";
        
        return this.username.replace(' ', '-').toLowerCase();
    }

    get setEmail(): string{
        if (this.prenom !== "" && this.nom !== ""){
            this.email= `${this.prenom}.${this.nom}`;
        }else if (this.prenom !== ""){
            this.email= `${this.prenom}`;
        }else if (this.nom !== ""){
            this.email= `${this.nom}`;
        }else
            this.email = "";
        
        return this.email.replace(' ', '-').toLowerCase();
    }

    convertRolesInList(){
        const rolesList: string[]= [];
        if (this.roles == "Élève") {
            rolesList.push(RoleCodeConstants.ELEVE);
        }
        if (this.roles == "Professeur"){
            rolesList.push(RoleCodeConstants.ELEVE,
                           RoleCodeConstants.PROF);
        }
        if (this.roles == "Administrateur"){
            rolesList.push(RoleCodeConstants.ELEVE, 
                           RoleCodeConstants.PROF, 
                           RoleCodeConstants.ADMIN);
        }
        return rolesList;
    }

    clearField(){
        this.nom ="";
        this.prenom="";
        this.email="";
        this.username="";
        this.password = "";
        this.roles="";
    }

    @Emit("submit")
    onSubmit(): SigninDataUser {
        
        
        const newUser = new SigninDataUser( 
            this.nom,
            this.prenom,
            this.setEmail + "@symaschool.com",
            this.setUsername,
            this.password,
            this.convertRolesInList());
        
        return newUser;
    }

    goBack() {
    router.go(-1)
    }

    //----------TODO LIST------------
    //mettre une sécurité pour empecher n'importe qui d'avoir accès à cette page
    //complétion automatique de l'email et username avec possiblité de modification
    //autogénération de mot de passe
    //supprimer les caractères spéciaux (é,ê,&,{},/) de l'email et username
    //n'accepter pour nom et prénom que les accents en caractères spéciaux
}
</script>