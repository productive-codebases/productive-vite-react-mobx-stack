export interface IFlags {
  // add a flag just to be sure to valid an IFlags interface intead of a StoreFlags instance.
  flags: true

  isLoading: boolean
  isError: boolean
  isForbidden: boolean
}
