import { some } from 'lodash'
import { IFlags } from './types'

/**
 * Useful to use when debugging loading state.
 */
export const devFlagsLoading: IFlags = {
  flags: true,
  isLoading: true,
  isError: false,
  isForbidden: false
}

/**
 * Merge flags.
 * Useful when the global status depends of multiple flags of multiple stores.
 */
export function mergeFlags(flags: IFlags[]): IFlags {
  const allFlags: {
    isLoading: boolean[]
    isError: boolean[]
    isForbidden: boolean[]
    isSuccess: boolean[]
  } = {
    isLoading: [],
    isError: [],
    isForbidden: [],
    isSuccess: []
  }

  flags.forEach(flag => {
    allFlags.isLoading.push(flag.isLoading)
    allFlags.isError.push(flag.isError)
    allFlags.isForbidden.push(flag.isForbidden)
  })

  const finalFlags: IFlags = {
    flags: true,
    isLoading: some(allFlags.isLoading),
    isError: some(allFlags.isError),
    isForbidden: some(allFlags.isForbidden)
  }

  // As async processes are generally not correlated, if a flags object is in error,
  // let's consider that other flags object can't be stuck with a loading state.
  if (finalFlags.isError) {
    finalFlags.isLoading = false
  }

  return finalFlags
}
