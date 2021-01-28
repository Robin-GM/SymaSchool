<template>
    <v-app>

        <h1>Page Non Trouvée !</h1>
        
    </v-app>
</template>

<script lang="ts">
import { Component, Vue} from "vue-property-decorator";

import { authStoreModule } from "@/app/store/auth"
import { RouteNameConstants } from "@/app/constants/RouteNameConstants"

@Component
export default class Dashboard extends Vue{

    mounted() {
        if (!authStoreModule.user) {
            this.$router.push(RouteNameConstants.LOGIN)
        }
    }
}
</script>