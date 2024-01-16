import { useContext } from 'react'
import { useSelector } from '@xstate/react'
import { CircularProgress, IconButton, Tooltip } from '@mui/material'
import { withStopPropagation } from '~/utils/event'
import { selectIsLoading } from '~/xstate/actors/audioPlayer/selectors'
import { AudioPlayerMachineContext } from '~/xstate/AudioPlayerMachineContext'
import { PauseIcon, PlayIcon } from '~/components/icons'
import { logButtonClick } from '~/utils/eventLogger'

const PlayPauseButton = () => {
  const audioService = useContext(AudioPlayerMachineContext)

  const isPlaying = useSelector(audioService, (state) =>
    state.matches('VISIBLE.AUDIO_PLAYER_INITIATED.PLAYING'),
  )
  const isLoading = useSelector(audioService, selectIsLoading)

  if (isLoading) {
    return (
      <Tooltip
        title="Loading"
        // tooltip={`${t('loading')}...`}
      >
        <IconButton disabled={isLoading}>
          <CircularProgress size="large" />
        </IconButton>
      </Tooltip>
    )
  }
  if (isPlaying) {
    return (
      <Tooltip title="audio.player.pause">
        <IconButton
          disabled={isLoading}
          onClick={withStopPropagation(() => {
            logButtonClick('audio_player_pause')
            audioService?.send('TOGGLE')
          })}
        >
          <PauseIcon />
        </IconButton>
      </Tooltip>
    )
  }
  return (
    <Tooltip title="audio.player.play">
      <IconButton
        onClick={withStopPropagation(() => {
          logButtonClick('audio_player_play')
          audioService.send('TOGGLE')
        })}
      >
        <PlayIcon />
      </IconButton>
    </Tooltip>
  )
}

export default PlayPauseButton
