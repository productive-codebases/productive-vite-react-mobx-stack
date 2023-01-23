import { ContextStores } from '@/client/hooks/useStores'
import StoreRoot from '@/client/stores/StoreRoot'
import { themes } from '@/client/styles/themes'
import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import App from '../App'
import { createStoreRootWithStubs } from '../stores/createStoreRootWithStubs'

interface IAppTestProps {
  storeRoot?: StoreRoot
  children: React.ReactNode
}

/**
 * App container for tests.
 *
 * Usage:
 *
 * const App = (
 *   <AppTestContainer storeRoot={storeRoot}>
 *     <MyComponentToTest />
 *   </AppTestContainer>
 * )
 *
 * act(() => {
 *   const { rerender } = render(App)
 *
 *   # ...
 * })
 *
 * expect(screen.getByTestId('stuff')).toHaveTextContent('foo')
 */
function AppTestContainer(props: IAppTestProps) {
  const storeRoot = props.storeRoot ?? createStoreRootWithStubs()

  return (
    <React.Suspense fallback={<div>loading</div>}>
      {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
      <ContextStores.Provider value={{ storeRoot }}>
        <MemoryRouter>
          <ThemeProvider theme={themes.light}>
            <App>{props.children}</App>
          </ThemeProvider>
        </MemoryRouter>
      </ContextStores.Provider>
    </React.Suspense>
  )
}

export default AppTestContainer
