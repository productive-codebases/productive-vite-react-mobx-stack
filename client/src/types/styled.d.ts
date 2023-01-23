import 'styled-components'
import { Theme } from '../styles/themes/types'

/**
 * Allow to type the theme injected to styled() or useContext(ThemeContext).
 */
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface DefaultTheme extends Theme {}
}
