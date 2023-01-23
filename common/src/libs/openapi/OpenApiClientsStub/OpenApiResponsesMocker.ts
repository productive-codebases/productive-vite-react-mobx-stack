import { newLogger } from '../../logger'
import {
  IOpenApiClientStubMockResponses,
  OpenApiClientStubOnCallFn
} from '../types'

export class OpenApiResponsesMocker {
  private _logger = newLogger('common')('stubs')

  // Stubs responses, useful for unit tests.
  // Array of error, success.
  private _mockResponses: Array<
    IOpenApiClientStubMockResponses<any, any, any>
  > = []

  /**
   * Return the response shifted from the _mockResponses.
   */
  getMockedResponse<TRequest, TResponse>(
    methodName: string,
    request: TRequest
  ): Promise<TResponse> {
    const stubResponses = this._mockResponses.shift()

    if (!stubResponses) {
      const message = `Call to the method "${methodName}" has no mock responses!`

      this._logger('error')(message)

      throw new Error(message)
    }

    const [error, success] = stubResponses.responses

    // exec the onCall callback if defined to make expectations on passed variables
    if (stubResponses.onCall) {
      stubResponses.onCall({ request })
    }

    if (error) {
      return Promise.reject(error)
    }

    return Promise.resolve(success)
  }

  /**
   * Add a response that will be shifted when querying.
   */
  addMockResponse<TFailed, TSuccess, TRequest = any>(
    failResponse: TFailed,
    successResponse: TSuccess,
    onCall?: OpenApiClientStubOnCallFn<TRequest>
  ): this {
    const mock: IOpenApiClientStubMockResponses<TFailed, TSuccess, TRequest> = {
      responses: [failResponse, successResponse],
      onCall
    }

    this._mockResponses.push(mock)

    return this
  }
}
