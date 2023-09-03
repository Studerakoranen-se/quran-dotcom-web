import * as React from 'react'
import PropTypes from 'prop-types'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material'
import createEmotionCache from '~/utils/createEmotionCache'
import { defaultTheme } from '~/components'
import GlobalProvider from '../Global'
import I18nProvider from '../I18n'
import RemoteConfigProvider from '../RemoteConfig'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()
// Disable "potentially unsafe selector when doing server-side rendering" for Storybook.
clientSideEmotionCache.compat = process.env.STORYBOOK === 'true'

function RootProvider(props) {
  const { children, defaultLocale, emotionCache = clientSideEmotionCache, locale, settings } = props

  return (
    <CacheProvider value={emotionCache}>
      <I18nProvider defaultLocale={defaultLocale} locale={locale}>
        <RemoteConfigProvider value={settings}>
          <GlobalProvider>
            <CssVarsProvider theme={defaultTheme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />

              {children}
            </CssVarsProvider>
          </GlobalProvider>
        </RemoteConfigProvider>
      </I18nProvider>
    </CacheProvider>
  )
}

RootProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultLocale: PropTypes.string,
  emotionCache: PropTypes.object,
  locale: PropTypes.string,
  settings: PropTypes.object,
}

export default RootProvider
