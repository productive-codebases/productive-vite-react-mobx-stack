import { ServerContext } from '.'
import { ConfigClient, ConfigServer } from '@/common/libs/config/types'
import { newLogger } from '@/common/libs/logger'
import { getClientConfigStub, getServerConfigStub } from '../config/configStub'

/**
 * Create a ServerContext stub, useful for tests.
 */
export function createServerContextStub(stubs?: {
  serverConfig?: ConfigServer
  clientConfig?: ConfigClient
}): ServerContext {
  const logger = newLogger('server')

  const serverConfig = getServerConfigStub(stubs?.serverConfig)
  const clientConfig = getClientConfigStub(stubs?.clientConfig)

  return new ServerContext(logger, serverConfig, clientConfig)
}
