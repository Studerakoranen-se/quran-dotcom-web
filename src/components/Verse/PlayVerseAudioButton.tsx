import { CircularProgress, IconButton, Tooltip } from '@mui/material'
import { useSelector as useXstateSelector } from '@xstate/react'
import React, { useContext } from 'react'
import { useI18n } from '~/contexts'
import DataContext from '~/contexts/DataContext'
import useGetQueryParamOrXstateValue from '~/hooks/useGetQueryParamOrXstateValue'
import QueryParam from '~/types/QueryParam'
import { getChapterData } from '~/utils'
import { logButtonClick } from '~/utils/eventLogger'
import { getChapterNumberFromKey, getVerseNumberFromKey } from '~/utils/verse'
import { selectIsVerseLoading } from '~/xstate/actors/audioPlayer/selectors'
import { AudioPlayerMachineContext } from '~/xstate/AudioPlayerMachineContext'
import { PauseIcon, PlayIcon } from '../icons'

interface PlayVerseAudioProps {
  verseKey: string
  // eslint-disable-next-line react/no-unused-prop-types
  timestamp?: number
  isTranslationView?: boolean
  onActionTriggered?: () => void
}
const PlayVerseAudioButton: React.FC<PlayVerseAudioProps> = ({
  verseKey,
  isTranslationView = true,
  onActionTriggered,
}) => {
  const { t } = useI18n()
  const audioService = useContext(AudioPlayerMachineContext)
  const {
    value: reciterId,
    isQueryParamDifferent: reciterQueryParamDifferent,
  }: { value: number; isQueryParamDifferent: boolean } = useGetQueryParamOrXstateValue(
    QueryParam.Reciter,
  )

  const isVerseLoading = useXstateSelector(audioService, (state) =>
    selectIsVerseLoading(state, verseKey),
  )
  const chapterId = getChapterNumberFromKey(verseKey)
  const verseNumber = getVerseNumberFromKey(verseKey)
  const chaptersData = useContext(DataContext)
  const chapterData = getChapterData(chaptersData, chapterId.toString())

  // Check if this specific verse is currently playing
  const isThisVersePlaying = useXstateSelector(audioService, (state) => {
    const { surah, ayahNumber } = state.context
    const isPlaying = state.matches('VISIBLE.AUDIO_PLAYER_INITIATED.PLAYING')
    return isPlaying && surah === chapterId && ayahNumber === verseNumber
  })

  // Check if audio player is currently playing (any verse)
  const isAudioPlaying = useXstateSelector(audioService, (state) =>
    state.matches('VISIBLE.AUDIO_PLAYER_INITIATED.PLAYING'),
  )

  const onPlayClicked = () => {
    if (isThisVersePlaying) {
      // If this verse is currently playing, toggle (pause) it
      logButtonClick(`${isTranslationView ? 'translation_view' : 'reading_view'}_pause_verse`)
      audioService.send({ type: 'TOGGLE' })
    } else {
      // If this verse is not playing, play it (or switch to it if another verse is playing)
      logButtonClick(`${isTranslationView ? 'translation_view' : 'reading_view'}_play_verse`)
      audioService.send({
        type: 'PLAY_AYAH',
        surah: chapterId,
        ayahNumber: verseNumber,
        reciterId: reciterQueryParamDifferent ? reciterId : undefined,
      })
    }

    if (onActionTriggered) {
      onActionTriggered()
    }
  }

  if (isVerseLoading) {
    return (
      <Tooltip title="Loading">
        <IconButton size="small" disabled>
          <CircularProgress size="small" />
        </IconButton>
      </Tooltip>
    )
  }

  const isShowingPauseIcon = isThisVersePlaying
  const tooltipText = isShowingPauseIcon
    ? t('player').translate('pause')
    : t('player').translate('play-audio')
  const ariaLabel = isShowingPauseIcon
    ? `${t('player').translate('pause')} ${chapterData.transliteratedName}`
    : t('aria').translate(`play-surah`, { value: chapterData.transliteratedName })

  return (
    <Tooltip title={tooltipText}>
      <IconButton
        size="small"
        sx={{
          '&:hover': {
            backgroundColor: 'divider',
            borderRadius: 1,
            opacity: 1,
          },
          ...(isThisVersePlaying && {
            color: 'primary.main',
          }),
        }}
        onClick={onPlayClicked}
        aria-label={ariaLabel}
      >
        {isShowingPauseIcon ? <PauseIcon /> : <PlayIcon />}
      </IconButton>
    </Tooltip>
  )
}
export default PlayVerseAudioButton
