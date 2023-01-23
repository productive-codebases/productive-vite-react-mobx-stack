import { newLogger } from '@/common/libs/logger'
import { runtimePaths } from '@/common/paths'
import { isDefined } from '@productive-codebases/toolbox'
import * as fs from 'fs'
import { get } from 'lodash'
import { logException } from '../libs/logger/logException'
import { IEnvFileVariables } from './types'

let envFileVariables: IEnvFileVariables

/**
 * Read the environment variables from the cluster name or from the .env file as fallback.
 */
export function getEnvFileVariables(): IEnvFileVariables {
  if (envFileVariables) {
    return envFileVariables
  }

  const isProduction = isDefined(process.env.CLUSTER_NAME)

  envFileVariables = isProduction
    ? // In production, get the file from CLUSTER_NAME or fallback to production.yaml
      {
        CONFIG: getProductionConfigurationFile()
      }
    : // In development, read the .env file and get the config name from there
      parseEnvironmentFile()

  return envFileVariables
}

/**
 * Find the configuration file according to CLUSTER_NAME env name.
 * If not found, fallback on the production file (to avoid creating one conf / platform).
 */
function getProductionConfigurationFile(): string {
  const configurationFiles = fs.readdirSync(runtimePaths.serverConfigsDir)

  const envConfigurationFile = configurationFiles.find(configurationFile => {
    return configurationFile === `${process.env.CLUSTER_NAME}.yaml`
  })

  return envConfigurationFile || 'production.yaml'
}

/**
 * Return environment variables from the .env file.
 */
function parseEnvironmentFile(): IEnvFileVariables {
  const logger = newLogger('server')('init')

  let envFileContent: string = ''

  try {
    if (!fs.existsSync(runtimePaths.serverEnvFile)) {
      createEnvFile({
        CONFIG: 'development.yaml'
      })
    }

    envFileContent = fs.readFileSync(runtimePaths.serverEnvFile, 'utf8')
  } catch (err) {
    if (err instanceof Error) {
      logException(logger)(
        err,
        `Can't parse the environment file (${runtimePaths.serverEnvFile}).`
      )
    }

    throw new Error('Unable to get the environment')
  }

  const envVariables = envFileContent
    .split(/\r?\n/)
    .filter(line => /=/.test(line))
    .reduce((acc, line) => {
      const [key, value] = line.split(/\s*=\s*/)

      return {
        ...acc,
        [key]: value
      }
      // tslint:disable-next-line:no-object-literal-type-assertion
    }, {} as IEnvFileVariables)

  return envVariables
}

/**
 * Create the .env file.
 */
function createEnvFile(envVariables: IEnvFileVariables): void {
  const logger = newLogger('server')('init')

  const lines = Object.keys(envVariables).reduce<string[]>(
    (acc, key) => acc.concat(`${key}=${get(envVariables, key)}`),
    []
  )

  const content = [
    "# This file defines environment variables and mustn't be commit.\n"
  ]
    .concat(lines, '')
    .join('\n')

  try {
    fs.writeFileSync(runtimePaths.serverEnvFile, content, 'utf8')
  } catch (err) {
    if (err instanceof Error) {
      logException(logger)(
        err,
        `Unable to write the environment file (${runtimePaths.serverEnvFile}). Exiting.`
      )
    }

    throw new Error('Unable to create the environment')
  }
}
