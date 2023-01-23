import { Maybe } from '@/common/types'
import { createContext, useContext } from 'react'
import StoreRoot from '../stores/StoreRoot'
import { IStores } from '../stores/types'

export interface IContextStores {
  storeRoot: Maybe<StoreRoot>
}

export const ContextStores = createContext<IContextStores>({ storeRoot: null })

/**
 * Retrieve MobX stores from the context.
 */
export function useStores(): IStores & { storeRoot: StoreRoot } {
  const value = useContext(ContextStores)

  if (!value.storeRoot) {
    throw new Error('Root store has not been found')
  }

  const allStores = {
    ...value.storeRoot.stores,
    storeRoot: value.storeRoot
  }

  return allStores
}
