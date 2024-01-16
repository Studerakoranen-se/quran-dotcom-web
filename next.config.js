/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpackBaseConfig')
const { i18n } = require('./locales')

const isDev = process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'
const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'

const nextConfig = {
  // For more on internalization see:
  // https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    // we are using `default` as a default locale here simply as a hack to always route the user to a proper locale
    // the "real" default locale is actually "en" and can be imported from '~/../locales'
    locales: i18n.languages.map((item) => item.id),
    defaultLocale: i18n.base,
    localeDetection: false,
  },
  env: {
    APP_URL: process.env.APP_URL,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
    SANITY_API_VERSION: process.env.SANITY_API_VERSION,
    PREVIEW_SECRET: process.env.PREVIEW_SECRET,
    QURAN_API_V4: process.env.QURAN_API_V4,
    QURAN_API_V3: process.env.QURAN_API_V3,
    GTM_PARAMS: process.env.GTM_PARAMS,
    DATADOG_CLIENT_TOKEN: process.env.DATADOG_CLIENT_TOKEN,
    DATADOG_SITE: process.env.DATADOG_SITE,
  },
  output: 'standalone',
  reactStrictMode: false,
  poweredByHeader: false,
  swcMinify: true,
  trailingSlash: false,
  webpack: async (config) => {
    return merge(config, webpackBaseConfig, {
      resolve: {
        fallback: {
          // net: false,
          // fs: false,
          // dns: false,
          // child_process: false,
          // tls: false,
        },
      },
    })
  },
  headers: async () => [
    ...(process.env.DISABLE_INDEXING && isProduction
      ? [
          {
            source: '/:path*',
            headers: [
              {
                key: 'X-Robots-Tag',
                value: 'noindex, nofollow',
              },
            ],
          },
        ]
      : []),
  ],
}

module.exports = withBundleAnalyzer(nextConfig)
