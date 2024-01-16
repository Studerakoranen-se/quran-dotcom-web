import { useContext } from 'react'
import { useSelector } from '@xstate/react'
import { styled } from '@mui/material'
import { selectIsLoading } from '~/xstate/actors/audioPlayer/selectors'
import { AudioPlayerMachineContext } from '~/xstate/AudioPlayerMachineContext'
import CloseButton from './Buttons/CloseButton'
import PlayPauseButton from './Buttons/PlayPauseButton'
import SeekButton, { SeekButtonType } from './SeekButton'

const PlaybackControlsRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

const PlaybackControls = () => {
  const audioService = useContext(AudioPlayerMachineContext)
  const isLoading = useSelector(audioService, selectIsLoading)

  return (
    <PlaybackControlsRoot>
      <SeekButton type={SeekButtonType.PrevAyah} isLoading={isLoading} />
      <PlayPauseButton />
      <SeekButton type={SeekButtonType.NextAyah} isLoading={isLoading} />
      <CloseButton />
    </PlaybackControlsRoot>
  )
}

export default PlaybackControls
