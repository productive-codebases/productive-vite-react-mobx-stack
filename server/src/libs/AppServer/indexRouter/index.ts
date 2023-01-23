import { Request, Response } from 'express'
import { logException } from '../../logger/logException'
import { ServerContext } from '../../ServerContext'
import { compileIndex, getManifestEntries } from './helpers'
import { IServerTemplateVariables } from './types'

/**
 * Return the index router function.
 * Render the HTML template with JS bundles linked inside for the client app.
 */
export function indexRouter(serverContext: ServerContext) {
  const compiledTemplate = compileIndex()
  const manifestEntries = getManifestEntries()

  const templateVariables: IServerTemplateVariables = {
    title: 'My app',
    indexHtmlScript: manifestEntries['index.html'].file,
    indexCssScript: manifestEntries['index.html'].css
  }

  const html = compiledTemplate(templateVariables)

  return async (req: Request, res: Response) => {
    try {
      res.set('Content-Type', 'text/html').send(html)
    } catch (err) {
      if (err instanceof Error) {
        logException(serverContext.logger('init'))(
          err,
          'Error during the compilation of the template.'
        )
      }

      const error = {
        message: 'An error has occurred'
      }

      res.status(500).send(error)
    }
  }
}
