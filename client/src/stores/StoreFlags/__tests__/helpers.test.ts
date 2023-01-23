import { mergeFlags } from '../helpers'
import { IFlags } from '../types'

describe('mergeFlags', () => {
  it('should merge truthy flags', () => {
    const flags1: IFlags = {
      flags: true,
      isLoading: true,
      isError: true,
      isForbidden: true
    }

    const flags2: IFlags = {
      flags: true,
      isLoading: true,
      isError: true,
      isForbidden: true
    }

    const flags3: IFlags = {
      flags: true,
      isLoading: true,
      isError: true,
      isForbidden: true
    }

    expect(mergeFlags([flags1, flags2, flags3])).toEqual({
      flags: true,
      // isLoading is false because isError is true
      isLoading: false,
      isError: true,
      isForbidden: true
    })
  })

  it('should merge falsy flags', () => {
    const flags1: IFlags = {
      flags: true,
      isLoading: false,
      isError: false,
      isForbidden: false
    }

    const flags2: IFlags = {
      flags: true,
      isLoading: false,
      isError: false,
      isForbidden: false
    }

    const flags3: IFlags = {
      flags: true,
      isLoading: false,
      isError: false,
      isForbidden: false
    }

    expect(mergeFlags([flags1, flags2, flags3])).toEqual({
      flags: true,
      isLoading: false,
      isError: false,
      isForbidden: false
    })
  })

  it('should merge isLoading flags', () => {
    const flags1: IFlags = {
      flags: true,
      isLoading: false,
      isError: false,
      isForbidden: false
    }

    const flags2: IFlags = {
      flags: true,
      isLoading: false,
      isError: false,
      isForbidden: false
    }

    const flags3: IFlags = {
      flags: true,
      // one isLoading is true
      isLoading: true,
      isError: false,
      isForbidden: false
    }

    expect(mergeFlags([flags1, flags2, flags3])).toEqual({
      flags: true,
      // so the final isLoading should be true
      isLoading: true,
      isError: false,
      isForbidden: false
    })
  })

  it('should merge isError flags', () => {
    const flags1: IFlags = {
      flags: true,
      isLoading: false,
      isError: false,
      isForbidden: false
    }

    const flags2: IFlags = {
      flags: true,
      isLoading: false,
      isError: false,
      isForbidden: false
    }

    const flags3: IFlags = {
      flags: true,
      isLoading: false,
      // one isError is true
      isError: true,
      isForbidden: false
    }

    expect(mergeFlags([flags1, flags2, flags3])).toEqual({
      flags: true,
      isLoading: false,
      // so the final isError should be true
      isError: true,
      isForbidden: false
    })
  })

  it('should merge isForbidden flags', () => {
    const flags1: IFlags = {
      flags: true,
      isLoading: false,
      isError: false,
      isForbidden: false
    }

    const flags2: IFlags = {
      flags: true,
      isLoading: false,
      isError: false,
      isForbidden: false
    }

    const flags3: IFlags = {
      flags: true,
      isLoading: false,
      isError: false,
      // one isForbidden is true
      isForbidden: true
    }

    expect(mergeFlags([flags1, flags2, flags3])).toEqual({
      flags: true,
      isLoading: false,
      isError: false,
      // so the final isForbidden should be true
      isForbidden: true
    })
  })

  describe('isSuccess', () => {
    it('should merge isSuccess flags (1/2)', () => {
      const flags1: IFlags = {
        flags: true,
        isLoading: false,
        isError: false,
        isForbidden: false
      }

      const flags2: IFlags = {
        flags: true,
        isLoading: false,
        isError: false,
        isForbidden: false
      }

      const flags3: IFlags = {
        flags: true,
        isLoading: false,
        isError: false,
        isForbidden: false
        // one isSuccess is false
      }

      expect(mergeFlags([flags1, flags2, flags3])).toEqual({
        flags: true,
        isLoading: false,
        isError: false,
        isForbidden: false
        // so isSuccess should be false
      })
    })

    it('should merge isSuccess flags (2/2)', () => {
      const flags1: IFlags = {
        flags: true,
        isLoading: false,
        isError: false,
        isForbidden: false
      }

      const flags2: IFlags = {
        flags: true,
        isLoading: false,
        isError: false,
        isForbidden: false
      }

      const flags3: IFlags = {
        flags: true,
        isLoading: false,
        isError: false,
        isForbidden: false
      }

      expect(mergeFlags([flags1, flags2, flags3])).toEqual({
        flags: true,
        isLoading: false,
        isError: false,
        isForbidden: false
        // all success should be true to be true
      })
    })
  })
})
