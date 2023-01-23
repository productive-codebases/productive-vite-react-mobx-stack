import { IRouteDefinition, Routes } from '../types'
import UrlBuilder from '../UrlBuilder'

/**
 * Console routes definitions.
 */

export enum TestRouteName {
  'Root' = 'Root',
  'HomePage' = 'HomePage',

  'Auth' = 'Auth',
  'Auth_Login' = 'Auth_Login',

  'TrailFlow_EventDetails' = 'TrailFlow_EventDetails',
  'IoE_Details_DeviantObjects' = 'IoE_Details_DeviantObjects',

  'MiddlewareAssets_Images' = 'MiddlewareAssets_Images',
  'MiddlewareAuth_Logout' = 'MiddlewareAuth_Logout'
}

/* Interfaces definitions */

interface IRootRouteDefinition extends IRouteDefinition<TestRouteName> {
  routeName: TestRouteName.Root
}

interface IHomePageRouteDefinition extends IRouteDefinition<TestRouteName> {
  routeName: TestRouteName.HomePage
  parameters: {}
}

interface IAuthRouteDefinition extends IRouteDefinition<TestRouteName> {
  routeName: TestRouteName.Auth
}

interface IAuthLoginRouteDefinition extends IRouteDefinition<TestRouteName> {
  routeName: TestRouteName.Auth_Login
  parameters: {}
}

export interface IIoEDetailsDeviantObjectsRouteDefinition
  extends IRouteDefinition<TestRouteName> {
  routeName: TestRouteName.IoE_Details_DeviantObjects
  parameters: {
    checkerId: number
    checkerCodename: string
  }
}

export interface ITrailFlowEventDetailsRouteDefinition
  extends IRouteDefinition<TestRouteName> {
  routeName: TestRouteName.TrailFlow_EventDetails
  parameters: {
    infrastructureId: number
    directoryId: number
    eventId: string
  }
}

interface IMiddlewareAssetsImagesRouteDefinition
  extends IRouteDefinition<TestRouteName> {
  routeName: TestRouteName.MiddlewareAssets_Images
  parameters: {
    image: string
  }
}

export interface IMiddlewareAuthLogoutRouteDefinition
  extends IRouteDefinition<TestRouteName> {
  routeName: TestRouteName.MiddlewareAuth_Logout
  parameters: {}
}

/* Union of all routes */

export type TestRouteDefinition =
  | IRootRouteDefinition
  | IHomePageRouteDefinition
  | IAuthRouteDefinition
  | IAuthLoginRouteDefinition
  | IIoEDetailsDeviantObjectsRouteDefinition
  | ITrailFlowEventDetailsRouteDefinition
  | IMiddlewareAssetsImagesRouteDefinition
  | IMiddlewareAuthLogoutRouteDefinition

/* Routes record */

export const testRoutes: Routes<TestRouteName> = {
  /* Client routes */

  [TestRouteName.Root]: {
    routeName: TestRouteName.Root,
    abstract: true,
    pathname: '/'
  },

  [TestRouteName.HomePage]: {
    routeName: TestRouteName.HomePage,
    pathname: '/dashboard'
  },

  [TestRouteName.Auth]: {
    routeName: TestRouteName.Auth,
    abstract: true,
    pathname: '/auth'
  },

  [TestRouteName.Auth_Login]: {
    routeName: TestRouteName.Auth_Login,
    pathname: '/auth/login'
  },

  [TestRouteName.TrailFlow_EventDetails]: {
    routeName: TestRouteName.TrailFlow_EventDetails,
    pathname:
      '/profile/:profileName/trail-flow/events/:infrastructureId,:directoryId,:eventId',
    noTelemetry: true
  },

  [TestRouteName.IoE_Details_DeviantObjects]: {
    routeName: TestRouteName.IoE_Details_DeviantObjects,
    pathname:
      '/profile/:profileName/indicators-of-exposure/details/:checkerId-:checkerCodename/deviant-objects'
  },

  [TestRouteName.MiddlewareAssets_Images]: {
    routeName: TestRouteName.MiddlewareAuth_Logout,
    pathname: '/identity/w/assets/images/:image'
  },

  [TestRouteName.MiddlewareAuth_Logout]: {
    routeName: TestRouteName.MiddlewareAuth_Logout,
    pathname: '/logout'
  }
}

export type TestRouter = UrlBuilder<TestRouteName, TestRouteDefinition>
