<template>
  

    <!-- <div v-if="isAutoLogin">
      <p>Loading...</p>
    </div> -->

    <v-app >
      <NavBar/>
      <v-main id="main">
        <router-view></router-view>
      </v-main>
      <FooterBar/>
    </v-app>

</template>

<script lang="ts">
import { Component, Vue} from "vue-property-decorator";
import NavBar from '@/app/components/NavBar.vue'
import FooterBar from '@/app/components/FooterBar.vue'

@Component({
  components: {
    NavBar,
    FooterBar
  }
})
export default class App extends Vue {


  /* get isAutoLogin(): boolean {
    return authStoreModule.isAutoLogin;
  } */

}
</script>

<style scoped>
  #main{
  }

</style>

