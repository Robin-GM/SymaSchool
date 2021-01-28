<template>
    <v-container>
        <v-row>
            <v-col cols="auto" xl="8" class="d-flex flex-column  mx-auto ">

                <div>
                    <v-btn
                        @click="redirectToNewUserPage"
                        class="float-right mb-3"
                        color="orange"
                        dark
                        tile
                        depressed
                    >{{ $t("dashboardPage.addUser") }}</v-btn>
                    
                </div>
                <AdminDashboardDataTable
                    :allUsers="allUsers"
                    :isDataLoading="isTableDataLoading"
                    :totalUsers="totalUsers"
                    :options.sync="options"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Watch, Vue} from "vue-property-decorator";


import { authStoreModule } from "@/app/store/auth";
import { adminService} from "@/app/services/AdminService";
import { errorService } from "@/app/services/ErrorService";
import { rootStoreModule } from "@/app/store/root";
import { RouteNameConstants } from "@/app/constants/RouteNameConstants";
import { router } from '../../router';

import AdminDashboardDataTable from "@/app/components/AdminComponents/AdminDashboardDataTable.vue"
import { User } from "@/app/models/user/User";
import { PageOptions } from "@/app/models/pagination/PageOptions";

@Component({
    components: {
        AdminDashboardDataTable,
  }
})
export default class AdminDashboard extends Vue{

    isTableDataLoading = false;
    allUsers: User[] = [];

    totalUsers = 0;
    options: PageOptions = {
        page: 1,
        itemsPerPage: 10,
        sortBy: ["nom"],
        sortDesc: [false]
    };

    //Au chargement de la page, on appelle la fonction getAllUser
    async created(){
        try{
            await this.getAllUsers();
        }catch (error) {
            const errorMessage = errorService.getErrorMessage(error);
            rootStoreModule.setErrorMessage(errorMessage);
        }
    }

    //s'éxecute dès que l'attribut options est modifié
    @Watch("options")
    onOptionsChanged(val: PageOptions, oldVal: PageOptions) {
    if (this.isSameOptions(val, oldVal)) {
      return;
    }
    this.getAllUsers();
  }

    //On récupère les utilisateurs de la BDD
    async getAllUsers(){
        this.isTableDataLoading = true;
        try{
            const { content, totalUsers } = await adminService.getAllUsers(this.options);

            const reworkContent = this.gestionRoles(content)
            this.allUsers = reworkContent;

            this.totalUsers = totalUsers
        }catch (error) {
            const errorMessage = errorService.getErrorMessage(error);
            rootStoreModule.setErrorMessage(errorMessage);
        }finally{
            this.isTableDataLoading=false;
        }
    }

    //pour convertir les rôles (qui sortent sous forme d'objet) en un simple string[s]
    // + pour n'afficher qu'un seul des rôles
    gestionRoles(userList: User[]): User[]{
        for ( const user of userList) {

            if (user["roles"].length == 3 ){
                user["roles"] = [`${this.$t("roles.administrator")}`];
            } else if (user["roles"].length == 2) {
                user["roles"] = [`${this.$t("roles.teacher")}`];
            } else 
                user["roles"] = [`${this.$t("roles.student")}`];
        }
        return userList;
    }


    isSameOptions(val: PageOptions, oldVal: PageOptions){
        if (val.page !== oldVal.page || 
            val.itemsPerPage !== oldVal.itemsPerPage ||
            val.sortBy !== oldVal.sortBy ||
            val.sortDesc !== oldVal.sortDesc
        ){
            return false;
        }
        else{
            return true;
        }
    }

    redirectToNewUserPage() {
        router.push({name : RouteNameConstants.ADMIN_NEW_USER});
    }

    mounted() {
        if (!authStoreModule.user) {
            this.$router.push(RouteNameConstants.LOGIN)
        }
    }
}
</script>