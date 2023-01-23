import { RoleNameEnum } from '@/common/openapi/dashboard/userResource/models/Role'
import {
  IDashboardRoleMocked,
  IDashboardUserMocked,
  StoreDashboards
} from '@/mocks/services/dashboard/dashboard/types'
import { MockEntityName } from '@/mocks/types'
import { randFirstName, randLastName } from '@ngneat/falso'
import {
  MockIdGenerator,
  randomNumberInRange,
  randomValueFromEnum
} from 'bouchon-reloaded'
import { range } from 'lodash'

/**
 * Data generation for the dashboard demo backend.
 */

/**
 * Generate users.
 */
export function generateUsers(
  uuidContainer: MockIdGenerator<MockEntityName>,
  howMany = [10, 10]
): Map<string, IDashboardUserMocked> {
  const usersMap: StoreDashboards[MockEntityName.users] = new Map()

  range(0, randomNumberInRange(howMany)).forEach(() => {
    const mockId = uuidContainer.newMockId(MockEntityName.users)

    const user: IDashboardUserMocked = {
      userId: String(mockId),
      firstName: randFirstName(),
      lastName: randLastName(),
      _mockId: mockId
    }

    uuidContainer.setMeta(
      MockEntityName.users,
      MockEntityName.users,
      mockId,
      user
    )

    usersMap.set(String(mockId), user)
  })

  return usersMap
}

/**
 * Generated roles for users.
 */
export function generateRoles(
  uuidContainer: MockIdGenerator<MockEntityName>,
  howMany = [0, 5]
): Map<string, IDashboardRoleMocked> {
  const rolesMap: StoreDashboards[MockEntityName.roles] = new Map()

  const usersMap = uuidContainer.getMetaMap<IDashboardUserMocked>(
    MockEntityName.users,
    MockEntityName.users
  )

  Array.from(usersMap.values()).forEach(user => {
    range(0, randomNumberInRange(howMany)).forEach(() => {
      const mockId = uuidContainer.newMockId(MockEntityName.roles)

      const role: IDashboardRoleMocked = {
        roleId: String(mockId),
        name: randomValueFromEnum(RoleNameEnum),
        _userId: user.userId,
        _mockId: mockId
      }

      uuidContainer.setMeta(
        MockEntityName.roles,
        MockEntityName.roles,
        mockId,
        role
      )

      rolesMap.set(String(mockId), role)
    })
  })

  return rolesMap
}
