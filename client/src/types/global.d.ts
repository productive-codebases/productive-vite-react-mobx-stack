/** Global definitions */

import '@testing-library/jest-dom/extend-expect'
import { toJS } from 'mobx-react-lite'

export declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    // TUL interal API, not exposed (yet?)
    TUL_STORE_ROOT: any

    // Expose TID internals, useful for debugging
    TID: {
      storeRoot: StoreRoot
      toJS: typeof toJS
    }
  }
}

/**
 * Allow to use generic on React.forwardRef.
 * Credits to https://fettblog.eu/typescript-react-generic-forward-refs/
 */
declare module 'react' {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null
}
