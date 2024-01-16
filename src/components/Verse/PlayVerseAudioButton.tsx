import React, { useContext } from 'react'
import { useSelector as useXstateSelector } from '@xstate/react'
import { Button, CircularProgress, Icon, IconButton, Tooltip } from '@mui/material'
import useGetQueryParamOrXstateValue from '~/hooks/useGetQueryParamOrXstateValue'
import QueryParam from '~/types/QueryParam'
import { getChapterData } from '~/utils/chapter'
import { getChapterNumberFromKey, getVerseNumberFromKey } from '~/utils/verse'
import DataContext from '~/contexts/DataContext'
import { selectIsVerseLoading } from '~/xstate/actors/audioPlayer/selectors'
import { AudioPlayerMachineContext } from '~/xstate/AudioPlayerMachineContext'
import { logButtonClick } from '~/utils/eventLogger'
import { PlayIcon } from '../icons'

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

  const onPlayClicked = () => {
    logButtonClick(`${isTranslationView ? 'translation_view' : 'reading_view'}_play_verse`)

    audioService.send({
      type: 'PLAY_AYAH',
      surah: chapterId,
      ayahNumber: verseNumber,
      reciterId: reciterQueryParamDifferent ? reciterId : undefined,
    })

    if (onActionTriggered) {
      onActionTriggered()
    }
  }

  if (isVerseLoading) {
    return (
      <Button size="small" variant="outlined" color="success">
        <CircularProgress />
      </Button>
    )
  }

  return (
    <Tooltip
      // tooltip={t('audio.player.play')}
      title="audio.player.play"
    >
      <IconButton
        size="small"
        sx={{
          '&:hover': {
            backgroundColor: 'divider',
            borderRadius: 1,
            opacity: 1,
          },
          // ...(isTranslationView && {
          //   opacity: 0.5,
          // }),
        }}
        onClick={onPlayClicked}
        aria-label="aria.play-surah"
        // aria-label={t('aria.play-surah', { surahName: chapterData.transliteratedName })}
      >
        <PlayIcon />
      </IconButton>
    </Tooltip>
  )
}
export default PlayVerseAudioButton
