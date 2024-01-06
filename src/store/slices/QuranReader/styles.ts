import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import resetSettings from '~/store/actions/reset-settings'
import syncUserPreferences from '~/store/actions/sync-user-preferences'
import { getQuranReaderStylesInitialState } from '~/store/defaultSettings/util'
import { IRootState } from '~/store'
import QuranReaderStyles from '~/store/types/QuranReaderStyles'
import SliceName from '~/store/types/SliceName'
import PreferenceGroup from '~/types/auth/PreferenceGroup'
import { MushafLines, QuranFont } from '~/types/QuranReader'

export const MAXIMUM_QURAN_FONT_STEP = 10
export const MAXIMUM_TRANSLATIONS_FONT_STEP = 10
export const MAXIMUM_TAFSIR_FONT_STEP = 10
export const MAXIMUM_WORD_BY_WORD_FONT_STEP = 6
export const MINIMUM_FONT_STEP = 1

export const quranReaderStylesSlice = createSlice({
  name: SliceName.QURAN_READER_STYLES,
  initialState: getQuranReaderStylesInitialState(),
  reducers: {
    increaseQuranTextFontScale: (state) => ({
      ...state,
      quranTextFontScale: state.quranTextFontScale + 1,
    }),
    decreaseQuranTextFontScale: (state) => ({
      ...state,
      quranTextFontScale: state.quranTextFontScale - 1,
    }),
    increaseTranslationFontScale: (state) => ({
      ...state,
      translationFontScale: state.translationFontScale + 1,
    }),
    decreaseTranslationFontScale: (state) => ({
      ...state,
      translationFontScale: state.translationFontScale - 1,
    }),
    increaseTafsirFontScale: (state) => ({
      ...state,
      tafsirFontScale: state.tafsirFontScale + 1,
    }),
    decreaseTafsirFontScale: (state) => ({
      ...state,
      tafsirFontScale: state.tafsirFontScale - 1,
    }),
    increaseWordByWordFontScale: (state) => ({
      ...state,
      wordByWordFontScale: state.wordByWordFontScale + 1,
    }),
    decreaseWordByWordFontScale: (state) => ({
      ...state,
      wordByWordFontScale: state.wordByWordFontScale - 1,
    }),
    setMushafLines: (
      state,
      action: PayloadAction<{ mushafLines: MushafLines; locale: string }>,
    ) => {
      const { mushafLines, locale } = action.payload
      const defaultQuranStylesForLocale = getQuranReaderStylesInitialState(locale)
      return {
        ...state,
        mushafLines,
        isUsingDefaultFont:
          defaultQuranStylesForLocale.mushafLines === mushafLines &&
          state.quranFont === defaultQuranStylesForLocale.quranFont,
      }
    },
    setQuranFont: (
      state: QuranReaderStyles,
      action: PayloadAction<{ quranFont: QuranFont; locale: string }>,
    ) => {
      const { quranFont, locale } = action.payload
      const defaultQuranStylesForLocale = getQuranReaderStylesInitialState(locale)
      const isUsingDefaultFont =
        defaultQuranStylesForLocale.quranFont === quranFont &&
        state.mushafLines === defaultQuranStylesForLocale.mushafLines
      switch (quranFont) {
        case QuranFont.MadaniV1:
          return {
            ...state,
            quranFont,
            isUsingDefaultFont,
          }
        case QuranFont.IndoPak:
          return {
            ...state,
            quranFont,
            isUsingDefaultFont,
          }
        default:
          return {
            ...state,
            quranFont,
            isUsingDefaultFont,
          }
      }
    },
  },
  // reset the state to the initial state
  // when `reset` action is dispatched
  extraReducers: (builder) => {
    builder.addCase(resetSettings, (state, action) => {
      return getQuranReaderStylesInitialState(action.payload.locale)
    })
    builder.addCase(syncUserPreferences, (state, action) => {
      const {
        payload: { userPreferences, locale },
      } = action
      const remotePreferences = userPreferences[
        PreferenceGroup.QURAN_READER_STYLES
      ] as QuranReaderStyles
      if (remotePreferences) {
        const { quranFont: defaultQuranFont, mushafLines: defaultMushafLines } =
          getQuranReaderStylesInitialState(locale)
        return {
          ...state,
          ...remotePreferences,
          isUsingDefaultFont:
            defaultQuranFont === remotePreferences.quranFont &&
            defaultMushafLines === remotePreferences.mushafLines,
        }
      }
      return state
    })
  },
})

export const {
  increaseTafsirFontScale,
  decreaseTafsirFontScale,
  setQuranFont,
  increaseQuranTextFontScale,
  decreaseQuranTextFontScale,
  increaseTranslationFontScale,
  decreaseTranslationFontScale,
  increaseWordByWordFontScale,
  decreaseWordByWordFontScale,
  setMushafLines,
} = quranReaderStylesSlice.actions

export const selectQuranReaderStyles = (state: IRootState) => state.quranReaderStyles
export const selectQuranFont = (state: IRootState) => state.quranReaderStyles.quranFont
export const selectQuranMushafLines = (state: IRootState) => state.quranReaderStyles.mushafLines
export const selectWordByWordFontScale = (state: IRootState) =>
  state.quranReaderStyles.wordByWordFontScale
export const selectIsUsingDefaultFont = (state: IRootState) =>
  !!state.quranReaderStyles.isUsingDefaultFont

export default quranReaderStylesSlice.reducer
