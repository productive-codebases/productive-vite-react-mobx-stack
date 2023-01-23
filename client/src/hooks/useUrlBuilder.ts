import * as React from 'react'
import { appRoutes } from '../app/routes'
import { UrlBuilderClient } from '../libs/UrlBuilder/types'
import UrlBuilder from '../libs/UrlBuilder/UrlBuilder'
import { ContextStores } from './useStores'

/**
 * Return the router.
 */
export function useUrlBuilder(): { urlBuilder: UrlBuilderClient } {
  const value = React.useContext(ContextStores)

  const urlBuilder =
    (value.storeRoot && value.storeRoot.urlBuilder) ||
    // when the root store is not available (server/application error)
    new UrlBuilder(appRoutes)

  return { urlBuilder }
}
