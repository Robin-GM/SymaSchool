<template>
    <div>
        <v-data-table
            class="neutral--text text--darken-2"
            :headers="tableHeaders"
            :items="allUsers"
            :loading="isDataLoading"
            sort-by="nom"

            :options.sync="syncedOptions"
            :server-items-length="totalUsers"
        >

        </v-data-table>
    </div>    
</template>


<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";

import { User } from "@/app/models/user/User";

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
        }
    ];

}
</script>
