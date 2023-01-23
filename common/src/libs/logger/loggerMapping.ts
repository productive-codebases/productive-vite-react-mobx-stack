/**
 * Namespaces used in different loggers.
 */
export const loggerMapping = {
  client: {
    // layers
    init: 'init',
    react: 'react',
    stores: 'stores',

    // libs,
    FetchClient: 'FetchClient',
    UrlBuilder: 'UrlBuilder',

    // domains
    authentication: 'authentication',

    // components
    MyComponent: 'MyComponent'
  },

  common: {
    stubs: 'stubs',
    helpers: 'helpers'
  },

  server: {
    init: 'init',
    config: 'config'
  },

  mocks: {
    generator: 'generator'
  }
}
