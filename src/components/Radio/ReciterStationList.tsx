import { useContext, Fragment } from 'react'
import { useSelector } from '@xstate/react'
import { AudioPlayerMachineContext } from '~/xstate/AudioPlayerMachineContext'
import Reciter from '~/types/Reciter'
import { PauseIcon, PlayIcon } from '../icons'
import { StationType } from './types'
import styles from './ReciterStationList.module.scss'

type ReciterStationListProps = {
  reciters: Reciter[]
}
const ReciterStationList = ({ reciters }: ReciterStationListProps) => {
  const audioService = useContext(AudioPlayerMachineContext)
  const isAudioPlaying = useSelector(audioService, (state) =>
    state.matches('VISIBLE.AUDIO_PLAYER_INITIATED.PLAYING'),
  )

  const radioActor = useSelector(audioService, (state) => state.context.radioActor)
  const radioContext = radioActor?.getSnapshot()?.context || {}

  return (
    <div className={styles.container}>
      {reciters.map((reciter) => {
        const isSelectedStation =
          radioContext.type === StationType.Reciter && Number(radioContext.id) === reciter.id

        let onClick
        if (!isSelectedStation) {
          onClick = () => {
            audioService.send({
              type: 'PLAY_RADIO',
              stationType: StationType.Reciter,
              stationId: reciter.id,
            })
          }
        }
        if (isSelectedStation) {
          onClick = () => audioService.send('TOGGLE')
        }

        const actionIcon = isSelectedStation && isAudioPlaying ? <PauseIcon /> : <PlayIcon />
        return <Fragment>ReciterStationList</Fragment>
      })}
    </div>
  )
}

export default ReciterStationList
