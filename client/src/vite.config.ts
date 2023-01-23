/* eslint-disable import/no-relative-packages */

import react from '@vitejs/plugin-react'
import { defineConfig, UserConfigExport } from 'vite'
import { servicesConfiguration } from '../../common/src/configuration/services'
import { Environment, ServiceName } from '../../common/src/configuration/types'
import { staticPaths } from '../../common/src/paths'

const logger = console

/**
 * Get service URL.
 */
function getServiceUrl(
  serviceName: ServiceName,
  environment: Environment
): string {
  const service = servicesConfiguration[serviceName]
  return `${service[environment].protocol}://${service[environment].hostname}:${service[environment].port}`
}

/**
 * Get proxy configuration.
 */
function getProxyConfiguration(environment: Environment) {
  return Object.entries(servicesConfiguration).reduce(
    (acc, [serviceName_, value]) => {
      const serviceName = serviceName_ as ServiceName
      const config = value[environment]

      // Don't proxy Vite itself
      if (serviceName === 'proxy' || serviceName === 'server') {
        return acc
      }

      return {
        ...acc,
        [config.viteLocation]:
          config.viteProxyOptions ?? getServiceUrl(serviceName, environment)
      }
    },
    {}
  )
}

/**
 * Build Vite configuration (development only).
 * See https://vitejs.dev/config/ for options details.
 */
function buildViteConfiguration(): UserConfigExport {
  const environment = (process.env.ENVIRONMENT ?? 'mocks') as Environment
  const proxyServicesConfiguration = servicesConfiguration.proxy[environment]

  // if proxyServicesConfiguration is not defined, process.env.ENVIRONMENT is invalid
  if (!proxyServicesConfiguration) {
    logger.error(
      '\x1b[31m',
      '\nEnvironment variable not set or invalid.',
      `\nUse ENVIRONMENT=${Object.values(Environment).join(' | ')}.\n`,
      '\x1b[0m'
    )
    process.exit(1)
  }

  const viteConfiguration: UserConfigExport = {
    server: {
      host: servicesConfiguration.proxy[environment].hostname,
      port: servicesConfiguration.proxy[environment].port,
      strictPort: true,
      proxy: getProxyConfiguration(environment),
      fs: {
        allow: [
          // Allow serving files from ../src
          '..'
        ]
      }
    },
    base: '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@/client': staticPaths.clientSrcDir,
        '@/common': staticPaths.commonSrcDir
      }
    },
    publicDir: 'public',
    build: {
      manifest: true,
      // Output compiled files in the server dist folder
      outDir: staticPaths.serverDistClientDir,
      sourcemap: true
    },
    // Used to work with AntDesign/Less - Credits to https://stackoverflow.com/a/72856421
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: '@root-entry-name: default;'
        }
      }
    },
    clearScreen: false
  }

  logger.log('Starting Vite with configuration:')
  logger.log(viteConfiguration)

  return viteConfiguration
}

/**
 * Define Vite configuration.
 */
export default defineConfig(buildViteConfiguration())
