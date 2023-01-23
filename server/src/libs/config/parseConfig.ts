import { ConfigTarget, IConfig } from '@/common/libs/config/types'
import { newLogger } from '@/common/libs/logger'
import { runtimePaths } from '@/common/paths'
import Ajv from 'ajv'
import * as fs from 'fs'
import * as jsYaml from 'js-yaml'
import { has } from 'lodash'
import * as path from 'path'
import { logException } from '../logger/logException'
import { configSchema } from './configSchema'

const logger = newLogger('server')('config')

/**
 * Load and parse the config from `fileName` file, for the target `target`.
 */
export function parseConfig<C>(fileName: string, target: ConfigTarget): C {
  const configFilePath = path.join(runtimePaths.serverConfigsDir, fileName)
  let config: any

  try {
    config = jsYaml.load(fs.readFileSync(configFilePath, 'utf8'))

    if (!validateConfig<IConfig>(config)) {
      throw new Error('Configuration is invalid')
    }

    return config[target] as unknown as C
  } catch (err) {
    if (err instanceof Error) {
      logException(logger)(
        err,
        `Can't read or parse the config "${configFilePath}". Exiting.`
      )
    }

    throw new Error('Unable to load the Identity UI configuration')
  }
}

/**
 * Return true if the key is in the configuration.
 */
export function hasKey<T>(config: T, key: string): boolean {
  const firstItemKey = key.replace(/\.\d+\./g, '.0.')
  return has(config, firstItemKey)
}

/**
 * Validate the configuration object with a JSON schema.
 */
function validateConfig<T>(config: T | object): config is T {
  const ajv = new Ajv()

  const validate = ajv.compile(configSchema)
  const valid = validate(config)

  if (!valid) {
    logger('info')(
      'Configuration used:',
      JSON.stringify(config, configReplacer, 2)
    )
    logger('error')('Configuration is not valid', validate.errors)
    return false
  }

  return true
}

/**
 * Replacer function to be used in JSON.stringify.
 * Allow to remove some sensitive values from the configuration log.
 */
export function configReplacer(key: string, value: any) {
  const sensitiveKeys = ['secret', 'authtoken']
  return sensitiveKeys.indexOf(key) !== -1 ? '***' : value
}
