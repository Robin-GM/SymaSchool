import Vue from 'vue'
import App from './App.vue'
import { router } from './app/router'
import { store } from './app/store'
import { apiService } from "@/app/services/ApiService"
import vuetify from './app/plugins/vuetify';
import "./app/plugins/veeValidate";
import { i18n } from "./app/plugins/vueI18n";

apiService.setRequestAcceptLanguageHeader(i18n.locale);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
