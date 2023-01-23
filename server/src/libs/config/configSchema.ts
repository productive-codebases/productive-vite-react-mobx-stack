export const configSchema = {
  type: 'object',
  required: ['server', 'client'],
  properties: {
    server: {
      type: 'object',
      properties: {
        tls: {
          type: 'object',
          properties: {
            enabled: {
              type: 'boolean'
            },
            paths: {
              type: 'object',
              properties: {
                key: {
                  type: 'string'
                },
                cert: {
                  type: 'string'
                },
                ca: {
                  type: 'string'
                }
              },
              required: ['key', 'cert']
            }
          },
          required: ['enabled']
        }
      },
      required: ['tls']
    },
    client: {
      type: 'object',
      properties: {
        environment: {
          type: 'object',
          properties: {
            origin: {
              type: 'string'
            },
            production: {
              type: 'boolean'
            }
          },
          required: ['origin', 'production']
        },
        featureFlags: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string'
              },
              enabled: {
                type: 'boolean'
              }
            },
            required: ['name', 'enabled']
          }
        },
        log: {
          type: 'object',
          properties: {
            namespace: {
              type: 'string'
            }
          },
          required: ['namespace']
        }
      },
      required: ['environment', 'log']
    }
  }
}
