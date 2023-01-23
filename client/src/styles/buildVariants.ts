import { newBuildVariants } from '@productive-codebases/build-variants'
import { CSSObject } from 'styled-components'

export type CustomCSSObject = CSSObject & {
  $debug?: 1 | 0
}

/**
 * Create a BuildVariants instance, typed to use styled-components's `CSSObject`s.
 */
export function buildVariants<TProps extends object>(props: TProps) {
  return newBuildVariants<TProps, CustomCSSObject>(props).replace(
    '$debug',
    value => {
      switch (value) {
        case 1: {
          return {
            outline: '1px dotted red'
          }
        }

        case 0: {
          return {}
        }

        default:
          return {}
      }
    }
  )
}
