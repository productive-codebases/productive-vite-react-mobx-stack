import {
  camelCaseToSnakeCaseJsonTransformer,
  unprotectDefaultPropertyJsonTransformer
} from '@/common/libs/json-helpers'
import { randomValueBetween } from 'bouchon-reloaded'
import { Request, Response } from 'express'
import { HttpResponseError, HttpResponseNotFound } from './errors'

interface ICreateResponseOptions {
  // HTTP response status
  statusCode?: number
  // optional JSON transformer (camelCase to snake_case for example)
  jsonTransformers?: Array<(input: any) => any>
  // simulate network delay (in ms)
  delay?: [number, number]
}

const logger = console

/**
 * Create a HTTP response for Bouchon's routes implementation.
 */
export function createResponse<TResponse>(
  responseHandler: (req: Request, res: Response) => TResponse,
  options: ICreateResponseOptions = {
    jsonTransformers: [
      unprotectDefaultPropertyJsonTransformer,
      camelCaseToSnakeCaseJsonTransformer
    ],
    delay: [1000, 1000]
  }
) {
  const delay = options?.delay ? randomValueBetween(...options.delay) : 0

  return (req: Request, res: Response): void => {
    try {
      const json = responseHandler(req, res)

      // if the response is empty, consider returning an empty object
      // to avoid OpenAPI decoding errors
      const finalJson =
        (options?.jsonTransformers
          ? // apply all transform functions
            options.jsonTransformers.reduce(
              (acc, transformer) => transformer(acc),
              json
            )
          : json) || {}

      setTimeout(
        () => res.status(200).send(finalJson),
        // simulate some network delay
        delay
      )

      return
    } catch (err) {
      const sendError = createErrorResponse(req, res)

      if (err instanceof HttpResponseError) {
        sendError(500, err.message)
        return
      }

      if (err instanceof HttpResponseNotFound) {
        sendError(404, err.message)
        return
      }

      if (err instanceof Error) {
        if (err.stack) {
          logger.error(err.stack)
        }

        sendError(500, err.message)

        return
      }

      sendError(500, 'Unknown error')
    }
  }
}

function createErrorResponse(req: Request, res: Response) {
  return (statusCode: number, message: string): void => {
    const errorPayload = {
      message
    }

    res.status(statusCode).send(errorPayload)
  }
}
