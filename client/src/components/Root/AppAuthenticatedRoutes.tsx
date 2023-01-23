import { AppRouteName } from '@/client/app/routes'
import { useUrlBuilder } from '@/client/hooks/useUrlBuilder'
import { observer } from 'mobx-react-lite'
import { Navigate, Route, Routes } from 'react-router-dom'
import PageDashboard from '../pages/PageDashboard'
import PageRoot from '../pages/PageRoot'

export interface IAppAuthenticatedRoutesProps {}

export function AppAuthenticatedRoutes(props: IAppAuthenticatedRoutesProps) {
  const { urlBuilder } = useUrlBuilder()
  // const { storeAuthentication } = useStores()

  // if (!storeAuthentication.isAuthenticated) {
  //   return <PageLogin />
  // }

  return (
    <>
      <Routes>
        <Route
          path={`${urlBuilder.getRoutePathname(AppRouteName.Root)}/*`}
          element={<PageRoot />}
        />

        <Route
          path={`${urlBuilder.getRoutePathname(AppRouteName.HomePage)}/*`}
          element={<PageDashboard />}
        />

        {/* Default redirection */}

        <Route
          path="*"
          element={
            <Navigate
              to={urlBuilder.getRoutePathname(AppRouteName.HomePage)}
              // Use "replace" to allow history back in the browser
              replace
            />
          }
        />
      </Routes>
    </>
  )
}

export default observer(AppAuthenticatedRoutes)
