import { enTranslations } from './translations/en'
// import { frTranslations } from './fr'
import { Language } from './types'

// Use this type for translations for other language than English, so all
// translations shape (keys) will be synchronized.
export type Translations = typeof enTranslations

export const allTranslations = {
  en: enTranslations
  // fr: frTranslations
}

export const languages: Language[] = [/* 'fr', */ 'en']

export const fallbackLanguage: Language = 'en'
