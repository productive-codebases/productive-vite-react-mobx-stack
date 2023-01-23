import { omit } from 'lodash'
import {
  FetchClientEventName,
  FetchClientHookFn,
  HTTPMethod,
  IFetchClient,
  IFetchClientContext,
  IFetchClientHeaders,
  IFetchClientParams,
  IFetchClientQueryStats,
  TFetchClientFetchFunction
} from './types'

export default class FetchClient implements IFetchClient {
  // counter (used for kind of very basic profiling)
  private _stats: boolean = false

  private _queriesStats: Set<IFetchClientQueryStats> = new Set()

  // mapping of hooks
  private _hooks: Map<FetchClientEventName, Set<FetchClientHookFn>> = new Map()

  constructor(
    public fetchFunction: TFetchClientFetchFunction,
    public context: IFetchClientContext = {}
  ) {}

  /**
   * Do a GET query.
   */
  get(input: RequestInfo, init: RequestInit = {}): Promise<Response> {
    const requestInit = {
      ...init,
      method: HTTPMethod.GET
    }

    return this.fetch(input, requestInit)
  }

  /**
   * Do a POST query.
   */
  post(
    input: RequestInfo,
    bodyParams: IFetchClientParams | IFetchClientParams[],
    init: RequestInit = {}
  ): Promise<Response> {
    const requestInit = {
      ...init,
      method: HTTPMethod.POST,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers
      },
      body: JSON.stringify(bodyParams)
    }

    return this.fetch(input, requestInit)
  }

  /**
   * Do a PATCH query.
   */
  patch(
    input: RequestInfo,
    bodyParams: IFetchClientParams,
    init: RequestInit = {}
  ): Promise<Response> {
    const requestInit = {
      ...init,
      method: HTTPMethod.PATCH,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers
      },
      body: JSON.stringify(bodyParams)
    }

    return this.fetch(input, requestInit)
  }

  /**
   * Do a PUT query.
   */
  put(
    input: RequestInfo,
    bodyParams: IFetchClientParams,
    init: RequestInit = {}
  ): Promise<Response> {
    const requestInit = {
      ...init,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...init.headers
      },
      body: JSON.stringify(bodyParams)
    }

    return this.fetch(input, requestInit)
  }

  /**
   * Do a DELETE query.
   */
  delete(
    input: RequestInfo,
    bodyParams: IFetchClientParams,
    init: RequestInit = {}
  ): Promise<Response> {
    const requestInit = {
      ...init,
      method: HTTPMethod.DELETE,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers
      },
      body: JSON.stringify(bodyParams)
    }

    return this.fetch(input, requestInit)
  }

  /**
   * Fetch the query.
   */
  fetch(input: RequestInfo, init: RequestInit = {}): Promise<Response> {
    // add headers of the context if set
    if (this.context.headers) {
      init.headers = {
        ...(init.headers || {}),
        ...this.context.headers
      }
    }

    // prefix with the baseURL context if set
    if (typeof input === 'string' && this.context.baseURL) {
      input = this.context.baseURL + input
    }

    // set cookies of the same origin
    init.credentials = 'same-origin'

    return this.fetchFunction(input, init).then(res => {
      this._applyPostQueryHooks(input, init, res)
      this._addToStats(input, init, res)
      return res
    })
  }

  /**
   * Set headers in the context.
   */
  setHeaders(headers: IFetchClientHeaders): this {
    this.context.headers = {
      ...this.context.headers,
      ...headers
    }

    return this
  }

  /**
   * Remove a header from the context.
   */
  removeHeader(name: string): this {
    this.context.headers = omit(this.context.headers, name)

    return this
  }

  /**
   * Return the context.
   */
  getContext(): IFetchClientContext {
    return this.context
  }

  /**
   * Return a set of hooks for a event name.
   */
  getHooks(eventName: FetchClientEventName) {
    return this._hooks.get(eventName) || new Set()
  }

  /**
   * Register hooks.
   */
  on(eventName: FetchClientEventName, hook: FetchClientHookFn): this {
    const existingHooks = this.getHooks(eventName)
    this._hooks.set(eventName, existingHooks.add(hook))

    return this
  }

  /**
   * Activate/Deactivate statistics.
   */
  enableStats(status: boolean): this {
    this._stats = status

    if (!status) {
      this._queriesStats.clear()
    }

    return this
  }

  /**
   * Return statistics.
   */
  getStats(): Set<IFetchClientQueryStats> {
    return this._queriesStats
  }

  /* Private */

  /**
   * Apply registered post-query hooks.
   */
  private _applyPostQueryHooks(
    input: RequestInfo,
    init: RequestInit,
    res: Response
  ): void {
    Array.from(this.getHooks(FetchClientEventName.postQuery)).forEach(hook => {
      hook(input, init, res)
    })
  }

  /**
   * Add the query to statistics.
   */
  private _addToStats(
    input: RequestInfo,
    init: RequestInit,
    res: Response
  ): void {
    if (!this._stats) {
      return
    }

    this._queriesStats.add({
      date: new Date().toISOString(),
      url: String(input),
      method: init.method || '',
      statusCode: res.status
    })
  }
}
