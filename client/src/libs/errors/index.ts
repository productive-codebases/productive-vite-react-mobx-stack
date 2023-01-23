/* eslint-disable max-classes-per-file */

import { CustomError } from './CustomError'
import { ErrorName } from './types'

/**
 * Used for any errors related to an access unauthorized (401).
 */
export class UnauthorizedAccessError extends CustomError<string> {
  constructor(message?: string) {
    super(message || 'Authorized access error')
    this.name = ErrorName.UnauthorizedAccessError
  }
}

/**
 * Used for any error in the application (related to stores, mainly).
 */
export class ApplicationError extends CustomError<{
  message: string
}> {
  constructor(parameters: { message: string }) {
    super(parameters || { message: 'Application error' })
    this.name = ErrorName.ApplicationError
  }
}
