import { ActionNotImplementedError } from '@/mocks/helpers/errors'
import { createSelector } from './bouchon'
import { DashboardActionEnum } from './types'

export const selectNone = () => undefined

export const selectUsers = createSelector((state, action) => {
  switch (action.name) {
    case DashboardActionEnum.GetUsers:
      return Array.from(state.users.values())

    default:
      throw new ActionNotImplementedError('selectUsers', action.name)
  }
})

export const selectRoles = createSelector((state, action) => {
  switch (action.name) {
    case DashboardActionEnum.GetRoles:
      return Array.from(state.roles.values())

    case DashboardActionEnum.GetRolesByUser:
      return Array.from(state.roles.values()).filter(
        role => role._userId === action.parameters.userId
      )

    default:
      throw new ActionNotImplementedError('selectRoles', action.name)
  }
})
