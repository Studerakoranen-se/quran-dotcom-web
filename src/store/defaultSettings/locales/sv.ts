import DEFAULT_SETTINGS, { DefaultSettings } from '../defaultSettings'

const DEFAULT_WBW_LOCALE = 'sv'

export default {
  ...DEFAULT_SETTINGS,
  translations: { ...DEFAULT_SETTINGS.translations, selectedTranslations: [20, 48] },
  readingPreferences: {
    ...DEFAULT_SETTINGS.readingPreferences,
    selectedWordByWordLocale: DEFAULT_WBW_LOCALE,
  },
} as DefaultSettings
