// @ts-nocheck
import React, { useContext, useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import { CircularProgress, styled } from '@mui/material'
import dynamic from 'next/dynamic'
import { milliSecondsToSeconds } from '~/utils/datetime'
import { AudioPlayerMachineContext } from '~/xstate/AudioPlayerMachineContext'

const SpinnerRoot = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
}))

const AudioPlayerBody = dynamic(() => import('./AudioPlayerBody'), {
  ssr: false,
  loading: () => (
    <SpinnerRoot>
      <CircularProgress />
    </SpinnerRoot>
  ),
})

const AudioPlayerRoot = styled('div')(({ theme }) => ({
  position: 'fixed',
  opacity: 1,
  width: '100%',
  insetBlockEnd: 0,
  textAlign: 'center',
  background: theme.vars.palette.background.default,
  transition: '0.4s',
  zIndex: 300,
  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.12)',
  borderBlockStart: '1px solid rgb(235, 238, 240)',
  height: '3.5rem',
  willChange: 'transform',

  [theme.breakpoints.up('md')]: {
    height: '3rem',
  },
}))

/**
 * Buffering when 2s away from download progress
 * and put the audio in `almostEnded` state when 2s away from ending
 */
const AUDIO_DURATION_TOLERANCE = 2 // 2s ,

const getAudioPlayerDownloadProgress = (audioPlayer: HTMLAudioElement) => {
  // TODO: Technically this is not accurate, but it's close enough for now.
  /**
   * There can be actually multiple time ranges. For example
   * ------------------------------------------------------
   * |=============|                    |===========|     |
   * ------------------------------------------------------
   * 0             5                    15          19    21
   *
   * But here, we're only taking the latest timestamp
   *
   * Reference: https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/buffering_seeking_time_ranges
   */
  if (audioPlayer.buffered && audioPlayer.buffered.length) {
    const lastIndex = audioPlayer.buffered.length - 1
    const timestamp = audioPlayer.buffered.end(lastIndex)
    return timestamp
  }
  return 0
}

const AudioPlayer = () => {
  const audioPlayerRef = useRef<HTMLAudioElement>()
  const audioService = useContext(AudioPlayerMachineContext)
  const isVisible = useSelector(audioService, (state) => state.matches('VISIBLE'))

  useEffect(() => {
    // @ts-ignore
    window.audioPlayerEl = audioPlayerRef.current
    // @ts-ignore
    audioService.send({ type: 'SET_AUDIO_REF', audioPlayerRef: audioPlayerRef.current })
  }, [audioService])

  const onCanPlay = () => {
    audioService.send({ type: 'CAN_PLAY' })
  }

  const onTimeUpdate = (e) => {
    const isLoading = audioService.state.hasTag('loading')

    const audioPlayer: HTMLAudioElement = e.target
    const currentTimestamp = audioPlayer.currentTime
    const downloadProgress = getAudioPlayerDownloadProgress(audioPlayer)
    const isWaiting = currentTimestamp > downloadProgress - AUDIO_DURATION_TOLERANCE

    const audioDataDuration = audioService.getSnapshot().context?.audioData?.duration
    if (audioDataDuration) {
      const isAlmostEnded =
        currentTimestamp > milliSecondsToSeconds(audioDataDuration) - AUDIO_DURATION_TOLERANCE

      /**
       * simulate onWaiting event on safari.
       * If the audio is not in loading state already. And `currentTime` is nearby last timestamp of `buffered`
       * trigger WAITING event.
       */

      if (!isLoading && isWaiting && !isAlmostEnded) {
        audioService.send({ type: 'WAITING' })
      } else if (isLoading && !isWaiting) {
        audioService.send({ type: 'CAN_PLAY' })
      }
    }

    audioService.send({ type: 'UPDATE_TIMING' })
  }

  const onError = () => {
    audioService.send({
      type: 'FAIL',
    })
  }

  const onEnded = () => {
    audioService.send({
      type: 'END',
    })
  }

  const onSeeking = () => {
    audioService.send({
      type: 'SEEKING',
    })
  }

  const onSeeked = () => {
    audioService.send({
      type: 'SEEKED',
    })
  }

  const onPlay = () => {
    audioService.send({ type: 'PLAY' })
  }

  const onPause = () => {
    audioService.send({ type: 'PAUSE' })
  }

  const onProgress = (e) => {
    audioService.send({ type: 'PROGRESS', timestamp: getAudioPlayerDownloadProgress(e.target) })
  }

  return (
    <AudioPlayerRoot
      sx={{
        ...(!isVisible && {
          display: 'none',
        }),
      }}
    >
      {/* We have to create an inline audio player and hide it due to limitations of how safari requires a play action to trigger: https://stackoverflow.com/questions/31776548/why-cant-javascript-play-audio-files-on-iphone-safari */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio
        style={{ display: 'none' }}
        id="audio-player"
        // @ts-ignore
        ref={audioPlayerRef}
        autoPlay
        preload="auto"
        onCanPlay={onCanPlay}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        onSeeking={onSeeking}
        onSeeked={onSeeked}
        onError={onError}
        onPlay={onPlay}
        onPause={onPause}
        onProgress={onProgress}
      />
      {isVisible && <AudioPlayerBody />}
    </AudioPlayerRoot>
  )
}

export default AudioPlayer
