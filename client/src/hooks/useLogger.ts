import { useStores } from './useStores'

/**
 * Return the logger instance from the root store.
 */
export function useLogger(): typeof storeRoot.logger {
  const { storeRoot } = useStores()

  return storeRoot.logger
}
