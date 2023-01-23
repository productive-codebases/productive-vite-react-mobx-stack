import { getServiceNamePath } from '@/mocks/helpers'
import { createBouchon, parseDataSync } from 'bouchon-reloaded'
import {
  StoreDashboards,
  DashboardActionEnum,
  DashboardActionUnion,
  IDashboardActionsRecord
} from './types'

export const { createAction, createSelector, createRoute, createEndPoint } =
  createBouchon<
    StoreDashboards,
    DashboardActionEnum,
    DashboardActionUnion,
    IDashboardActionsRecord
  >(parseDataSync(getServiceNamePath('dashboard')))
