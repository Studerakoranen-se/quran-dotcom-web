import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRootState } from '~/store'
import SliceName from '~/store/types/SliceName'
import { getMushafId } from '~/utils/api'
import { addOrUpdateBulkUserPreferences } from '~/utils/auth/api'
import { stateToPreferenceGroups } from '~/utils/auth/preferencesMapper'
import { getLocaleInitialState } from '../defaultSettings/util'

export type DefaultSettings = {
  isUsingDefaultSettings: boolean
}

const initialState: DefaultSettings = { isUsingDefaultSettings: true }

export const defaultSettingsSlice = createSlice({
  name: SliceName.DEFAULT_SETTINGS,
  initialState,
  reducers: {
    setIsUsingDefaultSettings: (state: DefaultSettings, action: PayloadAction<boolean>) => ({
      ...state,
      isUsingDefaultSettings: action.payload,
    }),
  },
})

export const persistDefaultSettings = createAsyncThunk<void, string, { state: IRootState }>(
  `${SliceName.DEFAULT_SETTINGS}/persistDefaultSettings`,
  async (locale) => {
    const localeDefaultSettings = stateToPreferenceGroups({
      ...getLocaleInitialState(locale),
      [SliceName.LOCALE]: locale,
    })

    const { quranReaderStyles } = localeDefaultSettings
    const { mushaf } = getMushafId(quranReaderStyles.quranFont, quranReaderStyles.mushafLines)

    await addOrUpdateBulkUserPreferences(localeDefaultSettings, mushaf)
  },
)

export const { setIsUsingDefaultSettings } = defaultSettingsSlice.actions

export default defaultSettingsSlice.reducer

export const selectIsUsingDefaultSettings = (state: IRootState) =>
  state.defaultSettings.isUsingDefaultSettings
