import '../../scripts/globals'
// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'
import '../styles/tailwind.css'
import * as React from 'react'
import Head from 'next/head'
import type { AppProps as NextAppProps } from 'next/app'
import type { NextPage } from 'next'
import type { EmotionCache } from '@emotion/cache'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { Button } from '@mui/material'
import { RootProvider } from '~/contexts'
import * as layoutVariants from '~/layouts'
import { RouterLink } from '~/containers'
import store from '../store'

export interface AppProps extends NextAppProps {
  Component: NextPage<Page>
  emotionCache?: EmotionCache
  pageProps: {
    defaultLocale: string
    locale: string
    headerColor?: string
    headerMode?: string
    layout?: keyof typeof layoutVariants
    page: Page
    preview?: boolean
    settings: Record<string, unknown>
    theme?: string
  }
}

function App(props: AppProps) {
  const persistor = persistStore(store)

  const { Component, emotionCache, pageProps: nextPageProps } = props

  const { defaultLocale, headerColor, headerMode, layout, locale, page, preview, ...other } =
    nextPageProps
  const LayoutComponent = layout ? layoutVariants[layout] : layoutVariants.App

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {() => {
            return (
              <RootProvider
                emotionCache={emotionCache}
                defaultLocale={defaultLocale}
                locale={locale}
                {...other}
              >
                <LayoutComponent headerColor={headerColor} headerMode={headerMode}>
                  <Component {...page} />
                </LayoutComponent>
              </RootProvider>
            )
          }}
        </PersistGate>
      </Provider>

      {/* This button closes the Next.js preview mode by linking to the api/exit-preview route */}
      {preview && (
        <Button
          sx={{ position: 'fixed', right: 8, bottom: 8 }}
          component={RouterLink}
          href="/api/exit-preview"
          variant="contained"
          color="error"
        >
          Close preview
        </Button>
      )}
    </React.Fragment>
  )
}

export default App
