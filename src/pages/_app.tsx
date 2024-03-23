import '../../scripts/globals'
import '../styles/globals.css'
import * as React from 'react'
import Head from 'next/head'
import type { AppProps as NextAppProps } from 'next/app'
import type { NextPage } from 'next'
import type { EmotionCache } from '@emotion/cache'
import { Button } from '@mui/material'
import Script from 'next/script'
import { RootProvider } from '~/contexts'
import * as layoutVariants from '~/layouts'
import { ErrorBoundary, RouterLink } from '~/containers'
import FontPreLoader from '~/components/Fonts/FontPreLoader'
import DataContext from '~/contexts/DataContext'
import ChaptersData from '~/types/ChaptersData'
import ReduxProvider from '~/contexts/ReduxStoreProvider'
import { AudioPlayerMachineProvider } from '~/xstate/AudioPlayerMachineContext'
import AudioPlayer from '~/components/AudioPlayer/AudioPlayer'

export interface AppProps extends NextAppProps {
  Component: NextPage<Page>
  emotionCache?: EmotionCache
  pageProps: {
    defaultLocale: string
    locale: string

    headerMode?: string
    layout?: keyof typeof layoutVariants
    page: Page & {
      chaptersData: ChaptersData
    }
    preview?: boolean
    settings: Record<string, unknown>
    theme?: string
  }
}

function App(props: AppProps) {
  const { Component, emotionCache, pageProps: nextPageProps } = props

  const { defaultLocale, headerMode, layout, locale, page, preview, ...other } = nextPageProps
  const LayoutComponent = layout ? layoutVariants[layout] : layoutVariants.App

  return (
    <React.Fragment>
      <Head>
        <meta content="width=device-width,initial-scale=1" key="viewport" name="viewport" />
      </Head>

      {/* <!-- Google Tag Manager --> */}
      {/* The next/script component is not allowed to be in Head */}

      {process.env.NODE_ENV === 'production' && (
        <React.Fragment>
          <Script
            id="google-analytics-script-url"
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />

          <Script
            id="google-analytics-script-code"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </React.Fragment>
      )}
      {/* <!-- End Google Tag Manager --> */}

      <FontPreLoader locale={locale} />
      <DataContext.Provider value={page?.chaptersData}>
        <AudioPlayerMachineProvider>
          <ReduxProvider locale={locale}>
            <RootProvider
              emotionCache={emotionCache}
              defaultLocale={defaultLocale}
              locale={locale}
              {...other}
            >
              <LayoutComponent headerMode={headerMode}>
                <ErrorBoundary>
                  <Component {...page} />
                  <AudioPlayer />
                </ErrorBoundary>
              </LayoutComponent>
            </RootProvider>
          </ReduxProvider>
        </AudioPlayerMachineProvider>
      </DataContext.Provider>

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
