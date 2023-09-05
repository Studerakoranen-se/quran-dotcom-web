/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpackBaseConfig')
const { locales } = require('./locales')

const nextConfig = {
  // For more on internalization see:
  // https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    defaultLocale: 'sv',
    localeDetection: false,
    locales,
  },
  env: {
    APP_URL: process.env.APP_URL,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
    SANITY_API_VERSION: process.env.SANITY_API_VERSION,
    QURAN_API_V4: process.env.QURAN_API_V4,
    QURAN_API_V3: process.env.QURAN_API_V3,
    GTM_PARAMS: process.env.GTM_PARAMS,
    DATADOG_CLIENT_TOKEN: process.env.DATADOG_CLIENT_TOKEN,
    DATADOG_SITE: process.env.DATADOG_SITE,
  },
  poweredByHeader: false,
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
    ...(process.env.DISABLE_INDEXING
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
