import themeConfig from 'theme.config'

const path = require('path')

const supportedLngs = [
  'da',
  'de',
  'el',
  'en',
  'es',
  'fr',
  'hu',
  'it',
  'ja',
  'pl',
  'pt',
  'ru',
  'sv',
  'tr',
  'zh',
]
export const ni18nConfig = {
  fallbackLng: [themeConfig.locale || 'en'],
  supportedLngs,
  ns: ['translation'],
  react: { useSuspense: false },
  backend: {
    loadPath: path.resolve(`/locales/{{lng}}.json`),
  },
}
