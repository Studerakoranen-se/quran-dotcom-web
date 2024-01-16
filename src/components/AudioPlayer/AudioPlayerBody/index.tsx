import React, { useContext } from 'react'
import { Box, styled } from '@mui/material'
import { useSelector } from '@xstate/react'
import { AudioPlayerMachineContext } from '~/xstate/AudioPlayerMachineContext'
import AudioKeyBoardListeners from '../AudioKeyboardListeners'
import AudioPlayerSlider from '../AudioPlayerSlider'
import PlaybackControls from '../PlaybackControls'
import RadioPlaybackControl from '../RadioPlaybackControl'

const AudioPlayerBodyRoot = styled('div')(() => ({
  marginBlockStart: 'auto',
  marginInlineEnd: 'auto',
  marginBlockEnd: 'auto',
  marginInlineStart: 'auto',
  display: 'flex',
  paddingInlineStart: '0.625rem',
  paddingInlineEnd: '0.625rem',
}))

const AudioPlayerBody = () => {
  const audioService = useContext(AudioPlayerMachineContext)
  const isRadioMode = useSelector(audioService, (state) => !!state.context.radioActor)

  return (
    <React.Fragment>
      <AudioPlayerBodyRoot>
        <AudioKeyBoardListeners
          togglePlaying={() => audioService.send('TOGGLE')}
          isAudioPlayerHidden={false}
        />
        {!isRadioMode && (
          <Box width="100%">
            <AudioPlayerSlider />
          </Box>
        )}
      </AudioPlayerBodyRoot>
      {isRadioMode ? (
        <RadioPlaybackControl radioActor={audioService.getSnapshot().context.radioActor} />
      ) : (
        <PlaybackControls />
      )}
    </React.Fragment>
  )
}

export default AudioPlayerBody
