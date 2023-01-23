import { ServiceName } from '@/common/configuration/types'

/**
 * Define entity names (as business entities, not related to a defined service in theory).
 */
export enum MockEntityName {
  /**
   * Dashboard demo entities
   */

  users = 'users',
  entities = 'entities',
  roles = 'roles',
  permissions = 'permissions'
}

/**
 * Service backend definitions.
 */

export interface IMockBackendServiceDefinition {
  port: number
}

export type MockBackendServiceDefinitions = Record<
  ServiceName,
  IMockBackendServiceDefinition
>
