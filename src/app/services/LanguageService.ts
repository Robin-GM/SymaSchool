import { LanguageCode } from "@/app/enums/LanguageCode";
import { Language } from "@/app/models/Language";
import { apiService } from "./ApiService";

class LanguageService {
  private static readonly I18N_PREFIX = "language";
  private static readonly LOCALE_KEY = "locale";

  getLanguageCodeForLocale(locale: string): LanguageCode {
    let code = LanguageCode.FR;

    switch (locale.toUpperCase()) {
      case LanguageCode.EN:
        code = LanguageCode.EN;
        break;
      case LanguageCode.ES:
        code = LanguageCode.ES;
        break;
      default:
        LanguageCode.FR;
    }

    return code;
  }

  getPreferredLocale(): string {
    const browserLanguage = navigator.language.split("-")[0]; // split "-"" for locale with country code, ex: en-US
    return (
      localStorage.getItem(LanguageService.LOCALE_KEY) ||
      browserLanguage ||
      LanguageCode.FR.toLowerCase()
    );
  }

  setPreferredLocale(locale: string) {
    localStorage.setItem(LanguageService.LOCALE_KEY, locale);
    apiService.setRequestAcceptLanguageHeader(locale);
  }

  getAllLanguage(): Language[] {
    return Object.keys(LanguageCode).map((code) => {
      return new Language(
        code as LanguageCode,
        `${LanguageService.I18N_PREFIX}.${code.toLowerCase()}`
      );
    });
  }
}

export const languageService = new LanguageService();
