import type { EmotionCache } from '@emotion/cache'
import { Button } from '@mui/material'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { NextPage } from 'next'
import type { AppProps as NextAppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import * as React from 'react'
import AudioPlayer from '~/components/AudioPlayer/AudioPlayer'
import FontPreLoader from '~/components/Fonts/FontPreLoader'
import { ErrorBoundary, RouterLink } from '~/containers'
import { RootProvider } from '~/contexts'
import DataContext from '~/contexts/DataContext'
import ReduxProvider from '~/contexts/ReduxStoreProvider'
import * as layoutVariants from '~/layouts'
import ChaptersData from '~/types/ChaptersData'
import { AudioPlayerMachineProvider } from '~/xstate/AudioPlayerMachineContext'
import '../../scripts/globals'
import '../styles/globals.css'

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
              {/* @ts-ignore */}
              <LayoutComponent headerMode={headerMode}>
                {/* @ts-ignore */}
                <ErrorBoundary>
                  <Component {...(page as any)} />
                  <AudioPlayer />
                </ErrorBoundary>
              </LayoutComponent>
            </RootProvider>
          </ReduxProvider>
        </AudioPlayerMachineProvider>
      </DataContext.Provider>
      <Analytics />
      <SpeedInsights />

      {/* WhatsApp contact button
      <IconButton
        sx={{
          position: 'fixed',
          right: 16,
          bottom: preview ? 64 : 16,
          backgroundColor: '#25D366',
          color: 'white',
          width: 56,
          height: 56,
          '&:hover': {
            backgroundColor: '#20BD5A',
          },
          boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
          zIndex: 1000,
        }}
        onClick={() => {
          const whatsappUrl =
            'https://api.whatsapp.com/send/?phone=46762621036&text=Hej+StuderaKoranen%21&type=phone_number&app_absent=0'
          window.open(whatsappUrl, '_blank')
        }}
        aria-label="Contact us on WhatsApp"
      >
        <WhatsappIcon />
      </IconButton> */}

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
