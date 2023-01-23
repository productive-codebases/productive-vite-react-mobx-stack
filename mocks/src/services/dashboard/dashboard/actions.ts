import { createAction } from './bouchon'
import { DashboardActionEnum } from './types'

export const getUsers = createAction(DashboardActionEnum.GetUsers)
export const getRoles = createAction(DashboardActionEnum.GetRoles)
