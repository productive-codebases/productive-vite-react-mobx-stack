import { useEffect } from 'react'
import { IFlags } from '../stores/StoreFlags/types'

/**
 * Props that defined a "loadable" behavior.
 * Use with useLoader hook.
 */
export interface IComponentLoaderProps {
  // handlers
  onLoad?: () => void
  onUnload?: () => void

  // store flags
  flags?: IFlags | IFlags[]
}

/**
 * Trigger onLoad / onUnload on mount / unmount.
 */
export function useLoader<TDeps>(props: IComponentLoaderProps, deps?: TDeps) {
  useEffect(() => {
    if (props.onLoad) {
      props.onLoad()
    }

    return () => {
      if (props.onUnload) {
        props.onUnload()
      }
    }
  }, [deps])
}
