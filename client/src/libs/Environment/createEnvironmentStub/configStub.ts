import {
  ConfigClient,
  ConfigServer,
  ConfigTarget,
  IConfig
} from '@/common/libs/config/types'
import { FeatureFlag } from '@/common/libs/featureFlags'
import { deepMerge } from '@productive-codebases/toolbox'

export const configStub: IConfig = {
  [ConfigTarget.client]: {
    environment: {
      origin: 'http://localhost',
      production: false
    },

    featureFlags: [
      {
        name: FeatureFlag['my-feature-flag'],
        enabled: true
      }
    ]
  },

  [ConfigTarget.server]: {
    hostname: 'localhost',
    port: 5002,

    tls: {
      enabled: false,
      paths: {
        key: '',
        cert: '',
        ca: ''
      },
      disableValidation: true
    }
  }
}

export function getServerConfigStub(configServer?: ConfigServer): ConfigServer {
  return deepMerge([configStub[ConfigTarget.server], configServer])
}

export function getClientConfigStub(configApp?: ConfigClient): ConfigClient {
  return deepMerge([configStub[ConfigTarget.client], configApp])
}
