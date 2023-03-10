/**
 * Credits to https://github.com/apollographql/apollo-client/issues/2412#issuecomment-755449680
 */

type RecursivelyReplaceNullWithUndefined<T> = T extends null
  ? undefined
  : T extends Date
  ? T
  : {
      [K in keyof T]: T[K] extends (infer U)[]
        ? RecursivelyReplaceNullWithUndefined<U>[]
        : RecursivelyReplaceNullWithUndefined<T[K]>
    }

/**
 * Recursively replaces all nulls with undefineds.
 * Skips object classes (that have a `.__proto__.constructor`).
 */
export function replaceNullsWithUndefineds<T extends object>(
  obj: T
): RecursivelyReplaceNullWithUndefined<T> {
  const newObj: any = {}

  Object.keys(obj).forEach(k => {
    const v: any = (obj as any)[k]

    newObj[k as keyof T] =
      v === null
        ? undefined
        : // eslint-disable-next-line no-proto
        v && typeof v === 'object' && v.__proto__.constructor === Object
        ? replaceNullsWithUndefineds(v)
        : v
  })

  return newObj
}
