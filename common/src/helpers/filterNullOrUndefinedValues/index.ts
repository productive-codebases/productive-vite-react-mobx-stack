import { PropertiesNonNullable } from '@/common/types'
import { isDefined } from '@productive-codebases/toolbox'

/**
 * Return the object `obj` without null or undefined values.
 * Use with caution!
 */
export function filterNullOrUndefinedValues<TObject extends object>(
  obj: TObject,
  omitKeys?: Array<keyof TObject>
): PropertiesNonNullable<TObject> {
  return Array.from(Object.entries(obj)).reduce((acc, [key, value]) => {
    const isKeyOmitted = omitKeys && omitKeys.includes(key as keyof TObject)

    if (!isKeyOmitted && !isDefined(value)) {
      return acc
    }

    return {
      ...acc,
      [key]: value
    }
  }, {} as PropertiesNonNullable<TObject>)
}
