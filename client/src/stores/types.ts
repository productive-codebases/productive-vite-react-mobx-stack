import StoreDashboard from '../components/pages/PageDashboard/StoreDashboard'
import StoreAuthentication from './StoreAuthentication'
import StoreLayout from './StoreLayout'

export interface IStores {
  // Common stores

  storeAuthentication: StoreAuthentication
  storeLayout: StoreLayout

  // Pages stores

  storeDashboard: StoreDashboard
}

/**
 * Implemented by all stores, allowing to have a common base interface.
 */
export interface IStoreBase {}

/**
 * Describe the options that can be passed to each stores.
 */
export interface IStoreOptions {}
