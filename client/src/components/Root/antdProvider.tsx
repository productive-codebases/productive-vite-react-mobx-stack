import { useStores } from '@/client/hooks/useStores'
import { getLanguage } from '@/client/libs/i18n/translate/helpers'
import { Language } from '@/client/libs/i18n/types'
import { MaybeUndef } from '@/common/types'
import { ConfigProvider } from 'antd'
import { ThemeConfig } from 'antd/lib/config-provider/context'
import { Locale } from 'antd/lib/locale-provider'
import en_US from 'antd/locale/en_US'
import { useTheme } from 'styled-components'

interface IAntdConfigProviderProps {
  children: React.ReactNode
}

export function getAntdLocale(locale: Language): MaybeUndef<Locale> {
  const mapping: Record<Language, Locale> = {
    en: en_US
  }

  return mapping[locale]
}

/**
 * Configure Antd with the app language.
 */
function AntdProvider(props: IAntdConfigProviderProps) {
  const { storeRoot } = useStores()

  const theme = useTheme()

  const antdLocale = getAntdLocale(getLanguage(storeRoot.environment))

  // override tokens of AntDesign
  const antdTheme: ThemeConfig = {
    token: {
      fontFamily: theme.fonts.base
    }
  }

  return (
    <ConfigProvider theme={antdTheme} locale={antdLocale}>
      {props.children}
    </ConfigProvider>
  )
}

export default AntdProvider
