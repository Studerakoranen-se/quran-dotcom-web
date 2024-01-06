import * as React from 'react'
import { useRouter } from 'next/router'
import { Box, IconButton, styled } from '@mui/material'
import { IoMdPlay } from 'react-icons/io'
import { BsFillPauseFill } from 'react-icons/bs'
import QuranReaderStyles from '~/store/types/QuranReaderStyles'
import useScroll, { SMOOTH_SCROLL_TO_TOP } from '~/hooks/useScrollToElement'
import BookmarksMap from '~/types/BookmarksMap'
import Verse from '~/types/Verse'
import Translation from '~/types/Translation'
import { getVerseWords } from '~/utils'
import {
  verseFontChanged,
  verseTranslationChanged,
  verseTranslationFontChanged,
} from '../utils/memoization'
import VerseText from './VerseText'
import TranslationText from './TranslationText'

const TranslationViewCellRoot = styled('div')<{ ownerState: { isPlaying?: boolean } }>(
  ({ theme, ownerState }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(1.5),
    padding: theme.spacing(3, 0),
    borderBottom: `2px solid ${theme.vars.palette.divider}`,

    ...(ownerState?.isPlaying && {
      backgroundColor: theme.vars.palette.action.hover,
    }),
    '--gap-size': 'calc(0.5 * 2rem)',

    [theme.breakpoints.up('md')]: {
      '--gap-size': 'calc(1.5 * 2rem)',
    },
  }),
)

const TranslationViewCellContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  direction: 'ltr',
  padding: '0.8125rem',

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    padding: 0,
  },
}))

const TranslationViewCellActions = styled('div')(() => ({
  flex: 1,
  position: 'relative',
}))

const TranslationViewCellContentContainer = styled('div')(({ theme }) => ({
  flex: 1,
  position: 'relative',
}))

const TranslationViewCellWordsContainer = styled('div')(() => ({
  display: 'flex',
  paddingLeft: '2.5rem',
  paddingRight: '0.5rem',
  flexDirection: 'column',
  flexGrow: 1,
  gap: '1.25rem',
  justifyContent: 'center',
}))
const TranslationViewCellWords = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
}))

type TranslationViewCellProps = {
  verse: Verse
  quranReaderStyles: QuranReaderStyles
  verseIndex: number
  pageBookmarks: BookmarksMap | undefined
  bookmarksRangeUrl: string | null

  locale: string
  audioPlaying: boolean
  currentAudio?: string
  handlePauseAudio: () => void
  handleCurrentVerseUpdate: (verseNumber: number) => void
  handleCurrentAudio: (audio: string) => void
  handleAudioOnPlay: () => void
  handleHighlightText: (verseId: string, segments: any[]) => void
  audio: any
}

