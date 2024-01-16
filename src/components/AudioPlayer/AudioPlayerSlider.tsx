import React, { useContext } from 'react'
import { useSelector } from '@xstate/react'
import { useRouter } from 'next/router'
import { Box, styled } from '@mui/material'
import useDirection from '~/hooks/useDirection'
import { secondsFormatter } from '~/utils/datetime'
import { AudioPlayerMachineContext } from '~/xstate/AudioPlayerMachineContext'
import { logEvent } from '~/utils/eventLogger'
import Slider, { Direction, SliderVariant } from '~/components/Slider'

const AudioPlayerSliderRoot = styled('div')(({ theme }) => ({
  marginBlock: '0.375rem calc(-1 * 0.625rem)',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  minHeight: '0.75rem', // prevents CLS when the current/total time are not loaded yet
  transition: '0.4s',
  [theme.breakpoints.up('md')]: {
    minHeight: '1rem',
    marginBlock: '1rem calc(-2 * 0.875rem)',
  },
}))
const AudioPlayerSliderContainer = styled('div')(({ theme }) => ({
  display: 'inline-block',
  position: 'fixed',
  // stylelint-disable-next-line csstools/use-logical
  left: '50%',
  transform: 'translate(-50%, 0)',
  margin: 0,
  width: '100%',
  height: 'calc(1.25 * 0.375rem)',
  transition: '0.4s',
  insetBlockEnd: '3.5rem',

  [theme.breakpoints.up('md')]: {
    insetBlockEnd: '3rem',
  },
}))

const AudioPlayerSlider = (): JSX.Element => {
  const router = useRouter()
  const { locale } = router
  const direction = useDirection()

  const audioService = useContext(AudioPlayerMachineContext)
  const elapsed = useSelector(audioService, (state) => state.context.elapsed)
  const downloadProgress = useSelector(audioService, (state) => state.context.downloadProgress)
  const duration = useSelector(audioService, (state) => state.context.duration)

  return (
    <AudioPlayerSliderRoot>
      <Box
        component="span"
        sx={{
          display: 'inline-block',
          lineHeight: '1rem',
        }}
      >
        {secondsFormatter(elapsed, locale as string)}
      </Box>
      <AudioPlayerSliderContainer>
        <Slider
          showThumbs={false}
          variant={SliderVariant.Secondary}
          label="audio-player"
          value={[downloadProgress]}
          onValueChange={([newTimestamp]) => {
            logEvent('audio_player_slider_value_change')
            audioService.send({ type: 'SEEK_TO', timestamp: newTimestamp })
          }}
          max={duration}
          direction={direction as Direction}
          withBackground
        />
      </AudioPlayerSliderContainer>
      <AudioPlayerSliderContainer>
        <Slider
          label="audio-player"
          value={[elapsed]}
          onValueChange={([newTimestamp]) => {
            logEvent('audio_player_slider_value_change')
            audioService.send({ type: 'SEEK_TO', timestamp: newTimestamp })
          }}
          max={duration}
          direction={direction as Direction}
        />
      </AudioPlayerSliderContainer>
      <Box
        component="span"
        sx={{
          display: 'inline-block',
          lineHeight: '1rem',
        }}
      >
        {secondsFormatter(duration, locale as string)}
      </Box>
    </AudioPlayerSliderRoot>
  )
}

export default AudioPlayerSlider
