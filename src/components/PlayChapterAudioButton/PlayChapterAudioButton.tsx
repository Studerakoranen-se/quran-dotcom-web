import { useContext } from 'react'
import { BsFillPauseFill, BsPlayFill } from 'react-icons/bs'
import { Box, Button, CircularProgress } from '@mui/material'
import { useSelector } from '@xstate/react'
import useGetQueryParamOrXstateValue from '~/hooks/useGetQueryParamOrXstateValue'
import QueryParam from '~/types/QueryParam'
// import { getChapterData } from '~/utils/chapter'
// import DataContext from '~/contexts/DataContext'
import {
  selectIsLoadingCurrentChapter,
  selectIsPlayingCurrentChapter,
} from '~/xstate/actors/audioPlayer/selectors'
import { AudioPlayerMachineContext } from '~/xstate/AudioPlayerMachineContext'
import { logButtonClick } from '~/utils/eventLogger'
import { useI18n } from '~/contexts'
import DataContext from '~/contexts/DataContext'
import { getChapterData } from '~/utils'

interface Props {
  chapterId: number
}
const PlayChapterAudioButton = ({ chapterId }: Props) => {
  const chaptersData = useContext(DataContext)
  const chapterData = getChapterData(chaptersData, chapterId.toString())

  const { t } = useI18n()

  const audioService = useContext(AudioPlayerMachineContext)

  const isLoadingCurrentChapter = useSelector(audioService, (state) =>
    selectIsLoadingCurrentChapter(state, chapterId),
  )

  const isPlayingCurrentChapter = useSelector(audioService, (state) =>
    selectIsPlayingCurrentChapter(state, chapterId),
  )

  const {
    value: reciterId,
    isQueryParamDifferent: reciterQueryParamDifferent,
  }: { value: number; isQueryParamDifferent: boolean } = useGetQueryParamOrXstateValue(
    QueryParam.Reciter,
  )

  const play = () => {
    logButtonClick('chapter_header_play_audio')
    audioService.send({
      type: 'PLAY_SURAH',
      surah: chapterId,
      reciterId: reciterQueryParamDifferent ? reciterId : undefined,
    })
  }

  const pause = () => {
    logButtonClick('chapter_header_pause_audio')
    audioService.send({
      type: 'TOGGLE',
    })
  }

  if (isLoadingCurrentChapter) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button color="success" size="small" startIcon={<CircularProgress />} disabled>
          loading
        </Button>
      </Box>
    )
  }

  return isPlayingCurrentChapter ? (
    <Button
      variant="text"
      size="small"
      onClick={pause}
      sx={{
        backgroundColor: 'transparent',
        '&:hover, &:focus-within': {
          backgroundColor: 'transparent',
        },
        padding: 0,
      }}
      startIcon={<BsFillPauseFill />}
      aria-label={t('aria').translate(`pause-surah`, { value: chapterData.transliteratedName })}
    >
      {t('player').translate('pause-audio')}
    </Button>
  ) : (
    <Button
      variant="text"
      size="small"
      onClick={play}
      startIcon={<BsPlayFill />}
      sx={{
        backgroundColor: 'transparent',
        '&:hover, &:focus-within': {
          backgroundColor: 'transparent',
        },
        padding: 0,
      }}
      aria-label={t('aria').translate(`play-surah`, { value: chapterData.transliteratedName })}
    >
      {t('player').translate('play-audio')}
    </Button>
  )
}

export default PlayChapterAudioButton
