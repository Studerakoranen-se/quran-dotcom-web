import { useContext } from 'react'
import { Button, IconButton, Tooltip } from '@mui/material'
import { withStopPropagation } from '~/utils/event'
import { logButtonClick } from '~/utils/eventLogger'
import { AudioPlayerMachineContext } from '~/xstate/AudioPlayerMachineContext'
import { CloseIcon } from '~/components/icons'
import { useI18n } from '~/contexts'

const CloseButton = () => {
  const audioService = useContext(AudioPlayerMachineContext)
  const { t } = useI18n()

  return (
    <Tooltip title={t('player').translate('close-audio-player')}>
      <IconButton
        aria-label={t('player').translate(`close-audio-player`)}
        onClick={withStopPropagation(() => {
          logButtonClick(`audio_player_overflow_menu_close`)
          audioService.send({ type: 'CLOSE' })
        })}
        // shouldFlipOnRTL={false}
      >
        <CloseIcon />
      </IconButton>
    </Tooltip>
  )
}

export default CloseButton
