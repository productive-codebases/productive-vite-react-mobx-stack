import { isDefined } from '@productive-codebases/toolbox'

/**
 * This method will replace every occurence of `replacements` in `template`.
 * Usable tags are <%= %> or <%- %>.
 */
export function interpolateTemplate(
  template: string,
  replacements?: object,
  options?: {
    onMissingReplacement: (property: string) => string
  }
): string {
  if (!replacements) {
    return template
  }

  // Use of a Set to be TS compliant while handling unknown object
  const replacementsMap = new Map<string, string>(Object.entries(replacements))

  // Detect either <%= property %> and <%- property %>
  const regex = /<%[=-](.*?)%>/gm

  let result = template
  let regexResult

  // eslint-disable-next-line no-cond-assign
  while ((regexResult = regex.exec(template)) !== null) {
    const tag = regexResult[0]
    // Cleaning property as there will be often something like <%= property %>
    const property = regexResult[1].trim()

    const value =
      replacementsMap.get(property) ??
      // if defined, get fallback
      (options?.onMissingReplacement && options.onMissingReplacement(property))

    if (!isDefined(value)) {
      throw new Error(`Missing property ${property} when interpolating`)
    }

    // Replacing value or fallback to the property name
    result = result.replace(tag, value)
  }

  return result
}
