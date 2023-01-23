import { ConfigClient, ConfigServer } from '@/common/libs/config/types'
import { LoggerServerNamespace } from '@/common/libs/logger/types'

/**
 * Create a context for easier parameters passing and contextualized instanciations.
 */
export class ServerContext {
  constructor(
    readonly logger: LoggerServerNamespace,
    readonly serverConfig: ConfigServer,
    readonly clientConfig: ConfigClient
  ) {}

  /**
   * Return true when used with `npm run start:dev`.
   */
  isUsedInDevelopment(): boolean {
    return process.env.NODE_ENV === 'development'
  }
}
