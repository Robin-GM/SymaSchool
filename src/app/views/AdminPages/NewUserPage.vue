<template>
    <v-container >
        <NewUserForm :loading="loading" @submit="onValidation" :showErrorAlert="showErrorAlert" :error="error"/>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue} from "vue-property-decorator";

import NewUserForm from '@/app/components/AdminComponents/NewUserForm.vue';
import { errorService } from "@/app/services/ErrorService";
import { adminService } from "@/app/services/AdminService"
import { SigninDataUser } from "@/app/models/signin/SigninDataUser";
import { RouteNameConstants } from "@/app/constants/RouteNameConstants";
import { router } from '../../router';

@Component({
  components: {
    NewUserForm
  }
})
export default class NewUserPage extends Vue{
  
    loading = false;
    error = "";

    get showErrorAlert(): boolean {
        return this.error ? true : false;
    }

    async onValidation(userInfo: SigninDataUser): Promise<void> {
        this.loading = true;
        this.error = ""; 
        
        try {
            const user = await adminService.createUserAccount(userInfo);
        } catch (error) {
            this.error = errorService.getErrorMessage(error);
        } finally {
            this.loading = false;
            router.push({name : RouteNameConstants.ADMIN_DASHBOARD});
        }
    }

}
</script>