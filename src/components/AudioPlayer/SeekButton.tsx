import { useContext, useMemo } from 'react'
import { IconButton } from '@mui/material'
import { useSelector } from '@xstate/react'
import { getChapterData } from '~/utils/chapter'
import DataContext from '~/contexts/DataContext'
import { AudioPlayerMachineContext } from '~/xstate/AudioPlayerMachineContext'
import { ArrowNextIcon, ArrowPrevIcon } from '../icons'

export enum SeekButtonType {
  NextAyah = 'nextAyah',
  PrevAyah = 'prevAyah',
}

type SeekButtonProps = {
  type: SeekButtonType
  isLoading: boolean
}
const SeekButton = ({ type, isLoading }: SeekButtonProps) => {
  const audioService = useContext(AudioPlayerMachineContext)
  const chaptersData = useContext(DataContext)

  const surah = useSelector(audioService, (state) => state.context.surah)
  const ayahNumber = useSelector(audioService, (state) => state.context.ayahNumber)

  const chapterData = useMemo(
    // @ts-ignore
    () => getChapterData(chaptersData, surah?.toString()),
    [chaptersData, surah],
  )

  const onSeek = () => {
    // logButtonClick(`audio_player_${type}`);
    audioService.send({ type: type === SeekButtonType.NextAyah ? 'NEXT_AYAH' : 'PREV_AYAH' })
  }

  const isDisabled =
    isLoading ||
    (type === SeekButtonType.PrevAyah && ayahNumber <= 1) ||
    (type === SeekButtonType.NextAyah && ayahNumber >= chapterData?.versesCount)

  return (
    <IconButton
      // tooltip={type === SeekButtonType.PrevAyah ? 'Previous Ayah' : 'Next Ayah'}
      onClick={onSeek}
      disabled={isDisabled}
    >
      {type === SeekButtonType.PrevAyah ? (
        <ArrowNextIcon sx={{ transform: 'rotate(180deg)' }} />
      ) : (
        <ArrowNextIcon />
      )}
    </IconButton>
  )
}

export default SeekButton
