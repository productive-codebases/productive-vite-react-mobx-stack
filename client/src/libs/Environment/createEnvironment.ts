import { Environment } from '.'
import { ConfigClient } from '@/common/libs/config/types'
import { OpenApiClients } from '@/common/libs/openapi'
import FetchClient from '../FetchClient'

/**
 * Setup the environment.
 */
export async function createEnvironment(
  clientConfiguration: ConfigClient
): Promise<Environment> {
  /**
   * Fetch clients
   */

  const fetchClient = new FetchClient(window.fetch.bind(window))

  /**
   * OpenApi client
   */

  const openApiClient = new OpenApiClients()

  return new Environment(
    clientConfiguration,
    fetchClient,
    openApiClient,
    localStorage
  )
}
