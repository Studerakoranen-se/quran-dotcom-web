import * as React from 'react'
import { useRouter } from 'next/router'
import { useSelector as useSelectorXstate } from '@xstate/react'
import { Box, styled } from '@mui/material'
import { useSelector } from 'react-redux'
import QuranReaderStyles from '~/store/types/QuranReaderStyles'
import useScroll, { SMOOTH_SCROLL_TO_CENTER } from '~/hooks/useScrollToElement'
import BookmarksMap from '~/types/BookmarksMap'
import Verse from '~/types/Verse'
import Translation from '~/types/Translation'
import { getVerseWords, makeVerseKey } from '~/utils'
import { AudioPlayerMachineContext } from '~/xstate/AudioPlayerMachineContext'
import { selectEnableAutoScrolling } from '~/store/slices/AudioPlayer/state'
import PlayVerseAudioButton from '~/components/Verse/PlayVerseAudioButton'
import VerseLink from '~/components/VerseLink'
import {
  verseFontChanged,
  verseTranslationChanged,
  verseTranslationFontChanged,
} from '../utils/memoization'
import VerseText from './VerseText'
import TranslationText from './TranslationText'

const TranslationViewCellRoot = styled('div')<{ ownerState: { isHighlighted?: boolean } }>(
  ({ theme, ownerState }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(1.5),
    padding: theme.spacing(3, 2),
    borderBottom: `2px solid ${theme.vars.palette.divider}`,
    flexDirection: 'column',

    ...(ownerState?.isHighlighted && {
      backgroundColor: theme.vars.palette.action.hover,
    }),
    '--gap-size': 'calc(0.5 * 2rem)',

    [theme.breakpoints.up('md')]: {
      '--gap-size': 'calc(1.5 * 2rem)',
      gap: theme.spacing(4),
      flexDirection: 'row',
      padding: 0,
    },
  }),
)

const TranslationViewCellActionContainer = styled('div')(({ theme }) => ({
  marginBlockStart: 'var(--gap-size)',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  direction: 'ltr',

  [theme.breakpoints.up('md')]: {
    flexDirection: 'column',
    justifyContent: 'start',
    // marginInlineEnd: 'calc(2 * 2rem)',
  },
}))

const TranslationViewCellActionsLeft = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',

  [theme.breakpoints.up('md')]: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
}))

const TranslationViewCellActionsRight = styled(TranslationViewCellActionsLeft)(() => ({
  justifyContent: 'flex-end',
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
}

function TranslationViewCell(props: TranslationViewCellProps) {
  const { verse, quranReaderStyles, verseIndex, pageBookmarks, bookmarksRangeUrl, locale } = props

  const router = useRouter()
  const { startingVerse } = router.query

  const audioService = React.useContext(AudioPlayerMachineContext)
  const isHighlighted = useSelectorXstate(audioService, (state) => {
    const { ayahNumber, surah } = state.context
    return makeVerseKey(surah as string | number, ayahNumber) === verse.verseKey
  })

  const enableAutoScrolling = useSelector(selectEnableAutoScrolling)

  const [scrollToSelectedItem, selectedItemRef]: [() => void, React.RefObject<HTMLDivElement>] =
    useScroll(SMOOTH_SCROLL_TO_CENTER)

  React.useEffect(() => {
    if ((isHighlighted && enableAutoScrolling) || Number(startingVerse) === verseIndex + 1) {
      scrollToSelectedItem()
    }
  }, [isHighlighted, scrollToSelectedItem, enableAutoScrolling, startingVerse, verseIndex])

  // console.log('verse.translations', verse.translations)
  return (
    <div ref={selectedItemRef}>
      <TranslationViewCellRoot
        ownerState={{
          isHighlighted,
        }}
      >
        <TranslationViewCellActionContainer>
          <TranslationViewCellActionsLeft>
            <Box
              sx={(theme) => ({
                display: 'inline-block',
                marginInlineEnd: 'calc(0.5 * 0.375rem)',
                [theme.breakpoints.up('md')]: {
                  marginInlineEnd: 0,
                },
              })}
            >
              <VerseLink verseKey={verse.verseKey} locale={locale} />
            </Box>

            <Box
              sx={(theme) => ({
                display: 'inline-block',
                marginInlineEnd: 'calc(0.5 * 0.375rem)',
                [theme.breakpoints.up('md')]: {
                  marginInlineEnd: 0,
                },
              })}
            >
              <PlayVerseAudioButton
                verseKey={verse.verseKey}
                timestamp={verse?.timestamps?.timestampFrom}
              />
            </Box>
          </TranslationViewCellActionsLeft>
          {/* <TranslationViewCellActionsRight>bookmarksRangeUrl</TranslationViewCellActionsRight> */}
        </TranslationViewCellActionContainer>

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
            <VerseText words={getVerseWords(verse)} shouldShowH1ForSEO={verseIndex === 0} />
          </Box>

          {/* verseTranslationsContainer */}
          <Box
            sx={{
              marginBlockEnd: { md: 'calc(1.3 * var(--gap-size))' },
            }}
          >
            {verse.translations?.map((translation: Translation) => (
              <Box
                key={translation.id}
                sx={{
                  marginBlockEnd: { md: '2rem' },
                }}
              >
                <TranslationText
                  translationFontScale={quranReaderStyles.translationFontScale}
                  text={translation.text}
                  languageId={translation.languageId as number}
                  resourceName={
                    (verse && verse.translations && verse.translations.length > 1
                      ? translation.resourceName
                      : null) as string
                  }
                />
              </Box>
            ))}
          </Box>
        </TranslationViewCellContentContainer>
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
