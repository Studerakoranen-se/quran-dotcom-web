import { createAction } from '@reduxjs/toolkit'

enum PreferenceGroup {
  TAFSIRS = 'tafsirs',
  TRANSLATIONS = 'translations',
  AUDIO = 'audio',
  THEME = 'theme',
  QURAN_READER_STYLES = 'quranReaderStyles',
  READING = 'reading',
  LANGUAGE = 'language',
}

type UserPreferencesResponse = Record<PreferenceGroup, any>

export const SYNC_USER_PREFERENCES_EVENT = 'syncUserPreferences'

// a global action creator
// other reducers can use this action to sync the state locally
// persisted state with the remote one via `extraReducer`
// example usage can be check in `src/redux/slices/theme.ts`

// reference for `extraReducer`
// - https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist search for `extraReducer`
// - https://redux-toolkit.js.org/api/createslice#extrareducers

// current usage
// - currently being used in `src/redux/Provider.tsx`
export default createAction(
  SYNC_USER_PREFERENCES_EVENT,
  (userPreferences: UserPreferencesResponse, locale: string) => {
    return {
      payload: {
        userPreferences,
        locale,
      },
    }
  },
)
