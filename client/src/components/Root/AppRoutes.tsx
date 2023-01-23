import { AppRouteName } from '@/client/app/routes'
import { useUrlBuilder } from '@/client/hooks/useUrlBuilder'
import { Route, Routes } from 'react-router-dom'
import PageLogin from '../pages/PageLogin'
import AppAuthenticatedRoutes from './AppAuthenticatedRoutes'

export interface IAppRoutesProps {}

/**
 * Main router of the application.
 */
export default function AppRoutes(props: IAppRoutesProps) {
  const { urlBuilder } = useUrlBuilder()

  return (
    <Routes>
      <Route
        path={`${urlBuilder.getRoutePathname(AppRouteName.Login)}`}
        element={<PageLogin />}
      />

      <Route path="*" element={<AppAuthenticatedRoutes />} />
    </Routes>
  )
}
