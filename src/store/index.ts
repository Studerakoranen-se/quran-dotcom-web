import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer, createMigrate } from 'redux-persist'
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

const persistConfig = {
  key: 'root',
  storage,
  migrate: createMigrate(migrations, {
    debug: process.env.NEXT_PUBLIC_VERCEL_ENV === 'development',
  }),
}

const reducers = combineReducers({
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
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store

export type IRootState = ReturnType<typeof reducers>