function TranslationViewCell(props: TranslationViewCellProps) {
  const {
    verse,
    quranReaderStyles,
    verseIndex,
    pageBookmarks,
    bookmarksRangeUrl,

    audio,
    audioPlaying,
    handleAudioOnPlay,
    locale,
    currentAudio,
    handleCurrentAudio,
    handleHighlightText,
    handleCurrentVerseUpdate,
    handlePauseAudio,
  } = props

  const router = useRouter()
  const { startingVerse } = router.query

  const [scrollToSelectedItem, selectedItemRef]: [() => void, React.RefObject<HTMLDivElement>] =
    useScroll(SMOOTH_SCROLL_TO_TOP)

  React.useEffect(() => {
    if (Number(startingVerse) === verseIndex + 1) {
      scrollToSelectedItem()
    }
  }, [scrollToSelectedItem, startingVerse, verseIndex])

  return (
    <div ref={selectedItemRef}>
      <TranslationViewCellRoot
        ownerState={{
          isPlaying:
            audioPlaying && currentAudio === `https://audio.qurancdn.com/${verse.audio?.url}`,
        }}
      >
        <TranslationViewCellContainer>
          <TranslationViewCellActions>
            <div className="">{verse.verseKey}</div>
            {audioPlaying && currentAudio === `https://audio.qurancdn.com/${verse.audio?.url}` ? (
              <IconButton
                onClick={handlePauseAudio}
                aria-label={`Filtrele menüyu kapat`}
                size="small"
              >
                <BsFillPauseFill />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  handleCurrentVerseUpdate(verse.verseNumber)
                  handleCurrentAudio(`https://audio.qurancdn.com/${verse.audio?.url}`)
                  audio.audioEl.current.play()
                  // setShowControl(true)
                  handleAudioOnPlay()
                  // handleHighlightText(`v${verse.verseNumber}`, verse.audio.segments)
                }}
                aria-label={`Filtrele menüyu kapat`}
                size="small"
              >
                <IoMdPlay />
              </IconButton>
            )}
          </TranslationViewCellActions>
        </TranslationViewCellContainer>

        <TranslationViewCellContentContainer>
          <Box
            className="VerseText"
            sx={{
              direction: 'rtl',
              paddingBlockStart: '0.375rem',
              marginBlockStart: 'var(--gap-size)',
              marginBlockEnd: 'var(--gap-size)',
            }}
          >
            <VerseText
              words={getVerseWords(verse)}
              shouldShowH1ForSEO={verseIndex === 0}
              setCurrentVerse={handleCurrentVerseUpdate}
              setCurrentAudio={handleCurrentAudio}
              audio={audio}
            />
          </Box>

          {/* verseTranslationsContainer */}
          <Box
            sx={{
              marginBlockEnd: 'calc(1.3 * var(--gap-size))',
            }}
          >
            {verse.translations?.map((translation: Translation) => (
              <div
                key={translation.id}
                //  className={styles.verseTranslationContainer}
              >
                <TranslationText
                  translationFontScale={quranReaderStyles.translationFontScale}
                  text={translation.text}
                  // @ts-ignore
                  languageId={translation.languageId}
                  // @ts-ignore
                  resourceName={verse?.translations?.length > 1 ? translation.resourceName : null}
                />
              </div>
            ))}
          </Box>
        </TranslationViewCellContentContainer>

        {/* <TranslationViewCellWordsContainer>
          <Typography
            dangerouslySetInnerHTML={{
              __html:
                // @ts-ignore
                locale === 'sv' && verse?.swedishTranslations
                  ? // @ts-ignore
                    verse.swedishTranslations.swedishText
                  : verse.translations?.[0].text,
            }}
          />
        </TranslationViewCellWordsContainer> */}
      </TranslationViewCellRoot>
    </div>
  )
}

/**
 * Since we are passing verse and it's an object
 * even if the same verse is passed, its reference will change
 * on fetching a new page and since Memo only does shallow comparison,
 * we need to use custom comparing logic:
 *
 *  1. Check if the verse id is the same.
 *  2. Check if the font changed.
 *  3. Check if number of translations are the same since on translation change, it should change.
 *
 * If the above condition is met, it's safe to assume that the result
 * of both renders are the same.
 *
 * @param {TranslationViewCellProps} prevProps
 * @param {TranslationViewCellProps} nextProps
 * @returns {boolean}
 */
const areVersesEqual = (
  prevProps: TranslationViewCellProps,
  nextProps: TranslationViewCellProps,
): boolean =>
  prevProps.verse.id === nextProps.verse.id &&
  !verseFontChanged(
    prevProps.quranReaderStyles,
    nextProps.quranReaderStyles,
    prevProps.verse.words,
    nextProps.verse.words,
  ) &&
  !verseTranslationChanged(prevProps.verse, nextProps.verse) &&
  !verseTranslationFontChanged(prevProps.quranReaderStyles, nextProps.quranReaderStyles) &&
  JSON.stringify(prevProps?.pageBookmarks) === JSON.stringify(nextProps?.pageBookmarks) &&
  prevProps.bookmarksRangeUrl === nextProps.bookmarksRangeUrl

export default React.memo(TranslationViewCell, areVersesEqual)
