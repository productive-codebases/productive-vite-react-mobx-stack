import {
  ConfigClient,
  ConfigServer,
  ConfigTarget
} from '@/common/libs/config/types'
import { newLogger } from '@/common/libs/logger'
import { getEnvFileVariables } from './environment/getEnvFileVariables'
import AppServer from './libs/AppServer'
import { parseConfig } from './libs/config/parseConfig'
import { ServerContext } from './libs/ServerContext'

const logger = newLogger('server')

function startServer(): Promise<AppServer> {
  const envFileVariables = getEnvFileVariables()

  // parse app config
  const configFileName = envFileVariables.CONFIG || 'development.yaml'

  // Parse configurations
  const serverConfig = parseConfig<ConfigServer>(
    configFileName,
    ConfigTarget.server
  )

  if (serverConfig.tls.disableValidation) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  }

  const clientConfig = parseConfig<ConfigClient>(
    configFileName,
    ConfigTarget.client
  )

  // create the server context
  const serverContext = new ServerContext(logger, serverConfig, clientConfig)

  // create Express app
  const app = new AppServer(serverContext)

  return app
    .configureStaticRouter()
    .configureConfigurationRouter()
    .configureIndexRouter()
    .configureServer()
    .start(configFileName)
}

startServer().catch(err => {
  logger('init')('error')(err)
  process.exit(1)
})
