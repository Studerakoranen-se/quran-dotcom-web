import { configureStore } from "@reduxjs/toolkit";
import historySlice from "./historySlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import themeConfigSlice from "./themeConfigSlice";
import userSlice from "./userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  history: historySlice.reducer,
  user: userSlice.reducer,
  themeConfig: themeConfigSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type IRootState = ReturnType<typeof reducers>;
