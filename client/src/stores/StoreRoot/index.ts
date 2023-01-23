import { appRoutes } from '@/client/app/routes'
import StoreDashboard from '@/client/components/pages/PageDashboard/StoreDashboard'
import { Environment } from '@/client/libs/Environment'
import { IFetchClient } from '@/client/libs/FetchClient/types'
import { translate } from '@/client/libs/i18n/translate'
import { Translator } from '@/client/libs/i18n/types'
import { UrlBuilderClient } from '@/client/libs/UrlBuilder/types'
import UrlBuilder from '@/client/libs/UrlBuilder/UrlBuilder'
import { ConfigClient } from '@/common/libs/config/types'
import { newLogger } from '@/common/libs/logger'
import { IOpenApiClients } from '@/common/libs/openapi/types'
import { Maybe } from '@/common/types'
import StoreAuthentication from '../StoreAuthentication'
import StoreLayout from '../StoreLayout'
import { IStores } from '../types'

export default class StoreRoot<
  TFetchClient extends IFetchClient = IFetchClient,
  TOpenApiClients extends IOpenApiClients = IOpenApiClients
> {
  private _logger = newLogger('client')

  private _environment: Environment<TFetchClient, TOpenApiClients>

  private _urlBuilder: UrlBuilderClient

  private _stores: Maybe<IStores> = null

  constructor(environment: Environment<TFetchClient, TOpenApiClients>) {
    this._environment = environment

    this._urlBuilder = new UrlBuilder(appRoutes)

    this._instanciateStores()
  }

  /**
   * General initialization.
   */
  init(): Promise<false | this> {
    return Promise.resolve(this)
  }

  /**
   * Return all stores.
   */
  get stores(): IStores {
    if (!this._stores) {
      throw new Error('Stores are not defined')
    }

    return this._stores
  }

  /**
   * Return the environment.
   */
  get environment(): Environment {
    if (!this._environment) {
      throw new Error('Environment is not defined')
    }

    return this._environment
  }

  /**
   * Return the client configuration from the environment.
   */
  get config(): ConfigClient {
    return this.environment.config
  }

  /**
   * Return the UrlBuilderClient instance.
   */
  get urlBuilder(): UrlBuilderClient {
    return this._urlBuilder
  }

  /**
   * Return the translate function, configured for a language.
   * FIXME: Only English available for now.
   */
  get translator(): Translator {
    return translate('en')
  }

  /**
   * Return the logger.
   */
  get logger(): typeof this._logger {
    return this._logger
  }

  /* Private */

  /**
   * Instanciate all stores.
   */
  private _instanciateStores() {
    this._stores = {
      /* Common stores */

      storeAuthentication: new StoreAuthentication(this, {}),
      storeLayout: new StoreLayout(this, {}),

      /* Page stores */

      storeDashboard: new StoreDashboard(this, {})
    }
  }
}
