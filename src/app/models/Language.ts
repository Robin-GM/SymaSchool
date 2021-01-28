import { LanguageCode } from "../enums/LanguageCode";

export class Language {
  constructor(
    public code: LanguageCode, 
    public localizedLabelKey: string
  ) {}
}
