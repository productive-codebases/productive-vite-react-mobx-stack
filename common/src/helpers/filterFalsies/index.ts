import { isNotFalsy } from '../isNotFalsy'

/**
 * Remove from an array falsy values.
 */
export function filterFalsies<T>(
  arr: Array<T | null | undefined | boolean>
): T[] {
  return arr.filter(isNotFalsy)
}
