import { allTranslations } from '..'
import { Language } from '../types'

/**
 * Translate function that allows different level of composition:
 * language -> namespace -> sub namespace -> key
 *
 * Usage:
 *
 * const translate = translate('en')('PageIdentities')('Details')
 * const text = translate('Object Name')
 *
 * In React context:
 *
 * Use `useTranslator` hook that returns a translate instance bounded
 * to the current language of the application:
 *
 * Example:
 *
 * const translate = useTranslator()('PageIdentities')('Details')
 * <Typo>{translate('Object Name')}</Typo>
 */

export function translate<L extends Language>(l: L) {
  return <N1 extends keyof typeof allTranslations[L]>(n1: N1) => {
    return <N2 extends keyof typeof allTranslations[L][N1]>(n2: N2) => {
      return <K extends keyof typeof allTranslations[L][N1][N2]>(k: K) => {
        return allTranslations[l][n1][n2][k]
      }
    }
  }
}
