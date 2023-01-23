import { ContextStores } from '@/client/hooks/useStores'
import StoreRoot from '@/client/stores/StoreRoot'
import { themes } from '@/client/styles/themes'
import { BrowserRouter } from 'react-router-dom'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import ErrorBoundary from '../common/ErrorBoundary'
import AntdProvider from './antdProvider'
import App from './App'

export interface IRootProps {
  storeRoot: StoreRoot
}

export default function Root(props: IRootProps) {
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ContextStores.Provider value={{ storeRoot: props.storeRoot }}>
      <ThemeProvider theme={themes.light}>
        <AntdProvider>
          <BrowserRouter>
            <ErrorBoundary
              errorComponent={
                <div>An error has occurred during the loading of the app.</div>
              }
            >
              <StyleSheetManager
                disableVendorPrefixes={
                  props.storeRoot.environment.config.environment.production ===
                  false
                }
              >
                <App />
              </StyleSheetManager>
            </ErrorBoundary>
          </BrowserRouter>
        </AntdProvider>
      </ThemeProvider>
    </ContextStores.Provider>
  )
}
