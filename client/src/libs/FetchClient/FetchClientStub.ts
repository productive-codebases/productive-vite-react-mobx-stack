import { newLogger } from '@/common/libs/logger'
import {
  FetchClientStubOnCallFn,
  IFetchClient,
  IFetchClientParams,
  IFetchClientStubMockResponses
} from './types'

export default class FetchClientStub implements IFetchClient {
  private _logger = newLogger('client')('FetchClient')

  // Stubs responses, useful for unit tests.
  // Array of error, success.
  private _mockResponses: Array<IFetchClientStubMockResponses<any, any>> = []

  /**
   * Add a response that will be shifted when querying.
   */
  addMockResponse<TFailed, TSuccess>(
    failResponse: TFailed,
    successResponse: TSuccess,
    onCall?: FetchClientStubOnCallFn
  ): this {
    const mock: IFetchClientStubMockResponses<TFailed, TSuccess> = {
      responses: [failResponse, successResponse],
      onCall
    }

    this._mockResponses.push(mock)

    return this
  }

  /**
   * Do a GET query.
   */
  get(input: RequestInfo, init?: RequestInit): Promise<Response> {
    return this.fetch(input, init)
  }

  /**
   * Do a POST query.
   */
  post(
    input: RequestInfo,
    bodyParams: IFetchClientParams | IFetchClientParams[],
    init?: RequestInit
  ): Promise<Response> {
    return this.fetch(input, init)
  }

  /**
   * Do a PATCH query.
   */
  patch(
    input: RequestInfo,
    bodyParams: IFetchClientParams,
    init?: RequestInit
  ): Promise<Response> {
    return this.fetch(input, init)
  }

  /**
   * Do a PUT query.
   */
  put(
    input: RequestInfo,
    bodyParams: IFetchClientParams,
    init?: RequestInit
  ): Promise<Response> {
    return this.fetch(input, init)
  }

  /**
   * Do a DELETE query.
   */
  delete(
    input: RequestInfo,
    bodyParams: IFetchClientParams,
    init?: RequestInit
  ): Promise<Response> {
    return this.fetch(input, init)
  }

  /**
   * Fetch the query.
   */
  fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    const stubResponses = this._mockResponses.shift()

    if (!stubResponses) {
      const message = `Request to the url "${input}" has no mock responses!`

      this._logger('error')(message)

      throw new Error(message)
    }

    const [error, success] = stubResponses.responses

    // exec the onCall callback if defined to make expectations on passed variables
    if (stubResponses.onCall) {
      stubResponses.onCall({ input, init })
    }

    if (error) {
      return Promise.reject(error)
    }

    return Promise.resolve(success)
  }

  setHeaders(): this {
    return this
  }

  removeHeader(): this {
    return this
  }
}
