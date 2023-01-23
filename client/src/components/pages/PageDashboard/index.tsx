import { useLoader } from '@/client/hooks/useLoader'
import { useStores } from '@/client/hooks/useStores'
import { observer } from 'mobx-react-lite'
import { handlePageDashboardOnLoad } from './handlers'

export interface IPageDashboardProps {}

export function PageDashboard(props: IPageDashboardProps) {
  const { storeDashboard } = useStores()

  useLoader({
    onLoad: handlePageDashboardOnLoad(storeDashboard)
  })

  function renderContent() {
    if (storeDashboard.storeFlagsFetchUsers.isLoading) {
      return <div>Loading...</div>
    }

    return <pre>{JSON.stringify(storeDashboard.users, null, 2)}</pre>
  }

  return (
    <>
      <div>PageDashboard</div>
      {renderContent()}
    </>
  )
}

export default observer(PageDashboard)
