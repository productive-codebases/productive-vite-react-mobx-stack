import StoreFlags from '@/client/stores/StoreFlags'
import StoreRoot from '@/client/stores/StoreRoot'
import StoreBase from '@/client/stores/StoreRoot/StoreBase'
import { IStoreOptions } from '@/client/stores/types'
import { User } from '@/common/openapi/dashboard/userResource'
import { action, computed, makeObservable, observable } from 'mobx'

export default class StoreDashboard extends StoreBase {
  public storeFlagsFetchUsers = new StoreFlags(this.storeRoot, {})

  @observable
  private $users: User[] = []

  constructor(storeRoot: StoreRoot, options: IStoreOptions) {
    super(storeRoot, options)
    makeObservable(this)
  }

  /**
   * Fetch users.
   */
  async fetchDashboardUsers(): Promise<this> {
    const users =
      await this.storeRoot.environment.openApiClients.dashboardUserResourceApi.usersGet()

    this.setUsers(users)

    return this
  }

  /**
   * Actions
   */

  @action
  setUsers(users: User[]): this {
    this.$users = users
    return this
  }

  /**
   * Computed
   */
  @computed
  get users(): User[] {
    return this.$users
  }
}
