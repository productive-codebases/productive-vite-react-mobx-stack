import { lightTheme } from './light'
import { Theme } from './types'

export enum ThemeName {
  light = 'light'
}

export const themes: Record<ThemeName, Theme> = {
  light: lightTheme
}
