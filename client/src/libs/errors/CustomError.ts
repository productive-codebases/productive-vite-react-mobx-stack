import { ErrorName } from './types'

export class CustomError<T> extends Error {
  private _isMessageString: boolean

  /**
   * Handle string or object as message.
   */
  constructor(message: T) {
    const finalMessage =
      typeof message === 'string' ? message : JSON.stringify(message)

    super(finalMessage)
    Object.setPrototypeOf(this, new.target.prototype)

    this.name = ErrorName.CustomError

    // save the type of message to know if it has to be parsed or not
    this._isMessageString = typeof message === 'string'
  }

  /**
   * Return the parsed message T from the message string.
   */
  getMessage(): T {
    if (this._isMessageString) {
      return this.message as unknown as T
    }

    try {
      return JSON.parse(this.message) as T
    } catch (err) {
      throw new Error('[CustomError] Cant parse the error payload')
    }
  }
}
