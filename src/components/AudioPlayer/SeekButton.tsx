import { useContext, useMemo } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { useSelector } from '@xstate/react'
import { getChapterData } from '~/utils/chapter'
import DataContext from '~/contexts/DataContext'
import { AudioPlayerMachineContext } from '~/xstate/AudioPlayerMachineContext'
import { useI18n } from '~/contexts'
import { ArrowNextIcon } from '../icons'

export enum SeekButtonType {
  NextAyah = 'nextAyah',
  PrevAyah = 'prevAyah',
}

type SeekButtonProps = {
  type: SeekButtonType
  isLoading: boolean
}
const SeekButton = ({ type, isLoading }: SeekButtonProps) => {
  const { t } = useI18n()

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
    <Tooltip
      title={
        type === SeekButtonType.PrevAyah
          ? t('player').translate('previous-ayah')
          : t('player').translate('next-ayah')
      }
    >
      <IconButton
        aria-label={
          type === SeekButtonType.PrevAyah
            ? t('player').translate('previous-ayah')
            : t('player').translate('next-ayah')
        }
        onClick={onSeek}
        disabled={isDisabled}
      >
        {type === SeekButtonType.PrevAyah ? (
          <ArrowNextIcon sx={{ transform: 'rotate(180deg)' }} />
        ) : (
          <ArrowNextIcon />
        )}
      </IconButton>
    </Tooltip>
  )
}

export default SeekButton
