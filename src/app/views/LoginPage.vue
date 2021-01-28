<template>
    <v-container class="container">
        <v-card id="cadre" elevation="7" >
            <div class="top">
                <div id="logo">
                    <v-img
                        alt="SymaSchool Logo"
                        class="shrink mr-2"
                        src="@/assets/logoSC.png"
                        width="200"
                    />
                </div>

                <div id="msg">
                    <h2 class="">{{ $t("loginPage.title") }}</h2>
                </div>
            </div>

            <v-alert
                class="errorAlert"
                :value="showErrorAlert"
                icon="mdi-alert-circle-outline"
                mode="in-out"
                text
                transition="scale-transition"
                type="error"
                >{{ error }}
            </v-alert>

            <LoginForm class="loginForm" :loading="loading" @submit="onLogin"/>

        </v-card>
    </v-container>
</template>




<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginForm from '@/app/components/LoginForm.vue';
import { LoginCredentials } from "@/app/models/auth/LoginCredentials.ts";
import { authService } from "@/app/services/AuthService";
import { errorService } from "@/app/services/ErrorService";
import { commonService } from "@/app/services/CommonService";
import { authStoreModule } from "@/app/store/auth";
import { RouteNameConstants } from "@/app/constants/RouteNameConstants";
import { RoleCodeConstants } from "@/app/constants/RoleCodeConstants";
import { AuthenticatedUser } from "@/app/models/auth/AuthenticatedUser";
import { router } from '../router';

@Component({
    components: {
        LoginForm
}
})
export default class LoginPage extends Vue{

    loading = false;
    error = "";


    get showErrorAlert(): boolean {
        return this.error ? true : false;
    }

    async onLogin(credentials: LoginCredentials): Promise<void> {
        this.loading = true;
        this.error = "";

        try {
            const user = await authService.login(credentials);
            authStoreModule.loginSuccess(user);
            
            const avatar = await commonService.getUserAvatar();
            authStoreModule.setUserAvatar(avatar);
      
            this.redirectToDashboard();

        } catch (error) {
            this.error = errorService.getErrorMessage(error);
        } finally {
            this.loading = false;
        }
    }

    get authenticatedUser(): AuthenticatedUser | null {
        return authStoreModule.user;
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
}
</script>



<style scoped>
	.container{
        height: 90%;
        display: flex;
        align-items: center;
        justify-content: center;
	}
    #cadre{
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        padding: 15px 25px 40px 25px;
        min-width: 400px;
    }

    .top{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #logo{
		margin: 25px 0 10px 0;
	}

	#msg{
		margin-bottom: 30px;
        font-size: 20px;
	}

    .loginForm{
        margin-top: 17px;
        width: 333px;
    }


@media screen and (max-height: 700px) {
    #cadre{
        flex-direction: row;
        padding: 30px 40px;
    }

    .top{
        margin-right: 40px;
    }

    #logo{
		margin: 0 0 10px;
    }

    @media screen and (max-width: 550px){
        #cadre{
            flex-direction: column;
            padding: 30px 40px;
        }

        .top{
            margin-right: 0;
        }

        #logo{
            display: none;
        }
    }
}

</style>