<template>
    <div>
        <AuthenticatedUserProfile/>
    </div>
</template>

<script lang="ts">
import { Component, Vue} from "vue-property-decorator";

import { authStoreModule } from "@/app/store/auth";
import { RouteNameConstants } from "@/app/constants/RouteNameConstants";
import AuthenticatedUserProfile from "@/app/components/Profile/AuthenticatedUserProfile.vue";

@Component({
    components:{
        AuthenticatedUserProfile
    }
})
export default class ProfilePage extends Vue{

    mounted() {
        if (!authStoreModule.user) {
            this.$router.push(RouteNameConstants.LOGIN)
        }
    }
}
</script>