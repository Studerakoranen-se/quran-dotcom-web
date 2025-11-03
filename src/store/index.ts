import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
  createMigrate,
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { getStoreInitialState } from './defaultSettings/util'
import history from './historySlice'
import DefaultSettingsMiddleware from './middleware/defaultSettingsMiddleware'
import migrations from './migrations'
import audioPlayerPersistConfig from './slices/AudioPlayer/persistConfig'
import audioPlayerState from './slices/AudioPlayer/state'
import defaultSettings from './slices/defaultSettings'
import navbar from './slices/navbar'
import fontFaces from './slices/QuranReader/font-faces'
import readingPreferences from './slices/QuranReader/readingPreferences'
import readingTracker from './slices/QuranReader/readingTracker'
import readingViewVerse from './slices/QuranReader/readingViewVerse'
import sidebarNavigation from './slices/QuranReader/sidebarNavigation'
import quranReaderStyles from './slices/QuranReader/styles'
import tafsirs from './slices/QuranReader/tafsirs'
import translations from './slices/QuranReader/translations'
import revelationOrder from './slices/revelationOrder'
import themeConfigSlice from './themeConfigSlice'
import { userSlice } from './userSlice'

const persistConfig = {
  key: 'root',
  storage,
  migrate: createMigrate(migrations, {
    debug: process.env.NEXT_PUBLIC_VERCEL_ENV === 'development',
  }),
}

const reducers = combineReducers({
  audioPlayerState: persistReducer(audioPlayerPersistConfig, audioPlayerState),
  history,
  user: userSlice.reducer,
  themeConfig: themeConfigSlice,
  readingTracker,
  sidebarNavigation,
  revelationOrder,
  readingPreferences,
  quranReaderStyles,
  translations,
  fontFaces,
  readingViewVerse,
  defaultSettings,
  navbar,
  tafsirs,
})

const persistedReducer = persistReducer(persistConfig, reducers)

const getStore = (locale: string) =>
  configureStore({
    reducer: persistedReducer,
    // @ts-ignore
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Used for Redux-persist, see:https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(DefaultSettingsMiddleware),
    devTools: process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production', // disables the devtools in production
    // @ts-ignore
    preloadedState: getStoreInitialState(locale),
  })

export default getStore

export type IRootState = ReturnType<typeof reducers>
