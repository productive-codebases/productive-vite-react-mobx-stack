import { Request, Response } from 'express'
import { ServerContext } from '../../ServerContext'

/**
 * Return the configuration.
 */
export function configurationRouter(serverContext: ServerContext) {
  return (req: Request, res: Response) => {
    return res.json(serverContext.clientConfig)
  }
}
