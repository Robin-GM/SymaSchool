import Vue from "vue";


import {
  extend,
  ValidationObserver,
  ValidationProvider
} from "vee-validate";
import {required} from "vee-validate/dist/rules";

extend("required", required);

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

