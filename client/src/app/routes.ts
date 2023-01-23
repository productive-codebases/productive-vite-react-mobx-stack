import { IRouteDefinition, Routes } from '../libs/UrlBuilder/types'
import UrlBuilder from '../libs/UrlBuilder/UrlBuilder'

export enum AppRouteName {
  'Root' = 'Root',
  'Login' = 'Login',
  'HomePage' = 'HomePage',

  'Dashboard' = 'Dashboard'
}

/* Routes definitions */

export interface IRootRouteDefinition extends IRouteDefinition<AppRouteName> {
  routeName: AppRouteName.Root
}

export interface ILoginPageRouteDefinition
  extends IRouteDefinition<AppRouteName> {
  routeName: AppRouteName.Login
  parameters: {}
}

export interface IHomePageRouteDefinition
  extends IRouteDefinition<AppRouteName> {
  routeName: AppRouteName.HomePage
  parameters: {}
}

export interface IDashboardRouteDefinition
  extends IRouteDefinition<AppRouteName> {
  routeName: AppRouteName.Dashboard
  parameters: {}
}

/* Union of all routes */

export type AppRouteDefinition =
  | IRootRouteDefinition
  | ILoginPageRouteDefinition
  | IHomePageRouteDefinition
  | IDashboardRouteDefinition

/* Routes record */

export const appRoutes: Routes<AppRouteName> = {
  [AppRouteName.Root]: {
    routeName: AppRouteName.Root,
    abstract: true,
    pathname: '/'
  },

  [AppRouteName.Login]: {
    routeName: AppRouteName.Login,
    pathname: '/login'
  },

  [AppRouteName.HomePage]: {
    routeName: AppRouteName.HomePage,
    pathname: '/dashboard'
  },

  [AppRouteName.Dashboard]: {
    routeName: AppRouteName.Dashboard,
    pathname: '/dashboard'
  }
}

// npm run show:routes:client
if (typeof require !== 'undefined' && require.main === module) {
  const urlBuilder = new UrlBuilder(appRoutes)
  urlBuilder.dumpRoutes()
}
