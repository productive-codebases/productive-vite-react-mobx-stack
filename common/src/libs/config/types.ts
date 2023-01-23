/**
 * Describe UI configuration.
 */

import { IFeatureFlag } from '../featureFlags'

export enum ConfigTarget {
  server = 'server',
  client = 'client'
}

export interface IConfig {
  [ConfigTarget.client]: {
    environment: {
      origin: string
      production: boolean
    }

    featureFlags?: IFeatureFlag[]
  }

  [ConfigTarget.server]: {
    hostname: string
    port: number

    tls: {
      enabled: boolean
      paths?: {
        key: string
        cert: string
        ca?: string
      }
      disableValidation: boolean
    }
  }
}

export type ConfigServer = IConfig['server']
export type ConfigClient = IConfig['client']
