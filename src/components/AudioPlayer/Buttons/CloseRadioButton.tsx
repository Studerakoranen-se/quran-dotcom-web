import { useContext } from 'react'
import { Button } from '@mui/material'
import { withStopPropagation } from '~/utils/event'
import { logButtonClick } from '~/utils/eventLogger'
import { AudioPlayerMachineContext } from '~/xstate/AudioPlayerMachineContext'
import { CloseIcon } from '~/components/icons'

const CloseRadioButton = () => {
  const audioService = useContext(AudioPlayerMachineContext)
  return (
    <Button
      // tooltip={t('close')}
      // shape={ButtonShape.Circle}
      // variant={ButtonVariant.Ghost}
      onClick={withStopPropagation(() => {
        logButtonClick('radio_player_close')
        audioService.send('CLOSE_RADIO')
      })}
      // shouldFlipOnRTL={false}
    >
      <CloseIcon />
    </Button>
  )
}

export default CloseRadioButton
