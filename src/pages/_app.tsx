import '../styles/globals.css'
// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'
import '../styles/tailwind.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { appWithI18Next } from 'ni18n'
// @ts-ignore
import { ni18nConfig } from 'ni18n.config.ts'
import store from '../store'

function App({ Component, pageProps }: AppProps) {
  const persistor = persistStore(store)
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {() => <Component {...pageProps} />}
      </PersistGate>
    </Provider>
  )
}

export default appWithI18Next(App, ni18nConfig)
