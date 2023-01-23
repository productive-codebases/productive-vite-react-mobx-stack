export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export type TFetchClientFetchFunction = typeof fetch

export interface IFetchClientHeaders {
  [key: string]: any
}

export interface IFetchClientParams {
  [key: string]: any
}

export interface IFetchClientContext {
  baseURL?: string
  headers?: IFetchClientHeaders
}

export enum FetchClientEventName {
  postQuery = 'postQuery'
}

export type FetchClientHookFn = (
  requestInfo: RequestInfo,
  requestInit: RequestInit,
  res: Response
) => void

export interface IFetchClientQueryStats {
  date: string
  url: string
  method: string
  statusCode: number
}

export interface IFetchClient {
  get(input: RequestInfo, init?: RequestInit): Promise<Response>

  post(
    input: RequestInfo,
    bodyParams: IFetchClientParams | IFetchClientParams[],
    init?: RequestInit
  ): Promise<Response>

  patch(
    input: RequestInfo,
    bodyParams: IFetchClientParams,
    init?: RequestInit
  ): Promise<Response>

  put(
    input: RequestInfo,
    bodyParams: IFetchClientParams,
    init?: RequestInit
  ): Promise<Response>

  delete(
    input: RequestInfo,
    bodyParams: IFetchClientParams,
    init?: RequestInit
  ): Promise<Response>

  fetch(input: RequestInfo, init?: RequestInit): Promise<Response>

  setHeaders(headers: IFetchClientHeaders): this
  removeHeader(name: string): this
}

export type FetchClientStubOnCallFn = (parameters: {
  input: RequestInfo
  init?: RequestInit
}) => void

export interface IFetchClientStubMockResponses<TFailed, TSuccess> {
  responses: [TFailed, TSuccess]
  onCall?: FetchClientStubOnCallFn
}
