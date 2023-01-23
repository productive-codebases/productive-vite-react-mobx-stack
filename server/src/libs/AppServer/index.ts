import { filterNullOrUndefinedValues } from '@/common/helpers/filterNullOrUndefinedValues'
import { runtimePaths } from '@/common/paths'
import { MaybeUndef } from '@/common/types'
import colors from 'colors'
import express from 'express'
import * as fs from 'fs'
import * as http from 'http'
import * as https from 'https'
import morgan from 'morgan'
import { configReplacer } from '../config/parseConfig'
import { logException } from '../logger/logException'
import { ServerContext } from '../ServerContext'
import { configurationRouter } from './configurationRouter'
import { indexRouter } from './indexRouter'

export default class AppServer {
  private app: express.Express

  private httpServer: MaybeUndef<http.Server>

  constructor(private serverContext: ServerContext) {
    this.app = express()

    this.app.use(express.json({ limit: '2mb' }))
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(
      morgan('dev', {
        stream: {
          write: serverContext.logger('init')('info')
        }
      })
    )
  }

  getApp() {
    return this.app
  }

  getServer() {
    return this.httpServer
  }

  /**
   * Serve assets files.
   *
   * When being in development, no compiled files is saved server side,
   * the client app is served by the Vite development server.
   */
  configureStaticRouter(): this {
    if (this.serverContext.isUsedInDevelopment()) {
      return this
    }

    this.app.use(
      '/w/static',
      express.static(runtimePaths.serverClientStaticDir)
    )

    // serve dist/client root directory since manifest file contains paths
    // including "/assets/" folder
    this.app.use('/w', express.static(runtimePaths.serverClientDir))

    return this
  }

  /**
   * Serve the configuration.
   */
  configureConfigurationRouter(): this {
    this.app.get('/w/configuration', configurationRouter(this.serverContext))

    return this
  }

  /**
   * Serve the app.
   *
   * When being in development, no compiled files is saved server side,
   * the client app is served by the Vite development server.
   */
  configureIndexRouter(): this {
    if (this.serverContext.isUsedInDevelopment()) {
      return this
    }

    this.app.use('/', indexRouter(this.serverContext))

    return this
  }

  /**
   * Initialize the server.
   */
  configureServer(): this {
    const tlsConfig = this.serverContext.serverConfig.tls

    // initialize HTTP server
    if (tlsConfig.paths && tlsConfig.enabled) {
      try {
        const options: https.ServerOptions = filterNullOrUndefinedValues({
          key: fs.readFileSync(tlsConfig.paths.key),
          cert: fs.readFileSync(tlsConfig.paths.cert),
          ca: tlsConfig.paths.ca && fs.readFileSync(tlsConfig.paths.ca)
        })

        this.httpServer = https.createServer(options, this.app)
        return this
      } catch (err) {
        if (err instanceof Error) {
          this.serverContext.logger('init')('error')(err)
          process.exit(1)
        }
      }
    }

    this.httpServer = http.createServer(this.app)

    return this
  }

  /**
   * Start the server.
   */
  start(configFileName: string): Promise<AppServer> {
    const { httpServer } = this

    if (!httpServer) {
      throw new Error('HTTP server is undefined!')
    }

    return new Promise((resolve, reject) => {
      httpServer
        .listen(
          this.serverContext.serverConfig.port,
          this.serverContext.serverConfig.hostname
        )
        .on('listening', () => {
          this.serverContext.logger('init')('info')(
            `Server is listening on ${colors.bold.underline(
              `${this.serverContext.serverConfig.hostname}:${this.serverContext.serverConfig.port}`
            )} with the ${colors.bold.underline(
              configFileName
            )} configuration file:`
          )

          this.serverContext.logger('init')('info')(
            JSON.stringify(this.serverContext.serverConfig, configReplacer, 2)
          )

          resolve(this)
        })
        .on('error', err => {
          logException(this.serverContext.logger('init'))(
            err,
            'Error when starting the server.'
          )
          reject(err)
        })
    })
  }

  /**
   * Stop the server.
   */
  stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.httpServer) {
        this.serverContext.logger('init')('warn')(
          'The server instance is not defined.'
        )
        resolve()
        return
      }

      this.httpServer.close((err: any) => {
        if (err) {
          logException(this.serverContext.logger('init'))(
            err,
            'Error when closing API server.'
          )
          reject(err)
          return
        }

        resolve()
      })
    })
  }
}
