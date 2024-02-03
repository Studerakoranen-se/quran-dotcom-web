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

interface Props {
  chapterId: number
}
const PlayChapterAudioButton = ({ chapterId }: Props) => {
  // const chaptersData = useContext(DataContext)
  // const chapterData = getChapterData(chaptersData, chapterId.toString())

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

  return (
    <Box>
      {isPlayingCurrentChapter ? (
        <Button
          variant="text"
          // @ts-ignore
          color="text"
          size="medium"
          onClick={pause}
          sx={{
            color: (th) => (th.palette.mode === 'light' ? th.palette.text.primary : '#E0D2B4'),
            backgroundColor: 'transparent',
            '&:hover, &:focus-within': {
              backgroundColor: 'transparent',
            },
            paddingRight: {
              xs: '0px !important',
              md: '18px',
            },
          }}
          startIcon={<BsFillPauseFill />}
        >
          pausa ljud
        </Button>
      ) : (
        <Button
          variant="text"
          // @ts-ignore
          color="text"
          size="medium"
          onClick={play}
          startIcon={<BsPlayFill />}
          sx={{
            color: (th) => (th.palette.mode === 'light' ? th.palette.text.primary : '#E0D2B4'),
            backgroundColor: 'transparent',
            '&:hover, &:focus-within': {
              backgroundColor: 'transparent',
            },
            paddingRight: {
              xs: '0px !important',
              md: '18px',
            },
          }}

          // aria-label={t('aria.play-surah', { surahName: chapterData.transliteratedName })}
        >
          Spela upp ljud
        </Button>
      )}
    </Box>
  )
}

export default PlayChapterAudioButton
