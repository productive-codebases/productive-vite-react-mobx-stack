import { Environment } from '..'
import LocalStorageStub from '@/common/libs/LocalStorageStub'
import { OpenApiClientsStub } from '@/common/libs/openapi/OpenApiClientsStub'
import FetchClientStub from '../../FetchClient/FetchClientStub'
import { getClientConfigStub } from './configStub'
import { IEnvironmentStubs } from './types'

/**
 * Create an environment for the storeRoot for tests.
 */
export default function createEnvironmentStub(
  environmentStubs?: IEnvironmentStubs
): Environment<FetchClientStub, OpenApiClientsStub> {
  /**
   * Client configuration
   */

  const clientConfigurationStub =
    environmentStubs?.clientConfiguration || getClientConfigStub()

  /**
   * Fetch clients
   */

  const fetchClientStub = new FetchClientStub()

  /**
   * OpenApi client
   */

  const openApiClientStub = new OpenApiClientsStub()

  /**
   * LocalStorage
   */

  const localStorageStub = new LocalStorageStub()

  return new Environment(
    clientConfigurationStub,
    fetchClientStub,
    openApiClientStub,
    localStorageStub
  )
}
