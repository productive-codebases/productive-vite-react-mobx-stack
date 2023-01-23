import {
  Configuration as DashboardUserConfiguration,
  ConfigurationParameters,
  DefaultApi as DashboardUserResourceApi,
  HTTPHeaders
} from '@/common/openapi/dashboard/userResource'
import { timeoutRedirectMiddleware } from './middlewares/timeoutRedirect'
import { IOpenApiClients, OpenApiClientsEndPoints } from './types'

export class OpenApiClients implements IOpenApiClients {
  dashboardUserResourceApi!: DashboardUserResourceApi

  defaultConfiguration: ConfigurationParameters = {
    fetchApi: window.fetch,
    headers: {},
    middleware: [timeoutRedirectMiddleware]
  }

  constructor() {
    this.createClients()
  }

  /**
   * Reinstanciate all OpenApi clients with the cookie value saved in headers.
   */
  setAuthToken(authenticationHeaders: HTTPHeaders): this {
    this.defaultConfiguration.headers = authenticationHeaders
    this.createClients()

    return this
  }

  /**
   * Reinstanciate all OpenApi clients without the cookie value.
   */
  unsetAuthToken(): this {
    this.defaultConfiguration.headers = {}
    this.createClients()

    return this
  }

  /**
   * Instanciate all OpenApi clients.
   */
  createClients(): this {
    // Dashboard (demo service)
    this.dashboardUserResourceApi = new DashboardUserResourceApi(
      new DashboardUserConfiguration({
        ...this.defaultConfiguration,
        basePath: OpenApiClientsEndPoints.dashboard
      })
    )

    return this
  }
}
