import { Maybe, PropertiesNullable } from '@/common/types'
import { User } from '@/common/openapi/dashboard/userResource'

export default class EntityDashboardUser implements PropertiesNullable<User> {
  public userId: Maybe<string> = null

  public firstName: Maybe<string> = null

  public lastName: Maybe<string> = null

  constructor(data: Partial<User>) {
    Object.assign(this, data)
  }

  getFullName() {
    return [this.firstName, this.lastName].join(' ')
  }
}
