import { createHashHistory, To } from 'history'
import { NavigateOptions, useLocation, useNavigate } from 'react-router-dom'
import { useStores } from './useStores'
import { useUrlBuilder } from './useUrlBuilder'

/**
 * Set some helpers in the UrlBuilder instance.
 */
export function useUrlBuilderInit(): void {
  const { storeLayout } = useStores()
  const { urlBuilder } = useUrlBuilder()

  const navigate = useNavigate()
  const location = useLocation()

  const history = createHashHistory()

  /**
   * Custom navigation function that wraps the react-router navigate function,
   * allowing to trigger navigation prompts registered in StoreLayout.
   * Used to warn about losing changes for example.
   */
  const navigateFn = (to: To | number, options?: NavigateOptions) => {
    if (typeof to === 'number') {
      return navigate(to)
    }

    // FIXME - Copy navigationPrompt from Konsole
    // if navigationPrompt, save the url of the navigation and show the prompt
    // if (
    //   typeof to === 'string' &&
    //   storeLayout.navigationPrompt &&
    //   storeLayout.navigationPrompt.isEnabled()
    // ) {
    //   storeLayout.navigationPrompt.saveUrl(to).show()
    //   return
    // }

    return navigate(to, options)
  }

  urlBuilder
    .setNavigateFunction(navigateFn)
    .setHistory(history)
    .setLocation(location)
}
