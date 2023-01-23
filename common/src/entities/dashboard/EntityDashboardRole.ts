import { Role, RoleNameEnum } from '@/common/openapi/dashboard/userResource'
import { Maybe, PropertiesNullable } from '@/common/types'

export default class EntityDashboardRole implements PropertiesNullable<Role> {
  roleId: Maybe<string> = null

  name: Maybe<RoleNameEnum> = null

  constructor(data: Partial<Role>) {
    Object.assign(this, data)
  }
}
