import { ISession } from '@/common/entities/session/types'
import { isTruthy, Maybe } from '@productive-codebases/toolbox'
import { computed, makeObservable, observable } from 'mobx'
import StoreRoot from '../StoreRoot'
import StoreBase from '../StoreRoot/StoreBase'
import { IStoreOptions } from '../types'

export default class StoreAuthentication extends StoreBase {
  // User's session when being authenticated
  @observable
  private $session: Maybe<ISession> = null

  constructor(storeRoot: StoreRoot, options: IStoreOptions) {
    super(storeRoot, options)
    makeObservable(this)
  }

  /**
   * Return true if a session and a token are defined.
   */
  @computed
  get isAuthenticated(): boolean {
    return isTruthy(this.$session)
  }
}
