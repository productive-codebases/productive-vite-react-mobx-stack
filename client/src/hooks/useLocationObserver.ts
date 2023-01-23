import { ensureArray, Maybe } from '@productive-codebases/toolbox'
import * as React from 'react'
import { useLocation } from 'react-router'
import { AppRouteName } from '../app/routes'
import { IRouteInfo } from '../libs/UrlBuilder/types'
import { useUrlBuilder } from './useUrlBuilder'

export interface IUseHistoryChangeOptions {
  onChange?: (currentRouteInfo: Maybe<IRouteInfo<AppRouteName, any>>) => void
  // extra dependencies used in useEffect to force to trigger the onChange handler
  dependencies?: string[]
}

export interface IUseHistoryChangeOutput {
  currentRouteInfo: Maybe<IRouteInfo<AppRouteName, any>>
}

/**
 * Observe the location changed and call an handler if defined.
 */
export function useLocationObserver(
  options?: IUseHistoryChangeOptions
): IUseHistoryChangeOutput {
  const { urlBuilder } = useUrlBuilder()

  // be sure to use useLocation here to force a state update when the location has changed
  const location = useLocation()

  const [currentRouteInfo, setCurrentRouteInfo] =
    React.useState<Maybe<IRouteInfo<AppRouteName, any>>>(null)

  React.useEffect(() => {
    const routeInfo = urlBuilder.getCurrentRouteInfo()

    setCurrentRouteInfo(routeInfo)

    if (options?.onChange) {
      options.onChange(routeInfo)
    }
  }, [location.pathname, location.search].concat(ensureArray(options?.dependencies)))

  return { currentRouteInfo }
}
