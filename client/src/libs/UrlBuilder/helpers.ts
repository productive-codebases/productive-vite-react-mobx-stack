/**
 * Forge a pathname for the client.
 */
export function forgeClientPathname(routerPrefix?: string) {
  return (pathname: string): string => {
    if (!routerPrefix) {
      return pathname
    }

    return [routerPrefix, pathname].join('#').replace(/[\\/]+/, '/')
  }
}
