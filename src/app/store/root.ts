import {
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";

import { languageService } from "@/app/services/LanguageService";
import { store } from "./index";

@Module({ dynamic: true, namespaced: true, name: "global", store })
class RootStoreModule extends VuexModule {
  locale = languageService.getPreferredLocale();
  errorMessage = "";

  @Mutation
  setLocale(newLocale: string) {
    this.locale = newLocale;
  }

  @Mutation
  setErrorMessage(errorMessage: string) {
    this.errorMessage = errorMessage;
  }
}

export const rootStoreModule = getModule(RootStoreModule);
