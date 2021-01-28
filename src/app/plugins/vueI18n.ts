import Vue from "vue";
import VueI18n from "vue-i18n";

import { languageService } from "@/app/services/LanguageService";

import fr from "@/app/locales/fr";
import en from "@/app/locales/en";
import es from "@/app/locales/es";

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: languageService.getPreferredLocale(),
  messages: { fr, en, es, }
});
