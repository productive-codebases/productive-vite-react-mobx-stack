import { ensureArray } from '@productive-codebases/toolbox'
import { omit, pick } from 'lodash'
import { filterNullOrUndefinedValues } from '../filterNullOrUndefinedValues'

// return a new type with keys of T without nullable values
export type EnsureNonNullable<T> = {
  [P in keyof T]-?: NonNullable<T[P]>
}

/**
 * Remove undefined or nullable props and optionnaly pick or omit props.
 */
export function filterEmptyProps<T extends object>(
  props: T,
  options?: {
    pickProps?: Array<keyof T>
    omitProps?: Array<keyof T>
  }
): Partial<EnsureNonNullable<T>> {
  const pickKeys = ensureArray(options?.pickProps)
  const omitKeys = ensureArray(options?.omitProps)

  const finalProps = pickKeys.length
    ? pick(props, pickKeys)
    : omitKeys.length
    ? omit(props, omitKeys)
    : props

  return filterNullOrUndefinedValues<T>(finalProps as EnsureNonNullable<T>)
}
