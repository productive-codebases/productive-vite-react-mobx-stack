import { ConfigClient } from '@/common/libs/config/types'
import { LocalStorageKey } from '@/common/types/environment'
import { isObject } from 'lodash'
import { toJS } from 'mobx'
import Root from '../components/Root'
import { createEnvironment } from '../libs/Environment/createEnvironment'
import FetchClient from '../libs/FetchClient'
import StoreRoot from '../stores/StoreRoot'

interface IApp {
  rootComponent: React.ReactNode
  storeRoot: StoreRoot
}

/**
 * Init environment and root store before rendering the Root node.
 */
export function createApp(): Promise<IApp> {
  const currentDebugValue = window.localStorage.getItem(LocalStorageKey.debug)

  if (!currentDebugValue) {
    window.localStorage.setItem(LocalStorageKey.debug, 'client:*')
  }

  const fetchClient = new FetchClient(window.fetch.bind(window), {
    baseURL: ''
  })

  return (
    Promise.resolve()
      /**
       * Fetch client configuration from ui server.
       */
      .then(() => {
        return fetchClient
          .get('/w/configuration')
          .then(response => {
            return response.json()
          })
          .then(data => {
            assertValidConfiguration(data)
            return data
          })
      })

      /**
       * Init environment.
       */
      .then(clientConfiguration => {
        return createEnvironment(clientConfiguration)
      })

      /**
       * Instanciate Root store and initialize the application.
       */
      .then(environment => {
        return new StoreRoot(environment).init().then(storeRoot => {
          if (!storeRoot) {
            throw new Error('Cant create app')
          }

          // save things in window for easier debugging
          window.TID = {
            storeRoot,
            toJS
          }

          return storeRoot
        })
      })

      /**
       * Return the Root component and the root store.
       */
      .then(storeRoot => {
        return {
          rootComponent: <Root storeRoot={storeRoot} />,
          storeRoot
        }
      })
  )
}

/**
 * Assert that the configuration fetched from the server is a valid JS object.
 * Since validated at ui server boot, we consider having here a valid
 * ConfigClient object.
 */
function assertValidConfiguration<T>(
  data: ConfigClient
): asserts data is ConfigClient {
  if (!isObject(data)) {
    throw new Error('Invalid configuration')
  }
}
