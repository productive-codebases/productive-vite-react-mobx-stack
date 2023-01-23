import { snakeCasetoCamelCaseJsonTransformer } from '@/common/libs/json-helpers'
import { createResponse } from '@/mocks/helpers/createResponse'
import { getRoles, getUsers } from './actions'
import { createEndPoint, createRoute } from './bouchon'
import { selectNone, selectRoles, selectUsers } from './selectors'
import {
  DashboardActionEnum,
  IDashboardRoleMocked,
  IDashboardUserMocked,
  IGetRolesByUser
} from './types'

/**
 * Endpoint
 */

const dashboardEndPoint = createEndPoint('', [
  /**
   * List all users.
   */
  createRoute({
    method: 'GET',
    pathname: '/users',
    action: getUsers,
    selector: selectNone,
    handler: () =>
      createResponse<IDashboardUserMocked[]>(() => {
        const users = selectUsers({
          name: DashboardActionEnum.GetUsers
        })

        return users
      })
  }),

  /**
   * List all roles.
   */
  createRoute({
    method: 'GET',
    pathname: '/roles',
    action: getRoles,
    selector: selectNone,
    handler: () =>
      createResponse<IDashboardRoleMocked[]>(() => {
        const roles = selectRoles({
          name: DashboardActionEnum.GetRoles
        })

        return roles
      })
  }),

  /**
   * List all roles of a user.
   */
  createRoute({
    method: 'GET',
    pathname: '/users/:userId/roles',
    action: getRoles,
    selector: selectNone,
    handler: () =>
      createResponse<IDashboardRoleMocked[]>(req => {
        const params = snakeCasetoCamelCaseJsonTransformer(
          req.params
        ) as IGetRolesByUser['parameters']

        const roles = selectRoles({
          name: DashboardActionEnum.GetRolesByUser,
          parameters: {
            userId: params.userId
          }
        })

        return roles
      })
  })
])

export { dashboardEndPoint }
