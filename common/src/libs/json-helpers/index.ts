import { camelCase, snakeCase } from 'lodash'

/**
 * Since OpenAPI generates stubs by applying some transformations like
 * camelCased properties, those transformers applies the reverse transformations
 * and are used in mocks responses.
 */

/**
 * Convert all values to snake_case.
 * /!\ This function mutates input.
 */
export function camelCaseToSnakeCaseJsonTransformer(
  input: Record<string, any>
): Record<string, any> {
  if (Array.isArray(input)) {
    return input.map(camelCaseToSnakeCaseJsonTransformer)
  }

  if (typeof input === 'object') {
    const n = {} as Record<string, any>

    Object.keys(input).forEach(k => {
      // don't change private variables (since not supposed to be in the API)
      if (k.startsWith('_')) {
        n[k] = input[k]
        return
      }

      const value = input[k]
      const finalValue = value instanceof Date ? value.toISOString() : value

      n[snakeCase(k)] = camelCaseToSnakeCaseJsonTransformer(finalValue)
    })

    return n
  }

  return input
}

/**
 * Convert all values to camelCase.
 */
export function snakeCasetoCamelCaseJsonTransformer(
  input: Record<string, any>
): Record<string, any> {
  if (Array.isArray(input)) {
    return input.map(snakeCasetoCamelCaseJsonTransformer)
  }

  if (typeof input === 'object') {
    const newInput = {} as Record<string, any>

    Object.keys(input).forEach(k => {
      // don't change private variables (since not supposed to be in the API)
      if (k.startsWith('_')) {
        newInput[k] = input[k]
        return
      }

      newInput[camelCase(k)] = snakeCasetoCamelCaseJsonTransformer(input[k])
    })

    return newInput
  }

  return input
}

/**
 * Copy the `_default` property to `default` if exists.
 * /!\ This function mutates input.
 */
export function unprotectDefaultPropertyJsonTransformer(
  input: Record<string, any> & { default?: any; _default?: any }
): Record<string, any> {
  if (Array.isArray(input)) {
    input.map(unprotectDefaultPropertyJsonTransformer)
    return input
  }

  if (typeof input === 'object') {
    Object.keys(input).forEach(k => {
      if (k === '_default') {
        // copy _default to default
        input.default = input._default
        delete input._default

        // recursion with default, since _default has been deleted
        unprotectDefaultPropertyJsonTransformer(input.default)

        return
      }

      // recursion on other properties
      unprotectDefaultPropertyJsonTransformer(input[k])
    })
  }

  return input
}
