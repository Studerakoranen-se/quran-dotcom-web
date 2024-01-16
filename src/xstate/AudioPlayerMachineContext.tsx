/* eslint-disable import/prefer-default-export */
import { ReactNode, createContext } from 'react'
import { InterpreterFrom } from 'xstate'
import { useInterpret } from '@xstate/react'
import { DEFAULT_RECITER } from '~/store/defaultSettings/defaultSettings'
import { audioPlayerMachine } from './actors/audioPlayer/audioPlayerMachine'
import {
  getXstateStateFromLocalStorage,
  persistXstateToLocalStorage,
} from './actors/audioPlayer/audioPlayerPersistHelper'

export const AudioPlayerMachineContext = createContext(
  {} as InterpreterFrom<typeof audioPlayerMachine>,
)

const LOCAL_STORAGE_PERSISTENCE_EVENT_TRIGGER = ['CHANGE_RECITER', 'SET_PLAYBACK_SPEED']

export const AudioPlayerMachineProvider = ({ children }: { children: ReactNode }) => {
  const initialXstateContext = getXstateStateFromLocalStorage()
  const defaultLocaleContext = {
    reciterId: DEFAULT_RECITER.id,
  }

  const audioPlayerService = useInterpret(
    audioPlayerMachine,
    {
      context: {
        ...audioPlayerMachine.initialState.context,
        ...defaultLocaleContext,
        ...initialXstateContext,
      },
    },
    (state) => {
      const { playbackRate, reciterId } = state.context
      if (state.matches('VISIBLE.FAILED')) {
        // eslint-disable-next-line no-console
        console.log('error.general', { status: 'error' })
      }

      if (LOCAL_STORAGE_PERSISTENCE_EVENT_TRIGGER.includes(state.event.type)) {
        persistXstateToLocalStorage({ playbackRate, reciterId })
      }
    },
  )

  return (
    <AudioPlayerMachineContext.Provider value={audioPlayerService}>
      {children}
    </AudioPlayerMachineContext.Provider>
  )
}
