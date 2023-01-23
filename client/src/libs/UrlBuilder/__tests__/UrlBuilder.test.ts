/**
 * @jest-environment jsdom
 */

import UrlBuilder from '../UrlBuilder'
import { TestRouteName, TestRouter, testRoutes } from './routes.test-helpers'
import { createMemoryHistory } from 'history'

describe('UrlBuilder', () => {
  let router: TestRouter

  beforeEach(() => {
    router = new UrlBuilder(testRoutes)

    router.setRouterDefaultRouteParameters({
      profileName: 'productive-codebases'
    })
  })

  describe('getCurrentRouteSpecs', () => {
    it('should return the route specs of the routeName of the current location pathname', () => {
      const history = createMemoryHistory({
        initialEntries: [`/auth/login`]
      })

      router.setHistory(history)

      const routeSpecs = router.getCurrentRouteSpecs()

      expect(routeSpecs?.routeName).toEqual(TestRouteName.Auth_Login)
      expect(routeSpecs?.pathname).toEqual('/auth/login')
    })
  })

  describe('getRouteSpecs', () => {
    it('should return the route specs of a routeName', () => {
      const routeSpecs = router.getRouteSpecs(TestRouteName.Auth_Login)

      expect(routeSpecs?.routeName).toEqual(TestRouteName.Auth_Login)
      expect(routeSpecs.pathname).toEqual('/auth/login')
    })
  })

  describe('getRoutePathname', () => {
    it('should return the pathname of a routeName', () => {
      const pathname = router.getRoutePathname(TestRouteName.Auth_Login)

      expect(pathname).toEqual('/auth/login')
    })
  })

  describe('getRelativeRoutesPathname', () => {
    it('should return the relative pathname between two routeNames', () => {
      const pathname = router.getRelativeRoutesPathname(
        TestRouteName.Auth,
        TestRouteName.Auth_Login
      )

      expect(pathname).toEqual('login')
    })
  })

  describe('getCurrentRouteName', () => {
    it('should return the routeName of the current location pathname', () => {
      const history = createMemoryHistory({
        initialEntries: ['/auth/login']
      })

      router.setHistory(history)

      const routeName = router.getCurrentRouteName()

      expect(routeName).toEqual(TestRouteName.Auth_Login)
    })
  })

  describe('getRouteName', () => {
    it('should return the routeName of the passed pathname', () => {
      const routeName = router.getRouteName('/auth/login')

      expect(routeName).toEqual(TestRouteName.Auth_Login)
    })
  })

  describe('getRouteParameters', () => {
    it('should retrieve route parameters of the current routeName and cast numbers', () => {
      const history = createMemoryHistory({
        initialEntries: ['/identity/w/assets/images/logo.png']
      })

      router.setHistory(history)

      const params = router.getRouteParameters({
        routeName: TestRouteName.MiddlewareAssets_Images,
        parameters: {
          image: String()
        }
      })

      expect(params).toEqual({
        image: 'logo.png'
      })
    })

    it('should cast only parameters which are numbers', () => {
      const history = createMemoryHistory({
        initialEntries: [
          '/profile/productive-codebases/indicators-of-exposure/details/20-C_PRE_WIN2000_ACCESS_MEMBERS/deviant-objects'
        ]
      })

      router.setHistory(history)

      const params = router.getRouteParameters({
        routeName: TestRouteName.IoE_Details_DeviantObjects,
        parameters: {
          checkerId: Number(),
          checkerCodename: String()
        }
      })

      expect(params).toEqual({
        profileName: 'productive-codebases',
        checkerId: 20,
        checkerCodename: 'C_PRE_WIN2000_ACCESS_MEMBERS'
      })
    })

    it('should return null if url parameters do not match with the route name', () => {
      const history = createMemoryHistory({
        initialEntries: ['/auth/login/events/1,,3']
      })

      router.setHistory(history)

      const params = router.getRouteParameters({
        routeName: TestRouteName.TrailFlow_EventDetails,
        parameters: {
          infrastructureId: Number(),
          directoryId: Number(),
          eventId: String()
        }
      })

      expect(params).toBeNull()
    })
  })

  describe('computeRouteUrl', () => {
    it('should return an url from a routeName and routeParameters', () => {
      router.setRouterDefaultRouteParameters({
        profileName: 'productive-codebases'
      })

      const path = router.computeRouteUrl({
        routeName: TestRouteName.TrailFlow_EventDetails,
        parameters: {
          infrastructureId: 1,
          directoryId: 2,
          eventId: '3'
        }
      })

      expect(path).toEqual(
        '/profile/productive-codebases/trail-flow/events/1,2,3'
      )
    })

    it('should log a warning if a parameter is missing', () => {
      const logs: string[] = []

      // @ts-expect-error Logger is private
      jest.spyOn(router, '_logger').mockImplementation(() => {
        return (...args: []) => {
          logs.push(...args)
        }
      })

      router.setRouterDefaultRouteParameters({
        profileName: 'productive-codebases'
      })

      // @ts-expect-error - Parameter is voluntary missing
      const path = router.computeRouteUrl({
        routeName: TestRouteName.TrailFlow_EventDetails,
        parameters: {
          infrastructureId: 1,
          eventId: 3
        }
      })

      expect(path).toEqual(
        '/profile/productive-codebases/trail-flow/events/1,:directoryId,3'
      )

      expect(logs).toEqual([
        'Missing replacement for the parameter ":directoryId" in the endpoint "/profile/:profileName/trail-flow/events/:infrastructureId,:directoryId,:eventId".'
      ])
    })

    it('should build a querystring', () => {
      router.setRouterDefaultRouteParameters({
        profileName: 'productive-codebases'
      })

      const path = router.computeRouteUrl({
        routeName: TestRouteName.MiddlewareAuth_Logout,
        parameters: {},
        queryStringParameters: {
          error: 'There is a problem',
          shouldNotBeHere: null,
          shouldNotBeHere2: undefined,
          true: 1
        }
      })

      expect(path).toEqual('/logout?error=There%20is%20a%20problem&true=1')
    })

    describe('With options', () => {
      describe('absolute', () => {
        it('should build an absolute url', () => {
          router.setRouterDefaultRouteParameters({
            profileName: 'productive-codebases'
          })

          const url = router.computeRouteUrl(
            {
              routeName: TestRouteName.TrailFlow_EventDetails,
              parameters: {
                infrastructureId: 1,
                directoryId: 2,
                eventId: '3'
              }
            },
            { absolute: true }
          )

          expect(url).toEqual(
            'http://localhost/#/profile/productive-codebases/trail-flow/events/1,2,3'
          )
        })
      })
    })
  })

  describe('getCurrentRouteQueryStringParameters', () => {
    it('should return a formatted result', () => {
      const location = {
        search:
          '?normalParam1=yay&normalParam2[]=zz&normalParam2[]=yy&normalParam3=wow' +
          '&aaa.param1=3&aaa.param2=lorem' +
          '&bbb.param1=123&bbb.param3[]=adipiscing&bbb.param3[]=elit' +
          '&ccc[0].param4[]=dolor&ccc[0].param4[]=sit' +
          '&ccc[1].param1=8&ccc[1].param4[]=amet&ccc[1].param4[]=consectetur'
      }

      const history = createMemoryHistory({
        initialEntries: [
          {
            search: location.search
          }
        ]
      })

      router.setHistory(history)

      const result = router.getCurrentRouteQueryStringParameters()

      expect(result).toEqual({
        normalParam1: 'yay',
        normalParam2: ['zz', 'yy'],
        normalParam3: 'wow',
        aaa: {
          param1: '3',
          param2: 'lorem'
        },
        bbb: {
          param1: '123',
          param3: ['adipiscing', 'elit']
        },
        ccc: [
          {
            param4: ['dolor', 'sit']
          },
          {
            param1: '8',
            param4: ['amet', 'consectetur']
          }
        ]
      })
    })
  })

  describe('isCurrentPathnameStartsWith', () => {
    it('should return true if the current path is starting with the given pathname', () => {
      const history = createMemoryHistory({
        initialEntries: [`/dashboard`]
      })

      router.setHistory(history)

      expect(router.isCurrentPathnameStartsWith('/dashboard')).toBe(true)
      expect(router.isCurrentPathnameStartsWith('/auth')).toBe(false)
    })
  })
})
