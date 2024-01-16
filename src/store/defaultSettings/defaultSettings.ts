import QuranReaderStyles from '~/store/types/QuranReaderStyles'
import ReadingPreferences from '~/store/types/ReadingPreferences'
import SliceName from '~/store/types/SliceName'
import TafsirsSettings from '~/store/types/TafsirsSettings'
import TranslationsSettings from '~/store/types/TranslationsSettings'
import {
  ReadingPreference,
  WordByWordType,
  WordClickFunctionality,
  MushafLines,
  QuranFont,
  WordByWordDisplay,
} from '~/types/QuranReader'
import Reciter from '~/types/Reciter'
import AudioState from '~/store/types/AudioState'
import NotificationsState from '~/store/types/NotificationsState'

export interface DefaultSettings {
  [SliceName.READING_PREFERENCES]: ReadingPreferences
  [SliceName.QURAN_READER_STYLES]: QuranReaderStyles
  [SliceName.TRANSLATIONS]: TranslationsSettings
  [SliceName.TAFSIRS]: TafsirsSettings
  [SliceName.AUDIO_PLAYER_STATE]: AudioState
  [SliceName.DEFAULT_SETTINGS]: { isUsingDefaultSettings: boolean }
  [SliceName.NOTIFICATIONS]: NotificationsState
}

// Tafsir Ibn Kathir in English
export const DEFAULT_TAFSIRS = ['en-tafisr-ibn-kathir']

export const DEFAULT_RECITER: Reciter = {
  id: 7,
  name: 'Mishari Rashid al-`Afasy',
  recitationStyle: 'Warsh',
  relativePath: 'mishaari_raashid_al_3afaasee',
}

const TAFSIRS_INITIAL_STATE: TafsirsSettings = {
  selectedTafsirs: DEFAULT_TAFSIRS,
  isUsingDefaultTafsirs: true,
}

export const DEFAULT_TRANSLATIONS = [48] // Knut Bernström

const TRANSLATIONS_INITIAL_STATE: TranslationsSettings = {
  selectedTranslations: DEFAULT_TRANSLATIONS,
  isUsingDefaultTranslations: true,
}

const QURAN_READER_STYLES_INITIAL_STATE: QuranReaderStyles = {
  // the base sizes in rem
  tafsirFontScale: 3,
  quranTextFontScale: 3,
  translationFontScale: 3,
  wordByWordFontScale: 3,
  quranFont: QuranFont.MadaniV1,
  mushafLines: MushafLines.SixteenLines,
  isUsingDefaultFont: true,
}

const DEFAULT_WBW_LOCALE = 'en'

const READING_PREFERENCES_INITIAL_STATE: ReadingPreferences = {
  readingPreference: ReadingPreference.Translation,
  selectedWordByWordLocale: DEFAULT_WBW_LOCALE,
  isUsingDefaultWordByWordLocale: true,
  wordByWordContentType: [WordByWordType.Translation],
  wordByWordDisplay: [WordByWordDisplay.TOOLTIP],
  wordClickFunctionality: WordClickFunctionality.PlayAudio,
}

const AUDIO_INITIAL_STATE: AudioState = {
  enableAutoScrolling: true,
  isDownloadingAudio: false,
  showTooltipWhenPlayingAudio: false,
}

export const DEFAULT_XSTATE_INITIAL_STATE = {
  playbackRate: 1,
  reciterId: DEFAULT_RECITER.id,
}

const NOTIFICATIONS_INITIAL_STATE: NotificationsState = {
  notifications: [],
  paginatedNotifications: {},
  isFetchingNotifications: false,
  isLoadingNotifications: false,
  unseenCount: 0,
}

export default {
  [SliceName.READING_PREFERENCES]: READING_PREFERENCES_INITIAL_STATE,
  [SliceName.QURAN_READER_STYLES]: QURAN_READER_STYLES_INITIAL_STATE,
  [SliceName.TRANSLATIONS]: TRANSLATIONS_INITIAL_STATE,
  [SliceName.TAFSIRS]: TAFSIRS_INITIAL_STATE,
  [SliceName.AUDIO_PLAYER_STATE]: AUDIO_INITIAL_STATE,
  [SliceName.NOTIFICATIONS]: NOTIFICATIONS_INITIAL_STATE,
} as DefaultSettings
