import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Box, ButtonBase, IconButton } from '@mui/material'
// import { BsFillPauseFill, BsGear } from 'react-icons/bs'
import { Bismillah as BismillahIcon, InfoIcon } from '~/components/icons'
import ChapterIconContainer, {
  ChapterIconsSize,
} from '~/components/ChapterIcon/partials/ChapterIconContainer'
import useIntersectionObserver from '~/hooks/useObserveElement'
import { setIsSettingsDrawerOpen, setSettingsView, SettingsView } from '~/store/slices/navbar'
import { useGlobalHandlers, useI18n } from '~/contexts'
// import { getSurahInfoNavigationUrl } from '~/utils'
import { PlayChapterAudioButton } from '~/components'
import { logButtonClick } from '~/utils/eventLogger'

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
      <div>
        <div>
          <ChapterIconContainer chapterId={chapterId} size={ChapterIconsSize.Mega} hasSurahPrefix />
        </div>
      </div>

      <div>
        {!CHAPTERS_WITHOUT_BISMILLAH.includes(chapterId) && (
          <BismillahIcon
            sx={{
              width: '220px',
              height: '45px',
            }}
          />
        )}
      </div>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBlockStart: '0.375rem',
          marginBlockEnd: '0.375rem',
          marginInlineStart: 0,
          marginInlineEnd: 0,
          paddingBlockStart: '0.375rem',
          paddingBlockEnd: '0.375rem',
          paddingInlineStart: 0,
          paddingInlineEnd: 0,
          position: 'relative',
          direction: 'ltr',
        }}
      >
        <Box
          className="left"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'start',
            justifyContent: 'space-between',
            paddingTop: {
              xs: '0.5rem',
              md: 0,
            },
          }}
        >
          <Box className="infoContainer">
            {translationName ? (
              <Box className="translation">
                {isTranslationSelected && (
                  <Box className="translationBy">{t(__translationGroup)`Translation by`}</Box>
                )}
                <span>{translationName}</span>{' '}
                <ButtonBase
                  onKeyPress={onChangeTranslationClicked}
                  tabIndex={0}
                  role="button"
                  onClick={onChangeTranslationClicked}
                  className="changeTranslation"
                >
                  trans change
                </ButtonBase>
                <span className="changeTranslation" />
              </Box>
            ) : (
              <span
              // size={ButtonSize.Small}
              // variant={ButtonVariant.Ghost}
              // startIcon={<InfoIcon />}
              // href={getSurahInfoNavigationUrl(chapterId)}
              // shouldPrefetch={false}
              // hasSidePadding={false}
              // onClick={() => {
              //   console.log('chapter_header_info');
              // }}
              >
                Surah Info
              </span>
            )}
          </Box>
        </Box>
        <Box
          className="right"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'start',
            justifyContent: 'space-between',
          }}
        >
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
            {/* <IconButton
              aria-label={`Change Settings`}
              size="small"
              sx={{
                border: (th) => `1px solid ${th.vars.palette.divider}`,
                color: (th) => (th.palette.mode === 'light' ? th.palette.text.primary : '#E0D2B4'),
                borderRadius: 1,
                p: 1,
              }}
            >
              <BsGear />
            </IconButton> */}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ChapterHeader
