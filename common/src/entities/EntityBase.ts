import { Maybe } from '@/common/types'
import { ensureArray, isDefined } from '@productive-codebases/toolbox'
import { get } from 'lodash'

export default class EntityBase {
  id: Maybe<number | string> = null

  /**
   * Return the value of a property as a string.
   */
  getPropertyAsString(property: keyof this, fallback: string = ''): string {
    const value = get(this, property)

    if (!isDefined(value)) {
      return fallback
    }

    return String(value)
  }

  /**
   * Return the value of a property as a boolean.
   */
  getPropertyAsBoolean(
    property: keyof this,
    fallback: boolean = false
  ): boolean {
    const value = get(this, property)

    if (!isDefined(value)) {
      return fallback
    }

    return Boolean(value)
  }

  /**
   * Return the value of a property as a number.
   */
  getPropertyAsNumber(property: keyof this, fallback: number = 0): number {
    const value = get(this, property)

    if (!isDefined(value)) {
      return fallback
    }

    return Number(value)
  }

  /**
   * Return the value as T (unsafe).
   */
  getPropertyAsT<T>(property: keyof this, fallback?: T): T {
    const value = get(this, property)

    if (!isDefined(value) && isDefined(fallback)) {
      return fallback
    }

    return value as unknown as T
  }

  /**
   * Return the value as an array of T (unsafe).
   */
  getPropertyAsArrayOf<T>(property: keyof this, fallback?: T[]): T[] {
    const value = get(this, property)

    if (!isDefined(value) && isDefined(fallback)) {
      return fallback
    }

    return ensureArray(value) as unknown as T[]
  }
}
