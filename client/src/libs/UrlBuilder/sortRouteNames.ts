import { IRouteDefinition, IRouteSorted } from './types'

interface IPart {
  str: string
  dyn: number
}

interface IMappedRoute {
  item: object
  parts: Array<IPart>
  hasStatic: number
}

/**
 * Sort route paths so that static routes precede dynamic routes. i.e. /foo/:id ranked after /foo/new.
 * Credits: https://github.com/overlookmotel/sort-route-paths
 */
export function sortRouteNames<
  R extends string,
  RD extends IRouteDefinition<R>
>(
  arr: Array<IRouteSorted<string>>,
  accessor: Function
): Array<IRouteSorted<RD['routeName']>> {
  // Conform arguments
  if (!Array.isArray(arr)) {
    throw new Error('paths must be an array')
  }

  if (typeof accessor !== 'function') {
    throw new Error('accessor must be a function')
  }

  // Convert input arr to internal representation with paths split into parts
  const mappedArr: Array<IMappedRoute> = arr.map(item => {
    // Use accessor to retrieve path
    const path = accessor(item)

    // Split path into parts by '/', removing preceding/trailing slashes
    let parts = path.split('/')

    if (parts[0] === '') {
      parts.shift()
    }

    if (parts[parts.length - 1] === '') {
      parts.length--
    }

    // For each part of path, determine if is dynamic (':...' or '*')
    // + determine if path has any static parts
    let hasStatic = parts.length === 0 ? 1 : 0
    parts = parts.map((part: string) => {
      const dyn = dynScore(part)
      if (!dyn) {
        hasStatic = 1
      }
      return { str: part, dyn }
    })

    return { item, parts, hasStatic }
  })

  // Sort by path priority
  mappedArr.sort((line1, line2) => {
    // Paths with no static parts ranked lower
    const res = compare(line2.hasStatic, line1.hasStatic)
    if (res) {
      return res
    }

    // Compare parts one by one
    // Dynamic routes ranked lower, then sort alphabetically
    const parts1 = line1.parts
    const parts2 = line2.parts
    const len1 = parts1.length
    const len2 = parts2.length
    const minLen = Math.min(len1, len2)

    for (let i = 0; i < minLen; i++) {
      const res2 = compareParts(parts1[i], parts2[i])
      if (res2) {
        return res2
      }
    }

    // Compared path parts identical - rank longer paths lower
    return compare(len1, len2)
  })

  // Return routes array
  return mappedArr.map(line => <IRouteSorted<RD['routeName']>>line.item)
}

function compareParts(part1: IPart, part2: IPart) {
  // Dynamic routes ranked lower
  const res = compare(part1.dyn, part2.dyn)

  if (res) {
    return res
  }

  // Rank in alphabetical order
  return compare(part1.str, part2.str)
}

function compare(item1: string | number, item2: string | number) {
  if (item1 > item2) {
    return 1
  }

  if (item1 < item2) {
    return -1
  }

  return 0
}

function dynScore(str: string) {
  const char = str[0]

  if (char === '*') {
    return 2
  }

  if (char === ':') {
    return 1
  }

  return 0
}
