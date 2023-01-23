import StoreRoot from '@/client/stores/StoreRoot'
import { OpenApiClientsStub } from '@/common/libs/openapi/OpenApiClientsStub'
import createEnvironmentStub from '../../Environment/createEnvironmentStub'
import FetchClientStub from '../../FetchClient/FetchClientStub'
import { IEnvironmentStubs } from './types'

/**
 * Return a StoreRoot instance, with a "stubbed" environment.
 * Useful for tests.
 */
export function createStoreRootWithStubs(
  environmentStubs?: IEnvironmentStubs
): StoreRoot<FetchClientStub, OpenApiClientsStub> {
  const environmentStub = createEnvironmentStub(environmentStubs)

  return new StoreRoot<FetchClientStub, OpenApiClientsStub>(environmentStub)
}
