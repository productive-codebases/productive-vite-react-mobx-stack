import { newLogger } from '@/common/libs/logger'
import { Maybe, MaybeUndef } from '@/common/types'
import { ensureArray, isDefined } from '@productive-codebases/toolbox'
import { History, Location } from 'history'
import { get, omit } from 'lodash'
import { parse as parseQs, stringify as stringifyQs } from 'qs'
import { matchPath, NavigateFunction } from 'react-router-dom'
import { forgeClientPathname } from './helpers'
import { sortRouteNames } from './sortRouteNames'
import {
  IRouteDefinition,
  IRouteInfo,
  IRouteSorted,
  IRouteSpecs,
  Routes,
  RouteUrlParameters
} from './types'

export default class UrlBuilder<
  TRouteName extends string,
  TRouteDefinition extends IRouteDefinition<TRouteName>
> {
  private _logger = newLogger('client')('UrlBuilder')

  private _sortedRoutes: Array<IRouteSorted<TRouteDefinition['routeName']>> = []

  private _defaultRouteParameters: Maybe<RouteUrlParameters> = null

  private _history: Maybe<History> = null

  private _location: Maybe<Location> = null

  private _navigate: Maybe<NavigateFunction> = null

  /**
   * Instanciate a new UrlBuilder from a Record type of routes.
   */
  constructor(private _routes: Routes<TRouteDefinition['routeName']>) {
    // compute reversed route to be able to retrieve the route name from a pathname
    const mappedRoutes = (
      Object.keys(_routes) as Array<TRouteDefinition['routeName']>
    ).map(routeName => {
      const { pathname } = _routes[routeName]
      const regexpStr = pathname.replace(/:(\w+)/g, '[^/]+')
      const regexp = new RegExp(`^${regexpStr}$`) // match precise

      return {
        pathname,
        regexp,
        routeName
      }
    })

    // sort static and dynamic routes
    this._sortedRoutes = sortRouteNames(
      mappedRoutes,
      (route: IRouteSpecs<TRouteDefinition['routeName']>) => route.pathname
    )
  }

  /**
   * Set default route parameters used when building routes.
   */
  setRouterDefaultRouteParameters(
    defaultRouteParameters: RouteUrlParameters
  ): this {
    this._defaultRouteParameters = defaultRouteParameters
    return this
  }

  /**
   * Set the history object.
   */
  setHistory(history: History): this {
    this._history = history

    if (!this._location) {
      this._location = history.location
    }

    return this
  }

  /**
   * Set the location object.
   */
  setLocation(location: Location): this {
    this._location = location
    return this
  }

  /**
   * Set the navigate function.
   */
  setNavigateFunction(navigate: NavigateFunction): this {
    this._navigate = navigate
    return this
  }

  /**
   * Return the pathname of a routeName.
   */
  getRoutePathname(routeName: TRouteDefinition['routeName']): string {
    const routeInfo = this._routes[routeName]

    if (!routeInfo) {
      this._logger('warn')(`Route ${routeName} has not been found.`)
      return ''
    }

    return routeInfo.pathname
  }

  /**
   * Return the relative pathname between two routes.
   */
  getRelativeRoutesPathname(
    fromRouteName: TRouteDefinition['routeName'],
    toRouteName: TRouteDefinition['routeName']
  ): string {
    const fromPathname = this.getRoutePathname(fromRouteName)
    const toPathname = this.getRoutePathname(toRouteName)
    return toPathname.replace(fromPathname, '').replace(/^\/*/, '')
  }

  /**
   * Return the routeName of the passed pathname.
   */
  getRouteName(pathname: string): Maybe<TRouteDefinition['routeName']> {
    for (let i = 0; i <= this._sortedRoutes.length - 1; i++) {
      if (this._sortedRoutes[i].regexp.test(pathname)) {
        return this._sortedRoutes[i].routeName
      }
    }

    return null
  }

  /**
   * Return parameters of a route.
   *
   * Useful to retrieve url parameters outside the render life cycle
   * that limits `this.props.match.params` to the parameters available relative
   * to the <Route /> component.
   */
  getRouteParameters<T extends TRouteDefinition>(
    route: T | T[]
  ): Maybe<T['parameters']> {
    const location = this._assertLocationDefined()

    for (const _route of ensureArray(route)) {
      const path = this.getRoutePathname(_route.routeName)
      const match = matchPath(`${path}/*`, location.pathname)

      if (match) {
        return this._castParameters(
          _route,
          omit(match.params, ['*']) as Record<string, string>
        )
      }
    }

    return null
  }

  /**
   * Return the specifications of a routeName.
   */
  getRouteSpecs(
    routeName: TRouteDefinition['routeName']
  ): IRouteSpecs<TRouteDefinition['routeName']> {
    return this._routes[routeName]
  }

  /**
   * Return the routeName of the current pathname of the history object.
   */
  getCurrentRouteName(): Maybe<TRouteDefinition['routeName']> {
    const location = this._assertLocationDefined()

    if (!location.pathname) {
      return null
    }

    return this.getRouteName(location.pathname)
  }

  /**
   * Return the pathname of the current routeName.
   */
  getCurrentRoutePathname(): Maybe<string> {
    const routeName = this.getCurrentRouteName()

    if (!routeName) {
      return null
    }

    return this.getRoutePathname(routeName)
  }

  /**
   * Return the query parameters of the current location.
   */
  getCurrentRouteQueryStringParameters<Q>(): MaybeUndef<Q> {
    const { search } = this._assertLocationDefined()

    return parseQs(search, {
      allowDots: true,
      ignoreQueryPrefix: true
    }) as unknown as Q
  }

  /**
   * Return a IRouteInfo object from the current route.
   */
  getCurrentRouteInfo<Q>(): IRouteInfo<TRouteName, Q> {
    return {
      routeName: this.getCurrentRouteName(),
      routeParameters: null,
      queryStringParameters: this.getCurrentRouteQueryStringParameters<Q>()
    }
  }

  /**
   * Return the specifications of the routeName retrieved from the
   * current history pathname.
   */
  getCurrentRouteSpecs(): Maybe<IRouteSpecs<TRouteDefinition['routeName']>> {
    const routeName = this.getCurrentRouteName()

    if (!routeName) {
      return null
    }

    return this._routes[routeName]
  }

  /**
   * Return the url computed from a route definition.
   */
  computeRouteUrl(
    routeDefinition: TRouteDefinition,
    options?: { absolute: boolean }
  ): string {
    const { routeName, parameters, queryStringParameters } = routeDefinition

    const pathname = this.getRoutePathname(routeName)
    const allParameters = this._getAllRouteParameters(parameters)

    // replace parameters values
    const urlParts = []

    if (options?.absolute) {
      urlParts.push(document.location.origin)
      urlParts.push(document.location.pathname)
      urlParts.push('#')
    }

    urlParts.push(this._buildPathnameParams(pathname, allParameters))

    if (!queryStringParameters) {
      return urlParts.join('')
    }

    // add querystring parameters
    const queryString = this.computeRouteQueryString(queryStringParameters)

    if (!queryString) {
      return urlParts.join('')
    }

    return `${urlParts.join('')}?${queryString}`
  }

  /**
   * Compute the querystring from the route querystring parameters.
   */
  computeRouteQueryString(
    queryStringParameters: TRouteDefinition['queryStringParameters']
  ): string {
    return stringifyQs(queryStringParameters, {
      allowDots: true,
      skipNulls: true
    })
  }

  /**
   * Causes a hard redirection to /.
   */
  hardRedirectToRoot() {
    window.document.location.href = '/'
  }

  /**
   * Causes a "hard redirection" (change browser url).
   */
  hardRedirect(routeDefinition: Maybe<TRouteDefinition | string>): void {
    // take the location of the window to manipule browser href

    if (!routeDefinition) {
      this.reload()
      return
    }

    if (typeof routeDefinition === 'string') {
      window.document.location.href = routeDefinition
      return
    }

    const url = this.computeRouteUrl(routeDefinition)

    window.document.location.href = forgeClientPathname('/identity')(url)
  }

  /**
   * Return true if the current pathname starts with `pathname`.
   * Useful for menu selections.
   */
  isCurrentPathnameStartsWith(pathname: string): boolean {
    return this.getCurrentRouteSpecs()?.pathname.startsWith(pathname) || false
  }

  /**
   * Log registered routes.
   */
  dumpRoutes() {
    const allRouteNames = Object.keys(this._routes) as Array<
      TRouteDefinition['routeName']
    >

    allRouteNames.forEach(routeName => {
      const routeSpecs = this._routes[routeName]
      this._logger('info')(`- ${routeName}: ${routeSpecs.pathname}`)
    })
  }

  /**
   * Reload
   */
  reload() {
    window.document.location.reload()
  }

  /**
   * Return the history object
   */
  get history(): History {
    return this._assertHistoryDefined()
  }

  /**
   * Return the location object
   */
  get location(): Location {
    return this._assertLocationDefined()
  }

  /**
   * Return the navigate function.
   */
  get navigate(): NavigateFunction {
    return this._assertNavigateFunctionDefined()
  }

  /* Private */

  private _assertHistoryDefined(): History {
    if (!this._history) {
      throw new Error('History is not defined')
    }

    return this._history
  }

  private _assertLocationDefined(): Location {
    if (!this._location) {
      throw new Error('Location is not defined')
    }

    return this._location
  }

  private _assertNavigateFunctionDefined(): NavigateFunction {
    if (!this._navigate) {
      throw new Error('Navigate function is not defined')
    }

    return this._navigate
  }

  /**
   * Return all route parameters.
   */
  private _getAllRouteParameters(
    routeParameters?: Maybe<RouteUrlParameters>
  ): RouteUrlParameters {
    const allParameters: RouteUrlParameters = {
      ...this._defaultRouteParameters,
      ...routeParameters
    }
    return allParameters
  }

  /**
   * Return a pathname with parameters replaced in placeholders.
   */
  private _buildUrlParams(
    pathname: string,
    allParameters: RouteUrlParameters
  ): string {
    let url = pathname.replace(/:(\w+)/g, parameterName => {
      // remove ':' at beginning
      const replacement = get(allParameters, parameterName.slice(1))

      if (replacement === undefined) {
        this._logger('warn')(
          `Missing replacement for the parameter "${parameterName}" in the endpoint "${pathname}".`
        )
        return parameterName
      }

      return String(replacement)
    })

    // trim trailing '/'
    if (url !== '/') {
      url = url.replace(/\/*$/, '')
    }

    return url
  }

  /**
   * Cast parameters to numbers if declared as a number and if it looks like
   * a number.
   */
  private _castParameters<T extends TRouteDefinition>(
    route: T,
    parameters: {
      [key: string]: string
    }
  ): T['parameters'] {
    const paramTypes = Object.entries(route.parameters).reduce(
      (acc, [param, type]) => {
        acc.set(param, typeof type === 'number' ? 'number' : 'string')
        return acc
      },
      new Map<string, 'string' | 'number'>()
    )

    const finalParams = Object.entries(parameters).reduce<T['parameters']>(
      (acc, [key, value]) => {
        if (!isDefined(value)) {
          return acc
        }

        const isDigit =
          paramTypes.get(key) === 'number' && /^[0-9]+$/.test(value)

        return {
          ...acc,
          [key]: isDigit ? Number(value) : value
        }
      },
      {}
    )

    return finalParams
  }

  /**
   * Return a pathname with parameters replaced in placeholders.
   */
  private _buildPathnameParams(
    pathname: string,
    allParameters: RouteUrlParameters
  ): string {
    let url = pathname.replace(/:(\w+)/g, parameterName => {
      // remove ':' at beginning
      const replacement = get(allParameters, parameterName.slice(1))

      if (replacement === undefined) {
        this._logger('warn')(
          `Missing replacement for the parameter "${parameterName}" in the endpoint "${pathname}".`
        )
        return parameterName
      }

      return String(replacement)
    })

    // trim trailing '/'
    if (url !== '/') {
      url = url.replace(/\/*$/, '')
    }

    return url
  }
}
