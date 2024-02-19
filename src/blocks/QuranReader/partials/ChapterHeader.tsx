import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, IconButton } from '@mui/material'
import { FilterIcon, InfoIcon } from '~/components/icons'
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
      <Box
        justifyContent="space-between"
        alignItems="center"
        sx={{
          display: {
            xs: 'grid',
            sm: 'flex',
          },
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: {
            xs: '1fr 1fr',
            md: '1fr',
          },
        }}
      >
        <IconButton
          onClick={() => {
            dispatch(setIsVisible(true))
          }}
          sx={{
            gridRow: '2 / 2',
            gridColumn: '1',
            border: (th) => `1px solid ${th.vars.palette.divider}`,
            borderRadius: 1,
            p: 0.5,
            visibility: isSidebarNavigationVisible === true ? 'hidden' : 'visibile',
            width: '30px',
            height: '30px',
          }}
          aria-label={`Toggle Surah Drawer`}
          size="small"
        >
          <FilterIcon fontSize="small" />
        </IconButton>
        <Box
          sx={{
            gridRow: '1 / 2',
            gridColumn: '1 / -1',
            marginBlockEnd: {
              xs: 5,
              md: 0,
            },
          }}
        >
          <ChapterIconContainer chapterId={chapterId} size={ChapterIconsSize.Mega} hasSurahPrefix />
        </Box>
        <Box
          display="flex"
          sx={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 2,
            gridRow: '2 / 2',
            gridColumn: '3',
          }}
        >
          {translationName && (
            <Button
              variant="text"
              size="small"
              sx={{
                backgroundColor: 'transparent',
                '&:hover, &:focus-within': {
                  backgroundColor: 'transparent',
                },
                padding: 0,
              }}
              startIcon={<InfoIcon fontSize="small" />}
              onClick={() => {
                onSurahInfoDialogOpen?.()
                logButtonClick('chapter_header_info')
              }}
            >
              {t(__translationGroup)`Surah Info`}
            </Button>
          )}

          <PlayChapterAudioButton chapterId={Number(chapterId)} />
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
