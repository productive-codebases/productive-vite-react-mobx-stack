import {
  DefaultApi as DashboardUserResourceApi,
  HTTPHeaders
} from '@/common/openapi/dashboard/userResource'

export enum OpenApiClientsEndPoints {
  dashboard = '/dashboard'
}

export interface IOpenApiClients {
  // Dasboard (demo service)
  dashboardUserResourceApi: DashboardUserResourceApi

  createClients(): IOpenApiClients
  setAuthToken(xCookieHeader: HTTPHeaders): IOpenApiClients
  unsetAuthToken(): IOpenApiClients
}

export type OpenApiClientStubOnCallFn<TRequest> = (parameters: {
  request: TRequest
}) => void

export interface IOpenApiClientStubMockResponses<TFailed, TSuccess, TRequest> {
  responses: [TFailed, TSuccess]
  onCall?: OpenApiClientStubOnCallFn<TRequest>
}
