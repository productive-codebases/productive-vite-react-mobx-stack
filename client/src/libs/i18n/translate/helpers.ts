import { fallbackLanguage, languages as availableLanguages } from '..'
import { interpolateTemplate } from '@/common/helpers/interpolateTemplate'
import { newLogger } from '@/common/libs/logger'
import { Maybe, MaybeUndef, Perhaps } from '@/common/types'
import { LocalStorageKey } from '@/common/types/environment'
import { isDefined } from '@productive-codebases/toolbox'
import { get, unescape } from 'lodash'
import * as marked from 'marked'
import { Environment } from '../../Environment'
import { Language } from '../types'

/**
 * Return the language of the app.
 */
export function getLanguage(environment: Environment): Language {
  const language = (
    extractLanguageFromUrl() ||
    extractFromLocalStorage(environment.localStorage) ||
    extractBrowserLanguage() ||
    'en'
  ).toLowerCase() as Language

  return getFirstLanguageAvailable([language])
}

/**
 * Return the first language of available languages.
 */
function getFirstLanguageAvailable(
  languages_: Array<Perhaps<Language>>
): Language {
  let index = -1

  for (const language of languages_.filter(isDefined)) {
    index = availableLanguages.indexOf(language)
    if (index > -1) {
      break
    }
  }

  if (index > -1) {
    return availableLanguages[index]
  }

  return fallbackLanguage
}

/**
 * Get language from the url.
 */
function extractLanguageFromUrl(): MaybeUndef<Language> {
  if (typeof window === 'undefined') {
    return undefined
  }

  const params: {
    [k: string]: MaybeUndef<string>
  } = window.document.location.search
    .slice(1)
    .split('&')
    .reduce((acc, param) => {
      const [key, value] = param.split('=')
      return { ...acc, [key]: value }
    }, {})

  return params.language as Language
}

/**
 * Get language from the browser locale.
 */
function extractBrowserLanguage(): MaybeUndef<Language> {
  if (typeof window === 'undefined') {
    return undefined
  }

  return window.navigator.language.slice(0).split('-').shift() as Language
}

/**
 * Get language from localstorage.
 */
function extractFromLocalStorage(localStorage: Maybe<Storage>): Maybe<string> {
  if (!localStorage) {
    return null
  }

  return localStorage.getItem(LocalStorageKey.language)
}

/**
 * Replace values in translations.
 *
 * Example: <%- X %> identities => 42 identities
 */
export function interpolate(
  text: string,
  replacements: object,
  options?: {
    onMissingReplacement: (property: string) => string
  }
): string {
  try {
    const finalOptions = {
      // default `onMissingReplacement` implementation
      onMissingReplacement: () => '-',
      ...options
    }

    return unescape(interpolateTemplate(text, replacements, finalOptions))
  } catch (err) {
    newLogger('common')('helpers')('error')(
      'Error when interpolating the string "%s"',
      text
    )
    return text
  }
}

/**
 * Transform markdown to HTML.
 */
export function transformMarkdown(text: string): string {
  return marked.marked(text).trim()
}

/**
 * Pick the correct translations according to `count`.
 */
export function plural<TCount extends number | 'n'>(
  texts: Record<TCount, string>,
  count: TCount
): string {
  return texts[count] ?? get(texts, 'n')
}
