import { Perhaps } from '@productive-codebases/toolbox'

/**
 * Returns a type predicate to filter falsy values of an array.
 *
 * Usage:
 * arr.filter(isNotFalsy)
 */
export function isNotFalsy<T>(o: Perhaps<T | boolean | string>): o is T {
  return o !== undefined && o !== null && o !== false && o !== ''
}
