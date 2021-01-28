<template>
    <v-container>
        <v-row>
            <v-col cols="auto" xl="8" class="d-flex flex-column  mx-auto pt-10">

                <StudentTeacherDashboardDataTable
                    :allUsers="allUsers"
                    :isDataLoading="isTableDataLoading"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue} from "vue-property-decorator";


import { authStoreModule } from "@/app/store/auth";
import { studentService } from "@/app/services/StudentService";
import { teacherService } from "@/app/services/TeacherService";
import { errorService } from "@/app/services/ErrorService";
import { rootStoreModule } from "@/app/store/root";
import { AuthenticatedUser } from "@/app/models/auth/AuthenticatedUser";
import { RouteNameConstants } from "@/app/constants/RouteNameConstants";
import { RoleCodeConstants } from "@/app/constants/RoleCodeConstants";

import StudentTeacherDashboardDataTable from "@/app/components/StudentTeacherComponents/StudentTeacherDashboardDataTable.vue"
import { User } from "@/app/models/user/User";

@Component({
    components: {
        StudentTeacherDashboardDataTable,
  }
})
export default class AdminDashboard extends Vue{

    isTableDataLoading = false;
    allUsers: User[] = [];

    //On récupère le role de l'utilisateur pour adapter l'affichage (en fonction de ses permisisons)
    get authenticatedUser(): AuthenticatedUser | null {
        return authStoreModule.user;
    }
    defineUserPermissions(){
        if (this.authenticatedUser != null){
			if(this.authenticatedUser.roles.includes(RoleCodeConstants.PROF)){
                return "teacher";
            } else 
                return "student";
        }
    }

    //Au chargement de la page, on appelle la fonction getAllUser
    async created(){
        try{
            await this.getUsers();
        }catch (error) {
            const errorMessage = errorService.getErrorMessage(error);
            rootStoreModule.setErrorMessage(errorMessage);
        }
    }

    //On récupère les utilisateurs de la BDD selon les permissions de l'utilisateur
    async getUsers(){
        this.isTableDataLoading = true;
        let content: User[] = []
        try{
            if (this.defineUserPermissions() == "teacher"){
                content = await teacherService.getTeacherUsers();
            } else{
                content = await studentService.getStudentUsers();
            }

            const reworkContent = this.gestionRoles(content)

            this.allUsers = reworkContent;
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

            if (user["roles"].length == 2) {
                user["roles"] = [`${this.$t("roles.teacher")}`];
            } else 
                user["roles"] = [`${this.$t("roles.student")}`];
        }
        return userList;
    }

    mounted() {
        if (!authStoreModule.user) {
            this.$router.push(RouteNameConstants.LOGIN)
        }
    }
}
</script>