import { AppRouteDefinition, AppRouteName } from '@/client/app/routes'
import { Maybe } from '@/common/types'
import UrlBuilder from './UrlBuilder'

export interface IRouteDefinition<TRouteName extends string> {
  routeName: TRouteName
  parameters: RouteUrlParameters
  queryStringParameters?: object
  bodyParameters?: object
  headerParameters?: object
}

// Route specifications (for a service)
export interface IRouteSpecs<TRouteName extends string> {
  routeName: TRouteName
  pathname: string
  abstract?: boolean
  noTelemetry?: boolean
}

// Record of all routes (by service)
export type Routes<TRouteName extends string> = Record<
  TRouteName,
  IRouteSpecs<TRouteName>
>

// Reversed routes allowed to known witch route is currently used from a pathname
export interface IRouteSorted<TRouteName extends string> {
  pathname: string
  regexp: RegExp
  routeName: TRouteName
}

// Route parameters (url or querystring)
export type RouteUrlParameters = {
  [key: string]: string | number | Array<string | number>
}

// Route info retrieved at the runtime from the current pathname
export interface IRouteInfo<TRouteName extends string, TQueryStringParameters> {
  routeName: Maybe<TRouteName>
  routeParameters?: Maybe<RouteUrlParameters>
  queryStringParameters?: Maybe<TQueryStringParameters>
}

/**
 * UrlBuilder aliases according to the targetted layer/service.
 */

export type UrlBuilderClient = UrlBuilder<AppRouteName, AppRouteDefinition>
