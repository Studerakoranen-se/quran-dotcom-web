import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, ButtonBase, IconButton } from '@mui/material'
// import { BsFillPauseFill, BsGear } from 'react-icons/bs'
import { Bismillah as BismillahIcon, FilterIcon, InfoIcon } from '~/components/icons'
import ChapterIconContainer, {
  ChapterIconsSize,
} from '~/components/ChapterIcon/partials/ChapterIconContainer'
import useIntersectionObserver from '~/hooks/useObserveElement'
import { setIsSettingsDrawerOpen, setSettingsView, SettingsView } from '~/store/slices/navbar'
import { useGlobalHandlers, useI18n } from '~/contexts'
// import { getSurahInfoNavigationUrl } from '~/utils'
import { PlayChapterAudioButton } from '~/components'
import { logButtonClick } from '~/utils/eventLogger'
import {
  selectIsSidebarNavigationVisible,
  setIsVisible,
} from '~/store/slices/QuranReader/sidebarNavigation'

type ChapterHeaderProps = {
  chapterId: string
  pageNumber: number
  hizbNumber: number
  translationName?: string
  isTranslationSelected?: boolean
}

const CHAPTERS_WITHOUT_BISMILLAH = ['1', '9']

function ChapterHeader(props: ChapterHeaderProps) {
  const { chapterId, pageNumber, hizbNumber, translationName, isTranslationSelected } = props

  const dispatch = useDispatch()
  const isSidebarNavigationVisible = useSelector(selectIsSidebarNavigationVisible)

  const { t } = useI18n()
  // @ts-ignore
  const { onSurahInfoDialogOpen } = useGlobalHandlers()

  const headerRef = React.useRef(null)
  /**
   * the intersection observer is needed so that we know that the first verse
   * of the current chapter is being read when the ChapterHeader appears within
   * the intersection observer root's borders.
   */
  useIntersectionObserver(headerRef, 'quranReaderObserver')

  // TODO: add translationName change functionality
  const onChangeTranslationClicked = () => {
    dispatch(setIsSettingsDrawerOpen(true))
    dispatch(setSettingsView(SettingsView.Translation))
    logButtonClick('change_translation')
  }

  return (
    <Box
      ref={headerRef}
      data-verse-key={`${chapterId}:1`}
      data-page={pageNumber}
      data-chapter-id={chapterId}
      data-hizb={hizbNumber}
      sx={{
        textAlign: 'center',
        ...(!CHAPTERS_WITHOUT_BISMILLAH.includes(chapterId) && {
          mt: 4,
        }),
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <IconButton
          onClick={() => {
            dispatch(setIsVisible(true))
          }}
          sx={{
            border: (th) => `1px solid ${th.vars.palette.divider}`,
            color: (th) => (th.palette.mode === 'light' ? th.palette.text.primary : '#E0D2B4'),
            borderRadius: 1,
            p: 0.5,
            visibility: isSidebarNavigationVisible === true ? 'hidden' : 'visibile',
          }}
          aria-label={`Toggle Surah Drawer`}
          size="small"
        >
          <FilterIcon fontSize="small" />
        </IconButton>
        <Box>
          <ChapterIconContainer chapterId={chapterId} size={ChapterIconsSize.Mega} hasSurahPrefix />
        </Box>
        <Box
          display="flex"
          sx={{
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            alignItems: {
              xs: 'flex-end',
              md: 'center',
            },
          }}
        >
          <PlayChapterAudioButton chapterId={Number(chapterId)} />
          {translationName && (
            <IconButton
              size="small"
              // href={getSurahInfoNavigationUrl(chapterId)}
              onClick={() => {
                onSurahInfoDialogOpen?.()
                logButtonClick('chapter_header_info')
              }}
            >
              {/* {t('quran-reader:surah-info')} */}
              <InfoIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* <div>
        {!CHAPTERS_WITHOUT_BISMILLAH.includes(chapterId) && (
          <BismillahIcon
            sx={{
              width: '220px',
              height: '45px',
            }}
          />
        )}
      </div> */}
    </Box>
  )
}

export default ChapterHeader
