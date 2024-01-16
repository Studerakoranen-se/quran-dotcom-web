import { useActor } from '@xstate/react'
import useCurrentStationInfo from '~/xstate/Radio/useCurrentStationInfo'
import CloseRadioButton from './Buttons/CloseRadioButton'
import PlayPauseButton from './Buttons/PlayPauseButton'
import styles from './RadioPlaybackControl.module.scss'

// eslint-disable-next-line react/prop-types
const RadioPlaybackControl = ({ radioActor }) => {
  const [radioService] = useActor(radioActor)
  const stationInfo = useCurrentStationInfo((radioService as any).context)
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.title}>{stationInfo.title}</div>
        <div className={styles.description}>{stationInfo.description}</div>
      </div>
      <div className={styles.actions}>
        <PlayPauseButton />
        <CloseRadioButton />
      </div>
    </div>
  )
}

export default RadioPlaybackControl
