import { ServiceName } from '@/common/configuration/types'
import { runtimePaths } from '@/common/paths'
import * as path from 'path'

/**
 * Return the path of a backend service.
 */
export function getBackendServicePath(serviceName: ServiceName): string {
  return path.join(runtimePaths.mocksRootDir, 'src', 'services', serviceName)
}

/**
 * Return the path of a service name.
 */
export function getServiceNamePath(serviceName: ServiceName): string {
  return path.join(getBackendServicePath(serviceName), 'data.json')
}
