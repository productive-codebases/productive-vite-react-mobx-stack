import * as React from 'react'
import { ApplicationError } from '../libs/errors'
import {
  interpolate,
  plural,
  transformMarkdown
} from '../libs/i18n/translate/helpers'
import { Translator } from '../libs/i18n/types'
import { ContextStores } from './useStores'

/**
 * Return the translate function from the root store.
 */
export function useTranslator(): Translator {
  const value = React.useContext(ContextStores)

  const translator = value.storeRoot && value.storeRoot.translator

  if (!translator) {
    throw new ApplicationError({
      message: `Translator is not available`
    })
  }

  return translator
}

/**
 * Shortcut to use translations utils.
 */
export function useTranslatorUtils() {
  return { transformMarkdown, interpolate, plural }
}
