<template>
    <div>
        <v-data-table
            class="neutral--text text--darken-2"
            :headers="tableHeaders"
            :items="allUsers"
            :loading="isDataLoading"
            :search="search"

            mobile-breakpoint="819"

            :options.sync="syncedOptions"
            :server-items-length="totalUsers"
            
            :page.sync="page"
            @page-count="pageCount = $event"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title class="orange--text text-uppercase" >
                        {{ $t("dashboardPage.title") }}
                    </v-toolbar-title>
                    <v-divider
                        class="mx-4"
                        inset
                        vertical
                    ></v-divider> 

                    <v-spacer></v-spacer>

                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        :label="searchLabel"
                        single-line
                        hide-details
                        color="orange"
                    ></v-text-field>

                    <v-dialog v-model="dialog" max-width="600px">
                        <v-card class="px-3">
                            <v-card-title class="headline pl-4">
                                <span>Modifier le profil :</span>
                            </v-card-title>

                            <ValidationObserver v-slot="{handleSubmit}">
                                <v-form @submit.prevent="handleSubmit(save)">
                                    <v-card-text>
                                        <v-row>
                                            <v-col >
                                                <ValidationProvider
                                                    name="Prénom"
                                                    rules="required"
                                                    v-slot="{ errors }"
                                                >
                                                    
                                                    <v-text-field
                                                        label="Prénom"
                                                        v-model="editedUser.prenom"
                                                        color="orange"
                                                        outlined
                                                        dense
                                                        :error-messages="errors"
                                                    ></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col >
                                                <ValidationProvider
                                                    name="Nom"
                                                    rules="required"
                                                    v-slot="{ errors }"
                                                >
                                                    
                                                    <v-text-field
                                                        label="Nom"
                                                        v-model="editedUser.nom"
                                                        color="orange"
                                                        outlined
                                                        dense
                                                        :error-messages="errors"
                                                    ></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col >
                                                <ValidationProvider
                                                    name="Email"
                                                    rules="required"
                                                    v-slot="{ errors }"
                                                >
                                                    
                                                    <v-text-field
                                                        label="Email"
                                                        v-model="editedUser.email"
                                                        color="orange"
                                                        outlined
                                                        dense
                                                        :error-messages="errors"
                                                    ></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col >
                                                <ValidationProvider
                                                    name="Nom d'utilisateur"
                                                    rules="required"
                                                    v-slot="{ errors }"
                                                >
                                                    
                                                    <v-text-field
                                                        label="Nom d'utilisateur"
                                                        v-model="editedUser.username"
                                                        color="orange"
                                                        outlined
                                                        dense
                                                        :error-messages="errors"
                                                    ></v-text-field>
                                                </ValidationProvider>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>

                                    <v-card-actions class="pb-4 pr-3">
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="orange darken-2"
                                            outlined
                                            @click="close"
                                        >
                                            {{ $t("dashboardPage.cancel") }}
                                        </v-btn>
                                        <v-btn
                                            color="green"
                                            outlined
                                            type="submit"
                                            :loading="loadingSave"
                                            @click="save"
                                        >
                                            {{ $t("dashboardPage.save") }}
                                        </v-btn>
                                    </v-card-actions>
                                </v-form>
                            </ValidationObserver>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="600px">
                        <v-card>
                            <h2 class="pt-2 text-center">{{ $t("dashboardPage.confirmDelete") }}</h2>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn 
                                    color="orange darken-1" 
                                    text 
                                    @click="closeDelete"
                                >
                                    {{ $t("dashboardPage.cancel") }}
                                </v-btn>
                                <v-btn 
                                    color="orange darken-1" 
                                    text 
                                    :loading="loading" 
                                    @click="deleteUserConfirm"
                                >
                                    {{ $t("dashboardPage.delete") }}
                                </v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editUser(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon 
                    small
                    @click="deleteUser(item)"
                >
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>

        <div class="text-center pt-2" >
            <v-pagination
                color="orange"
                v-model="page"
                :length="pageCount"
            ></v-pagination>

        </div>

    </div>    
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";

import { User } from "@/app/models/user/User";
import { adminService } from "@/app/services/AdminService";
import { rootStoreModule } from "@/app/store/root";

@Component
export default class DashboardDataTable extends Vue{ 

    @PropSync("options", { type: Object, required: true })
    syncedOptions!: object;
    
    @Prop({ type: Number, required: true })
    readonly totalUsers!: number;
    
    @Prop({ type: Array, required: true })
    readonly allUsers!: User[];

    @Prop({ type: Boolean, required: true })
    readonly isDataLoading!: boolean;

    //pour le bouton save et le bouton delete
    loadingSave = false;

    //pour l'affichage de l'editUser
    dialog = false;

    //pour l'affichage du deleteUser
    dialogDelete = false;

    //pour la barre de recherche
    search="";

    //pour la pagination
    page = 1;
    pageCount = 0;


    tableHeaders = [
        {
            text : this.$t("dashboardPage.dataTable.lastname").toString(),
            value : "nom"
        },
        {
            text : this.$t("dashboardPage.dataTable.firstname").toString(),
            value : "prenom"
        },
        {
            text : this.$t("dashboardPage.dataTable.email").toString(),
            value : "email"
        },
        {
            text : this.$t("dashboardPage.dataTable.username").toString(),
            value : "username"
        },
        {
            text : this.$t("dashboardPage.dataTable.roles").toString(),
            value : "roles"
        },
        {
            text : this.$t("dashboardPage.dataTable.action").toString(),
            value : "actions",
            sortable: false
        }
    ];

    //Permet de s'assusser qu'un utilisateur à bien été sélectionné pour le save ou delete
    //si ça valeur n'est plus -1 cela signifie qu'un utilisateur est sélectionné
    //initialisé a -1 car il va recevoir un index pouvant aller de 0 a n
    editedIndex = -1;  
    
    //va stocker l'utilisateur que l'on souhaite modifier
    editedUser = {
        id : "",
        nom : "",
        prenom: "",
        email: "",
        username: "",
    };

    //Objet toujours vide qui sert à reinitialiser editUser
    defaultFieldUser = { 
        id: "",    
        nom : "",
        prenom: "",
        email: "",
        username: "",
    };

    get searchLabel(){
        return this.$t("dashboardPage.search");
    }

    
    
    editUser(item: User) {

        //charge l'index de l'utilisateur de la liste de tous les utilisateurs
        this.editedIndex = this.allUsers.indexOf(item);

        /* on fait une copie de l'item pour pouvoir supprimer les données inutiles 
        sans affecter l'item lui même */
        const itemCopy = Object.assign({}, item);
        /* supprime les données dont on n'a pas besoin et qui sont sensibles (mdp)
        + résoud le problème d'incompatibilité des roles causés par la conversion dans AdminDashboard
        + évite de prendre le risque de faire transiter le mdp à nouveau par le réseau */
        delete itemCopy.password;
        delete itemCopy.roles;

        //charge l'utilisateur selectionné dans l'objet editedUser pour pouvoir l'envoyer au serveur 
        this.editedUser = Object.assign({}, itemCopy);
        
        //affiche la fenêtre de modification
        this.dialog = true;
    }
    

    //charge l'utilisateur selectionné dans l'objet editedUser
    
    deleteUser(item: User) {
        //charge l'index de l'utilisateur de la liste de tous les utilisateurs
        this.editedIndex = this.allUsers.indexOf(item);
        this.editedUser = Object.assign({}, item);

        //affiche la fenêtre de suppresion
        this.dialogDelete = true;
    }

    close(){
        this.dialog = false;
        this.$nextTick(() => {
            this.editedUser = Object.assign({} ,this.defaultFieldUser);
            this.editedIndex = -1;
        })
    }

    closeDelete(){
        this.dialogDelete = false;
        this.$nextTick(() => {
            this.editedUser = Object.assign({} ,this.defaultFieldUser);
            this.editedIndex = -1;
        })
    }    

    async save(){
        this.loadingSave = true;

        if (this.editedIndex > -1) {

            //put vers le serveur de editUser grace à l'id
            //on récupère d'abord l'id
            const idUser = Object.values(this.editedUser)[0]
            try{
                await adminService.updateUser(idUser, this.editedUser)

                //on actualise instanténement la donnée pour éviter d'avoir à refresh la page
                Object.assign(this.allUsers[this.editedIndex], this.editedUser);
            }catch (error){
                rootStoreModule.setErrorMessage(error);
            } finally{
                this.loadingSave = false
            }

            
            
        } else {
            console.log("Erreur d'indexation");
            this.close();
        }
        this.close();
    }

    async deleteUserConfirm()  {
        this.loadingSave = true;

        //on récupère l'id de l'utilisateur sélectionné
        const idUser = Object.values(this.editedUser)[0]

        try{
            await adminService.deleteUser(idUser)

            //on actualise instanténement la donnée pour éviter d'avoir à refresh la page
            this.allUsers.splice(this.editedIndex, 1)
        }catch (error){
            rootStoreModule.setErrorMessage(error);
        } finally{
            this.loadingSave = false
        }
        
        //fermeture de la fenêtre de suppression
        this.closeDelete();
    }

}
</script>
