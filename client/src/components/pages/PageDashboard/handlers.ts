import { withStoreFlags } from '@/client/libs/AsyncProcess/composers/withStoreFlags'
import { getAsyncProcessTestInstance } from '@/client/libs/AsyncProcess/getAsyncProcessInstance'
import StoreDashboard from './StoreDashboard'

export const handlePageDashboardOnLoad =
  (storeDashboard: StoreDashboard) => () => {
    getAsyncProcessTestInstance('initDashboardPage')
      .do(() => storeDashboard.fetchDashboardUsers())
      .compose(withStoreFlags(storeDashboard.storeFlagsFetchUsers))
      .start()
  }
