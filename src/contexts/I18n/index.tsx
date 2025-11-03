import i18n, { i18nConfig } from 'es2015-i18n-tag'
import PropTypes from 'prop-types'
import * as React from 'react'

interface I18nContextValue {
  defaultLocale?: string
  foundPreferredLocale?: string
  locale?: string
  t: typeof i18n
  translate: typeof i18n.translate
}

export const I18nContext = React.createContext<I18nContextValue>({
  t: i18n,
  translate: i18n.translate,
})

if (process.env.NODE_ENV !== 'production') {
  I18nContext.displayName = 'I18nContext'
}

export function useI18n() {
  return React.useContext(I18nContext)
}

interface I18nProviderProps {
  children: React.ReactNode
  defaultLocale?: string
  locale: string
}

function I18nProvider(props: I18nProviderProps) {
  const { children, defaultLocale = 'sv', locale } = props

  let translations: Record<string, string | Record<string, string>>

  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    translations = require(`../../../public/locales/${locale}.json`)
  } catch (err) {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    translations = require(`../../../public/locales/${defaultLocale}.json`)
  }

  i18nConfig({
    translations,
    // Intl DateTimeFormat options as described here: https://goo.gl/lslekB
    date: {},
    // Intl NumberFormat options as described here: https://goo.gl/pDwbG2
    number: {},
  })

  const contextValue = React.useMemo(
    () => ({
      defaultLocale,
      locale,
      t: i18n,
      translate: i18n.translate,
    }),
    [defaultLocale, locale],
  )

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
}

I18nProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultLocale: PropTypes.string,
  locale: PropTypes.string,
}

export default I18nProvider
