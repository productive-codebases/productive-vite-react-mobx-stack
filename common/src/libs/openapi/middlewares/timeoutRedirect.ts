import { Middleware } from '@/common/openapi/dashboard/userResource'

/**
 * When receiving a 401 from the API, consider that the token has expired and
 * redirect to /, which should be redirected to the login page.
 */
export const timeoutRedirectMiddleware: Middleware = {
  post: context => {
    if (context.response.status === 401) {
      document.location.href = '/'
      return Promise.resolve()
    }

    return Promise.resolve(context.response)
  }
}
