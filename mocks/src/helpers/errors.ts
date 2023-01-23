/* eslint-disable max-classes-per-file */

export class HttpResponseError extends Error {
  constructor(reason: string) {
    super(reason)
    this.name = 'HttpResponseError'
  }
}

export class HttpResponseNotFound extends Error {
  constructor(reason: string) {
    super(reason)
    this.name = 'HttpResponseNotFound'
  }
}

export class ActionNotImplementedError extends Error {
  constructor(selectorName: string, actionName: string) {
    super(
      `Selector "${selectorName}" do not implement the action "${actionName}"`
    )
    this.name = 'ActionNotImplementedError'
  }
}

export class MockDataGenerationError extends Error {
  constructor(reason: string) {
    super(reason)
    this.name = 'MockDataGenerationError'
  }
}
