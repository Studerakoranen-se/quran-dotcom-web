import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRootState } from '~/store'
import syncUserPreferences from '../actions/sync-user-preferences'

enum PreferenceGroup {
  TAFSIRS = 'tafsirs',
  TRANSLATIONS = 'translations',
  AUDIO = 'audio',
  THEME = 'theme',
  QURAN_READER_STYLES = 'quranReaderStyles',
  READING = 'reading',
  LANGUAGE = 'language',
}

type RevelationOrderState = {
  isReadingByRevelationOrder: boolean
}

export const initialState: RevelationOrderState = {
  isReadingByRevelationOrder: false,
}

export const revelationOrderSlice = createSlice({
  name: 'revelationOrder',
  initialState,
  reducers: {
    setIsReadingByRevelationOrder: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isReadingByRevelationOrder: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(syncUserPreferences, (state, action) => {
      const {
        payload: { userPreferences },
      } = action
      const remoteReadingPreferences = userPreferences[
        PreferenceGroup.READING
      ] as RevelationOrderState
      // if there are any reading preferences stored in the DB.
      if (remoteReadingPreferences) {
        return {
          ...state,
          isReadingByRevelationOrder: !!remoteReadingPreferences.isReadingByRevelationOrder,
        }
      }
      return state
    })
  },
})

export const selectIsReadingByRevelationOrder = (state: IRootState): boolean =>
  state.revelationOrder.isReadingByRevelationOrder

export const { setIsReadingByRevelationOrder } = revelationOrderSlice.actions

export default revelationOrderSlice.reducer
