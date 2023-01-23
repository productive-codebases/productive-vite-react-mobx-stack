import { LoggerServer } from '@/common/libs/logger/types'
import { Response } from 'express'
import { logException } from '../logger/logException'
import { IServerMessage } from './types'

interface IException extends Error {}

/**
 * Generic way to handle exceptions of server middlewares.
 */
export function handleMiddlewareExceptions(
  logger: LoggerServer,
  res: Response,
  errorMessage: string,
  debugMessage?: string
) {
  return (err: IException) => {
    logException(logger)(err, debugMessage || errorMessage)

    const error: IServerMessage = { message: errorMessage }

    res.status(500).send(error)
  }
}
