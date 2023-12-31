import React from 'react'
import Head from 'next/head'

const DEFAULT_LOCALE = 'en'

const SURAH_NAMES_FONT_1 = {
  type: 'font/woff',
  location:
    'https://previous.quran.com/assets/surah_names/surah_names-d8d31cd4f98ff304649f26105c5bcd99f9dc0ecd1c855408be326c5dd13a867c.woff',
}

const SURAH_NAMES_FONT_2 = {
  type: 'font/woff2',
  location:
    'https://previous.quran.com/assets/surah_names/surah_names-0d8f48bbfd059adcdbf75fd3190bb1826a904a2549d465ca1a218249a86daf38.woff2',
}

const LOCALE_PRELOADED_FONTS = {
  [DEFAULT_LOCALE]: [{ ...SURAH_NAMES_FONT_1 }, { ...SURAH_NAMES_FONT_2 }],
} as Record<string, { type: string; location: string }[]>

interface Props {
  locale: string
}

const getToBePreLoadedFonts = (locale: string) => {
  return LOCALE_PRELOADED_FONTS[locale] || LOCALE_PRELOADED_FONTS[DEFAULT_LOCALE]
}

const FontPreLoader: React.FC<Props> = ({ locale = 'en' }) => {
  const toBePreLoadedFonts = getToBePreLoadedFonts(locale)

  return (
    <Head>
      {toBePreLoadedFonts.map((fontDetails) => (
        <link
          key={fontDetails.location}
          rel="preload"
          as="font"
          type={fontDetails.type}
          href={fontDetails.location}
          crossOrigin="anonymous"
        />
      ))}
    </Head>
  )
}

export default FontPreLoader
