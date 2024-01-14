import * as React from 'react'
import Router from 'next/router'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { AudioPlayerMachineContext } from '~/xstate/AudioPlayerMachineContext'
import getStore from '~/store'
import syncUserPreferences from '~/store/actions/sync-user-preferences'
import PreferenceGroup from '~/types/auth/PreferenceGroup'
import { getUserPreferences } from '~/utils/auth/api'
import { setLocaleCookie } from '~/utils/cookies'
import isClient from '~/utils/isClient'

interface ReduxProviderProps {
  children: React.ReactNode
  locale: string
}

/**
 * A wrapper around the Provider component to skip rendering <PersistGate />
 * on the server. PersistGate prevents children from rendering until the persisted
 * state is retrieved from localstorage, this results in an empty DOM for SSR and SSG.
 * For more info: https://github.com/rt2zz/redux-persist/issues/1008
 *
 * @param {any} props
 * @returns {Provider}
 */
const ReduxProvider = ({ children, locale }: ReduxProviderProps) => {
  const store = React.useMemo(() => getStore(locale), [locale])
  const persistor = React.useMemo(() => persistStore(store), [store])
  const audioService = React.useContext(AudioPlayerMachineContext)

  /**
   * Before the Gate lifts, we want to get the user preferences
   * then store in Redux so that they can be used.
   */
  const onBeforeLift = async () => {
    if (isClient) {
      try {
        const userPreferences = await getUserPreferences()
        const remoteLocale = userPreferences[PreferenceGroup.LANGUAGE]
        if (remoteLocale) {
          await Router.push(
            {
              pathname: Router.pathname,
              query: Router.query,
            },
            Router.asPath,
            { locale, scroll: true },
          )
          setLocaleCookie(remoteLocale[PreferenceGroup.LANGUAGE])
        }
        store.dispatch(syncUserPreferences(userPreferences, locale))
        const playbackRate =
          userPreferences[PreferenceGroup.AUDIO]?.playbackRate ||
          audioService.getSnapshot().context.playbackRate
        const reciterId =
          userPreferences[PreferenceGroup.AUDIO]?.reciter ||
          audioService.getSnapshot().context.reciterId
        audioService.send({ type: 'SET_INITIAL_CONTEXT', playbackRate, reciterId })
        // eslint-disable-next-line no-empty
      } catch (error) {}
    }
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} onBeforeLift={onBeforeLift}>
        {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
        {() => <React.Fragment>{children}</React.Fragment>}
      </PersistGate>
    </Provider>
  )
}

export default ReduxProvider
