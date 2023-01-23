import StoreAuthentication from './StoreAuthentication'
import StoreLayout from './StoreLayout'

export interface IStores {
  storeAuthentication: StoreAuthentication
  storeLayout: StoreLayout
}

/**
 * Implemented by all stores, allowing to have a common base interface.
 */
export interface IStoreBase {}

/**
 * Describe the options that can be passed to each stores.
 */
export interface IStoreOptions {}
