import { allTranslations } from '.'
import { translate } from './translate'
import { enTranslations } from './translations/en'

export type Language = keyof typeof allTranslations

export type ITranslateNamespace = keyof typeof enTranslations

export type Translations = typeof enTranslations

export type Translator = ReturnType<typeof translate>
