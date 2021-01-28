<template>
      <v-select class="language"
        v-model="selectedLanguageCode"
        solo
        dense
        flat
        color="orange"
        item-value="code"
        :item-text="getLocalizedLanguageName"
        :items="languages"
        :hide-details="true"
      ></v-select>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { TranslateResult } from "vue-i18n";

import { Language } from "@/app/models/Language";
import { languageService } from "@/app/services/LanguageService";

import { rootStoreModule } from "@/app/store/root";


@Component
export default class LocaleSelect extends Vue {
  selectedLanguageCode = this.$root.$i18n.locale.toUpperCase();
  languages = languageService.getAllLanguage();

  getLocalizedLanguageName(language: Language): TranslateResult {
    return this.$t(language.localizedLabelKey);
  }

  @Watch("selectedLanguageCode")
  onLanguageCodeChanged(val: string, oldVal: string) {
    this.$root.$i18n.locale = val.toLowerCase();
    languageService.setPreferredLocale(this.$root.$i18n.locale);
    rootStoreModule.setLocale(this.$root.$i18n.locale);
  }
}
</script>
<style>
  .language{
    max-width: 110px;
    border: 1px solid #dadce0;
    font-size: 13px;
  }
</style>
