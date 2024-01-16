import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import {
  persistReducer,
  createMigrate,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import audioPlayerPersistConfig from './slices/AudioPlayer/persistConfig'
import audioPlayerState from './slices/AudioPlayer/state'
import navbar from './slices/navbar'
import readingTracker from './slices/QuranReader/readingTracker'
import sidebarNavigation from './slices/QuranReader/sidebarNavigation'
import readingPreferences from './slices/QuranReader/readingPreferences'
import quranReaderStyles from './slices/QuranReader/styles'
import translations from './slices/QuranReader/translations'
import fontFaces from './slices/QuranReader/font-faces'
import readingViewVerse from './slices/QuranReader/readingViewVerse'
import revelationOrder from './slices/revelationOrder'
import defaultSettings from './slices/defaultSettings'
import history from './historySlice'
import { userSlice } from './userSlice'
import themeConfigSlice from './themeConfigSlice'
import migrations from './migrations'
import DefaultSettingsMiddleware from './middleware/defaultSettingsMiddleware'
import { getStoreInitialState } from './defaultSettings/util'

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
