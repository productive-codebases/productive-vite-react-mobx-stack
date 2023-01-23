import GlobalStyle from '@/client/styles/globalStyles/globalStyles'
import { observer } from 'mobx-react-lite'
import AppRoutes from './AppRoutes'

export interface IAppProps {}

export function App(props: IAppProps) {
  return (
    <>
      <GlobalStyle />
      <AppRoutes />
    </>
  )
}

export default observer(App)
