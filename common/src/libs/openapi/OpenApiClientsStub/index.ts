import { IOpenApiClients } from '../types'
import { OpenApiResponsesMocker } from './OpenApiResponsesMocker'
import { DashboardUsersResourceApiStub } from './stubs/DashboardUsersResourceApiStub'

export class OpenApiClientsStub implements IOpenApiClients {
  dashboardUserResourceApi!: DashboardUsersResourceApiStub

  constructor() {
    this.createClients()
  }

  /**
   * Instanciate all OpenApi clients.
   */
  createClients(): this {
    /**
     * Dashboard demo service
     */

    this.dashboardUserResourceApi = new DashboardUsersResourceApiStub(
      new OpenApiResponsesMocker()
    )

    return this
  }

  setAuthToken(): this {
    throw new Error('No stub implementation')
  }

  unsetAuthToken(): this {
    throw new Error('No stub implementation')
  }
}
