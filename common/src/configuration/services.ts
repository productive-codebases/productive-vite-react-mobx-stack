import { ServicesConfiguration } from './types'

/**
 * Services configuration for development.
 *
 * Use the ENVIRONMENT env var to target an `Environment` from Vite or Nginx.
 * See README for more details.
 */
export const servicesConfiguration: ServicesConfiguration = {
  proxy: {
    mocks: {
      nginxLocation: '/',
      nginxEndpoint: '',
      viteLocation: '/',
      protocol: 'http',
      hostname: '0.0.0.0',
      port: 4000
    },
    local: {
      nginxLocation: '/',
      nginxEndpoint: '',
      viteLocation: '/',
      protocol: 'http',
      hostname: '0.0.0.0',
      port: 4000
    }
  },

  server: {
    mocks: {
      nginxLocation: '/',
      nginxEndpoint: '',
      viteLocation: '/',
      protocol: 'http',
      hostname: '0.0.0.0',
      port: 5001
    },
    local: {
      nginxLocation: '/',
      nginxEndpoint: '',
      viteLocation: '/',
      protocol: 'http',
      hostname: '0.0.0.0',
      port: 5001
    }
  },

  configuration: {
    mocks: {
      nginxLocation: '/w/configuration',
      nginxEndpoint: '',
      viteLocation: '/w/configuration',
      protocol: 'http',
      hostname: '0.0.0.0',
      port: 5001
    },
    local: {
      nginxLocation: '/w/configuration',
      nginxEndpoint: '',
      viteLocation: '/w/configuration',
      protocol: 'http',
      hostname: '0.0.0.0',
      port: 5001
    }
  },

  // Dmemo backend
  dashboard: {
    mocks: {
      nginxLocation: '/dashboard',
      nginxEndpoint: '',
      viteLocation: '/dashboard',
      viteProxyOptions: {
        target: 'http://0.0.0.0:6010',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/dashboard/, '')
      },
      protocol: 'http',
      hostname: '0.0.0.0',
      port: 6010
    },
    local: {
      nginxLocation: '/dashboard',
      nginxEndpoint: '',
      viteLocation: '/dashboard',
      viteProxyOptions: {
        target: 'http://0.0.0.0:6010',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/dashboard/, '')
      },
      protocol: 'http',
      hostname: '0.0.0.0',
      port: 6010
    }
  }
}
