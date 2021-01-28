<template>
    <div>
        <v-data-table
            class="neutral--text text--darken-2"
            :headers="tableHeaders"
            :items="allUsers"
            :loading="isDataLoading"
            :search="search"
            sort-by="roles"

            mobile-breakpoint="819"
            
            hide-default-footer
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
                
                </v-toolbar>
            </template>
            
        </v-data-table>

        <div class="text-center py-2" >
            <v-pagination
                color="orange"
                v-model="page"
                :length="pageCount"
            ></v-pagination>

        </div>

    </div>    
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { User } from "@/app/models/user/User";
@Component
export default class DashboardDataTable extends Vue{ 

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
            text : this.$t("dashboardPage.dataTable.roles").toString(),
            value : "roles"
        },
    ];

    
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

    //sert à reinitialiser editUser
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


}
</script>
