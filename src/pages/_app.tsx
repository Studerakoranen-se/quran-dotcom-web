import '../../scripts/globals'
import '../styles/globals.css'
// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'
import * as React from 'react'
import Head from 'next/head'
import type { AppProps as NextAppProps } from 'next/app'
import type { NextPage } from 'next'
import type { EmotionCache } from '@emotion/cache'
import { Button } from '@mui/material'
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
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
