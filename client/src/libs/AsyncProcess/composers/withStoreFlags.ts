import StoreFlags from '@/client/stores/StoreFlags'
import { AsyncProcess } from '@productive-codebases/async-process'
import { MetaData } from '@productive-codebases/toolbox'

interface IWithStoreFlagsMetadata {
  withStoreFlags: {
    initialized: boolean
  }
}

/**
 * Set StoreFlags status according to the status of an async process.
 */
export function withStoreFlags<TIdentifier extends string>(
  ...storeFlags: StoreFlags[]
) {
  return (
    asyncProcess: AsyncProcess<TIdentifier>
  ): AsyncProcess<TIdentifier> => {
    const metadata = asyncProcess.metadata as MetaData<IWithStoreFlagsMetadata>
    const composerMetadata = metadata.get('withStoreFlags')

    // because getting the same AsyncProcess instance, avoid register again is already done
    if (composerMetadata?.initialized) {
      return asyncProcess
    }

    metadata.set({
      withStoreFlags: {
        initialized: true
      }
    })

    return AsyncProcess.instance<TIdentifier>(asyncProcess.identifier, [
      'withStoreFlags'
    ])
      .onStart(() => storeFlags.forEach(storeFlag => storeFlag.loading()))
      .onSuccess(() => storeFlags.forEach(storeFlag => storeFlag.success()))
      .onError(() => storeFlags.forEach(storeFlag => storeFlag.fail()))
  }
}
