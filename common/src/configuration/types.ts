/**
 * Define the different services (backends).
 */
export type ServiceName =
  // Proxy (nginx or Vite in dev, WUG in production)
  | 'proxy'

  // Express server
  | 'server'
  | 'configuration'

  // Dashboard backend only for the demo
  | 'dashboard'

export enum Environment {
  'mocks' = 'mocks',
  'local' = 'local'
}

export type ServicesConfiguration = Record<
  ServiceName,
  Record<Environment, IServiceConfiguration>
>

export interface IServiceConfiguration {
  nginxLocation: string
  nginxEndpoint: string
  viteLocation: string
  // Vite is not available here, you can find the proxy options interface here:
  // client/node_modules/vite/dist/node/index.d.ts
  viteProxyOptions?: object
  protocol: string
  hostname: string
  port: number
}
