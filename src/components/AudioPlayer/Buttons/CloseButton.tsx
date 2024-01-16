import { useContext } from 'react'
import { Button, IconButton } from '@mui/material'
import { withStopPropagation } from '~/utils/event'
import { logButtonClick } from '~/utils/eventLogger'
import { AudioPlayerMachineContext } from '~/xstate/AudioPlayerMachineContext'
import { CloseIcon } from '~/components/icons'

const CloseButton = () => {
  const audioService = useContext(AudioPlayerMachineContext)
  return (
    <IconButton
      // tooltip={t('audio.player.close-audio-player')}
      // shape={ButtonShape.Circle}
      // variant={ButtonVariant.Ghost}
      onClick={withStopPropagation(() => {
        logButtonClick(`audio_player_overflow_menu_close`)
        audioService.send({ type: 'CLOSE' })
      })}
      // shouldFlipOnRTL={false}
    >
      <CloseIcon />
    </IconButton>
  )
}

export default CloseButton
