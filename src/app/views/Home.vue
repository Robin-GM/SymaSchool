<template>
	<div class="parent">
		<div class="child-container " >
			<div id="logo">
				<v-img
					alt="SymaSchool Logo"
					class="img pb-3"
					width="200"
					src="@/assets/logoSC.png"
				/>
			</div>

			<div class="title my-5">
				<h2> 
					<span v-show="$vuetify.breakpoint.smAndUp">{{ $t("homePage.title") }}</span>  
					<strong>Syma<span class="orange--text">School</span> </strong>
				</h2>
			</div>
		</div>

		<div class="btn-container">
			<v-btn
				class="btn"
				@click="redirectToDashboard"
				x-large
				depressed
				color="orange"
				>{{ $t("homePage.enter") }}</v-btn>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue} from "vue-property-decorator";

import { authStoreModule } from "@/app/store/auth";
import { RouteNameConstants } from "@/app/constants/RouteNameConstants";
import { RoleCodeConstants } from "@/app/constants/RoleCodeConstants";
import { AuthenticatedUser } from "@/app/models/auth/AuthenticatedUser";
import { router } from '../router';

@Component
export default class Dashboard extends Vue{

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
	.parent{
		height: 100%;	

		display: flex;
		flex-direction: column;
		align-items: center;

		position: relative;
	}

	.child-container{
		max-width: 550px;
		min-width: 250px;

		display: flex;
		align-items: center;
		flex-direction: column;

		position: absolute;
		top: 30%;
	}

	.btn-container{
		
		position: absolute;
		top: 80%;
	}

	h2{
		font: 2em Roboto;
	}

</style>
