/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { IRootState } from '~/store'
import NotificationsState from '~/store/types/NotificationsState'
import { DefaultSettings } from '~/store/defaultSettings/defaultSettings'
import AudioState from '~/store/types/AudioState'
import QuranReaderStyles from '~/store/types/QuranReaderStyles'
import ReadingPreferences from '~/store/types/ReadingPreferences'
import SliceName from '~/store/types/SliceName'
import TafsirsSettings from '~/store/types/TafsirsSettings'
import TranslationsSettings from '~/store/types/TranslationsSettings'

const DEFAULT_LOCALE = 'en'

/**
 * Dynamically load the default settings of the locale passed.
 *
 * @param {string} locale
 * @returns {DefaultSettings}
 */
const importLocaleFile = (locale: string): DefaultSettings =>
  require(`src/store/defaultSettings/locales/${locale}`).default

/**
 * Get specific settings by its key for a locale.
 * e.g. get the settings for theme by the key 'theme'.
 *
 * @param {string} locale
 * @param {string} key
 * @returns {any}
 */
const getLocaleInitialStateByKey = (locale: string, key: string) => importLocaleFile(locale)[key]

export const getLocaleInitialState = (locale: string) => importLocaleFile(locale)

export const getReadingPreferencesInitialState = (locale = DEFAULT_LOCALE): ReadingPreferences => {
  return getLocaleInitialStateByKey(locale, SliceName.READING_PREFERENCES)
}

export const getQuranReaderStylesInitialState = (locale = DEFAULT_LOCALE): QuranReaderStyles => {
  return getLocaleInitialStateByKey(locale, SliceName.QURAN_READER_STYLES)
}

export const getTranslationsInitialState = (locale = DEFAULT_LOCALE): TranslationsSettings => {
  return getLocaleInitialStateByKey(locale, SliceName.TRANSLATIONS)
}

export const getTafsirsInitialState = (locale = DEFAULT_LOCALE): TafsirsSettings => {
  return getLocaleInitialStateByKey(locale, SliceName.TAFSIRS)
}
export const getAudioPlayerStateInitialState = (locale = DEFAULT_LOCALE): AudioState => {
  return getLocaleInitialStateByKey(locale, SliceName.AUDIO_PLAYER_STATE)
}

export const getNotificationsInitialState = (locale = DEFAULT_LOCALE): NotificationsState => {
  return getLocaleInitialStateByKey(locale, SliceName.NOTIFICATIONS)
}

/**
 * Get the initial state of the store.
 *
 * @param {string} locale
 * @returns {RootState}
 */
export const getStoreInitialState = (locale: string): IRootState => {
  return {
    [SliceName.READING_PREFERENCES]: getReadingPreferencesInitialState(locale),
    [SliceName.QURAN_READER_STYLES]: getQuranReaderStylesInitialState(locale),
    // @ts-ignore
    [SliceName.TRANSLATIONS]: getTranslationsInitialState(locale),
    // @ts-ignore
    [SliceName.TAFSIRS]: getTafsirsInitialState(locale),
    // @ts-ignore
    [SliceName.AUDIO_PLAYER_STATE]: getAudioPlayerStateInitialState(locale),
    [SliceName.DEFAULT_SETTINGS]: { isUsingDefaultSettings: true },
    [SliceName.NOTIFICATIONS]: getNotificationsInitialState(locale),
  }
}
