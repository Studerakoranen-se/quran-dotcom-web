import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import SliceName from '~/store/types/SliceName'
import resetSettings from '~/store/actions/reset-settings'
import syncUserPreferences from '~/store/actions/sync-user-preferences'
import { getReadingPreferencesInitialState } from '~/store/defaultSettings/util'
import { IRootState } from '~/store'
import ReadingPreferences from '~/store/types/ReadingPreferences'
import PreferenceGroup from '~/types/auth/PreferenceGroup'
import {
  ReadingPreference,
  WordByWordDisplay,
  WordByWordType,
  WordClickFunctionality,
} from '~/types/QuranReader'

export const readingPreferencesSlice = createSlice({
  name: SliceName.READING_PREFERENCES,
  initialState: getReadingPreferencesInitialState(),
  reducers: {
    setReadingPreference: (state, action: PayloadAction<ReadingPreference>) => ({
      ...state,
      readingPreference: action.payload,
    }),
    setSelectedWordByWordLocale: (
      state,
      action: PayloadAction<{ value: string; locale: string }>,
    ) => ({
      ...state,
      selectedWordByWordLocale: action.payload.value,
      isUsingDefaultWordByWordLocale:
        action.payload.value ===
        getReadingPreferencesInitialState(action.payload.locale).selectedWordByWordLocale,
    }),
    setWordClickFunctionality: (state, action: PayloadAction<WordClickFunctionality>) => ({
      ...state,
      wordClickFunctionality: action.payload,
    }),
    setWordByWordContentType: (state, action: PayloadAction<WordByWordType[]>) => ({
      ...state,
      wordByWordContentType: action.payload,
    }),
    setWordByWordDisplay: (state, action: PayloadAction<WordByWordDisplay[]>) => ({
      ...state,
      wordByWordDisplay: action.payload,
    }),
  },
  // reset the state to initial state
  // when `reset` action is dispatched
  extraReducers: (builder) => {
    builder.addCase(resetSettings, (state, action) => {
      return getReadingPreferencesInitialState(action.payload.locale)
    })
    builder.addCase(syncUserPreferences, (state, action) => {
      const {
        payload: { userPreferences, locale },
      } = action
      const remotePreferences = userPreferences[PreferenceGroup.READING] as ReadingPreferences
      if (remotePreferences) {
        const { selectedWordByWordLocale: defaultWordByWordLocale } =
          getReadingPreferencesInitialState(locale)
        return {
          ...state,
          ...remotePreferences,
          isUsingDefaultWordByWordLocale:
            remotePreferences.selectedWordByWordLocale === defaultWordByWordLocale,
        }
      }
      return state
    })
  },
})

export const {
  setReadingPreference,
  setSelectedWordByWordLocale,
  setWordClickFunctionality,
  setWordByWordContentType,
  setWordByWordDisplay,
} = readingPreferencesSlice.actions

/**
 * Check whether we should display inline wbw translation/transliteration.
 *
 * @param {RootState} state
 * @returns {{showWordByWordTranslation: boolean, showWordByWordTransliteration: boolean}}
 */
export const selectInlineDisplayWordByWordPreferences = (
  state: IRootState,
): { showWordByWordTranslation: boolean; showWordByWordTransliteration: boolean } => {
  const { readingPreferences } = state
  const { wordByWordDisplay, wordByWordContentType } = readingPreferences

  const shouldDisplayInline = wordByWordDisplay.includes(WordByWordDisplay.INLINE)

  return {
    showWordByWordTranslation:
      shouldDisplayInline && wordByWordContentType.includes(WordByWordType.Translation),
    showWordByWordTransliteration:
      shouldDisplayInline && wordByWordContentType.includes(WordByWordType.Transliteration),
  }
}

/**
 * Check whether the tooltip content is enabled or not.
 * To be considered enabled, the following conditions need to be met:
 *
 * 1. display options need to include tooltip.
 * 2. word by word content need to contain either translation or transliteration.
 *
 * @param {RootState} state
 * @returns {boolean}
 */
export const selectIsTooltipContentEnabled = (state: IRootState): boolean => {
  const { readingPreferences } = state
  const { wordByWordContentType, wordByWordDisplay } = readingPreferences

  const shouldDisplayTooltip = wordByWordDisplay.includes(WordByWordDisplay.TOOLTIP)

  if (!shouldDisplayTooltip) {
    return false
  }

  return (
    wordByWordContentType.includes(WordByWordType.Translation) ||
    wordByWordContentType.includes(WordByWordType.Transliteration)
  )
}
export const selectReadingPreferences = (state: IRootState): ReadingPreferences =>
  state.readingPreferences

/**
 * Select which tooltip content to show. We should not show any tooltips when:
 *
 * 1. Display options does not include tooltip.
 * 2. Display options does include tooltip but no translation/transliterations were selected.
 *
 * @param {IRootState} state
 * @returns {WordByWordType[]}
 */
export const selectTooltipContentType = (state: IRootState): WordByWordType[] => {
  const { readingPreferences } = state
  const { wordByWordDisplay, wordByWordContentType } = readingPreferences
  if (
    !wordByWordDisplay ||
    !wordByWordDisplay.includes(WordByWordDisplay.TOOLTIP) ||
    !wordByWordContentType ||
    !wordByWordContentType.length
  ) {
    return []
  }
  return wordByWordContentType
}
export const selectReadingPreference = (state: IRootState) =>
  state.readingPreferences.readingPreference
export const selectWordClickFunctionality = (state: IRootState) =>
  state.readingPreferences.wordClickFunctionality
export const selectWordByWordLocale = (state: IRootState) =>
  state.readingPreferences.selectedWordByWordLocale
export const selectIsUsingDefaultWordByWordLocale = (state: IRootState) =>
  state.readingPreferences.isUsingDefaultWordByWordLocale

export default readingPreferencesSlice.reducer
