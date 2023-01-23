import { newLogger } from '@/common/libs/logger'
import { configure } from 'mobx'
import ReactDOM from 'react-dom/client'
import { createApp } from './app/createApp'

const logger = newLogger('client')('init')

// enable MobX strict mode
configure({ enforceActions: 'always', useProxies: 'always' })

/**
 * Create app and hook the root component into the DOM.
 */
createApp()
  .then(app => {
    const htmlTagId = 'app'
    const htmlTag = document.getElementById(htmlTagId)

    if (!htmlTag) {
      throw new Error(
        `The HTML tag with the ID "${htmlTagId}" has not been found!`
      )
    }

    ReactDOM.createRoot(htmlTag).render(app.rootComponent)

    return true
  })
  .catch(err => {
    logger('error')(
      'An error has occurred when creating root component: %s',
      err instanceof Error && err.message
    )
    logger('debug')('Error details: %O', err instanceof Error && err.stack)

    return false
  })
