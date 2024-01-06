import * as React from 'react'
import clsx from 'clsx'
import { Box } from '@mui/material'
import { shallowEqual, useSelector } from 'react-redux'
import useIntersectionObserver from '~/hooks/useObserveElement'
import { selectInlineDisplayWordByWordPreferences } from '~/store/slices/QuranReader/readingPreferences'
import {
  selectReadingViewSelectedVerseKey,
  selectReadingViewHoveredVerseKey,
} from '~/store/slices/QuranReader/readingViewVerse'
import { selectQuranReaderStyles } from '~/store/slices/QuranReader/styles'
// import { getFontClassName } from '~/utils/fontFaceHelper'
import { getFirstWordOfSurah } from '~/utils/verse'
import {
  // FALLBACK_FONT,
  QuranFont,
} from '~/types/QuranReader'
import Word from '~/types/Word'
import { QURAN_READER_OBSERVER_ID } from '../observer'
// import useIsFontLoaded from '../hooks/useIsFontLoaded'
import isCenterAlignedPage from '../utils/pageUtils'
import QuranWord from './QuranWord'

type VerseTextProps = {
  words: Word[]
  isReadingMode?: boolean
  shouldShowH1ForSEO?: boolean

  setCurrentVerse: any
  setCurrentAudio: any
  audio: any
}

const VerseText = ({
  words,
  isReadingMode = false,
  shouldShowH1ForSEO = false,
  setCurrentVerse,
  setCurrentAudio,
  audio,
}: VerseTextProps) => {
  const textRef = React.useRef(null)
  useIntersectionObserver(textRef, QURAN_READER_OBSERVER_ID)
  const { quranFont, quranTextFontScale, mushafLines } = useSelector(
    selectQuranReaderStyles,
    shallowEqual,
  )
  const [firstWord] = words
  const { lineNumber, pageNumber, location, verseKey, hizbNumber } = firstWord
  // const isFontLoaded = useIsFontLoaded(firstWord?.pageNumber, quranFont)
  const isFontLoaded = false
  const { showWordByWordTranslation, showWordByWordTransliteration } = useSelector(
    selectInlineDisplayWordByWordPreferences,
    shallowEqual,
  )
  const selectedVerseKey = useSelector(selectReadingViewSelectedVerseKey, shallowEqual)
  const hoveredVerseKey = useSelector(selectReadingViewHoveredVerseKey, shallowEqual)

  const centerAlignPage = React.useMemo(
    // @ts-ignore
    () => isCenterAlignedPage(pageNumber, lineNumber, quranFont),
    [pageNumber, lineNumber, quranFont],
  )
  // @ts-ignore
  const firstWordData = getFirstWordOfSurah(location)
  const isTajweedFont = quranFont === QuranFont.Tajweed
  const isBigTextLayout =
    (isReadingMode &&
      (quranTextFontScale > 3 || showWordByWordTranslation || showWordByWordTransliteration)) ||
    isTajweedFont

  const { chapterId } = firstWordData

  const VerseTextContainer = shouldShowH1ForSEO ? 'h1' : 'div'

  return (
    <Box
      component={VerseTextContainer}
      ref={textRef}
      data-verse-key={verseKey}
      data-page={pageNumber}
      data-chapter-id={chapterId}
      data-hizb={hizbNumber}
      sx={{
        display: 'block',
        direction: 'rtl',

        ...(isBigTextLayout && {
          display: 'none',
          xs: {
            display: 'black',
          },
        }),

        ...(isBigTextLayout && {}),
      }}
      // [styles[fontClassName]]: !isTajweedFont,
      // [styles.tafsirOrTranslationMode]: !isReadingMode,
    >
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',

          ...(!isReadingMode && {
            flexWrap: 'wrap',
          }),

          ...(isBigTextLayout && {
            display: 'inline',

            [theme.breakpoints.up('md')]: {
              display: 'flex',
            },
          }),

          ...(isReadingMode &&
            centerAlignPage && {
              justifyContent: 'center',
            }),
          ...(isReadingMode &&
            !centerAlignPage && {
              justifyContent: 'space-between',
            }),
        })}
        translate="no"
      >
        {words?.map((word) => (
          <QuranWord
            key={word.location}
            word={word}
            font={quranFont}
            isFontLoaded={isFontLoaded}
            isHighlighted={word.verseKey === selectedVerseKey}
            shouldShowSecondaryHighlight={word.verseKey === hoveredVerseKey}
            setCurrentVerse={setCurrentVerse}
            setCurrentAudio={setCurrentAudio}
            audio={audio}
          />
        ))}
      </Box>
    </Box>
  )
}

export default React.memo(VerseText)
