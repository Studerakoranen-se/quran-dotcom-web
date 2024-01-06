import * as React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import {
  ButtonBase,
  Tooltip,
  Typography,
  styled,
  tooltipClasses,
  TooltipProps,
  Box,
} from '@mui/material'
import {
  selectWordClickFunctionality,
  selectReadingPreference,
  selectTooltipContentType,
  selectInlineDisplayWordByWordPreferences,
} from '~/store/slices/QuranReader/readingPreferences'
import { ChapterNumberIcon } from '~/components'
import TajweedWord from '~/components/QuranWord/TajweedWordImage'
import TextWord from '~/components/QuranWord/TextWord'
import getTooltipText from '~/components/QuranWord/getToolTipText'
import GlyphWord from '~/components/QuranWord/GlyphWord'
import { isQCFFont } from '~/utils/fontFaceHelper'
import { areArraysEqual } from '~/utils/array'
import { makeWordLocation } from '~/utils'
import Word, { CharType } from '~/types/Word'
import { QuranFont, ReadingPreference } from '~/types/QuranReader'
import InlineWordByWord from '~/components/QuranWord/InlineWordByWord'

export const DATA_ATTRIBUTE_WORD_LOCATION = 'data-word-location'

const QuranReaderIconContainer = styled('div')(() => ({
  position: 'relative',
  width: 45,
  height: 45,
  span: {
    color: 'white',
    textAlign: 'center',
    marginTop: 2,
  },
  svg: {
    width: '100%',
    height: '100%',
  },
  // [`${QuranReaderVerseItem}:hover &`]: {
  //   span: {
  //     color: '#E0D2B4',
  //   },
  // },
}))

const QuranReaderIconText = styled('span')(({ theme }) => ({
  ...theme.typography.subtitle1,
  ...theme.mixins.absolute(0),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  // [`${QuranReaderVerseItem}:hover &`]: {
  //   span: {
  //     color: '#E0D2B4',
  //   },
  // },
}))

const QuranWordItem = styled(ButtonBase)(({ theme }) => ({
  ...theme.typography.body1,
  fontFamily: 'Scheherazade',
  fontSize: theme.typography.pxToRem(24),
  fontWeight: theme.typography.fontWeightBold,
  color: theme.vars.palette.text.primary,

  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(32),
  },

  // [`${QuranReaderVerseItem}:hover &`]: {
  //   span: {
  //     color: '#E0D2B4',
  //   },
  // },
}))

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  '& > *': {
    marginTop: `0 !important`,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))

type QuranWordProps = {
  setCurrentVerse: any
  setCurrentAudio: any
  audio: any

  word: Word
  font: QuranFont
  isHighlighted?: boolean
  isWordByWordAllowed?: boolean
  isAudioHighlightingAllowed?: boolean
  isFontLoaded?: boolean
  shouldShowSecondaryHighlight?: boolean
}

function QuranWord(props: QuranWordProps) {
  const {
    font,
    isWordByWordAllowed = true,
    isAudioHighlightingAllowed = true,
    isHighlighted,
    shouldShowSecondaryHighlight = false,
    isFontLoaded = true,

    word,
    setCurrentVerse,
    setCurrentAudio,
    audio,
  } = props

  const [isTooltipOpened, setIsTooltipOpened] = React.useState(false)

  const wordClickFunctionality = useSelector(selectWordClickFunctionality)
  const { showWordByWordTranslation, showWordByWordTransliteration } = useSelector(
    selectInlineDisplayWordByWordPreferences,
    shallowEqual,
  )

  const readingPreference = useSelector(selectReadingPreference)
  const showTooltipFor = useSelector(selectTooltipContentType, areArraysEqual)
  // creating wordLocation instead of using `word.location` because
  // the value of `word.location` is `1:3:5-7`, but we want `1:3:5`
  // @ts-ignore
  const wordLocation = makeWordLocation(word?.verseKey, word.position)

  const isWordByWordLayout = showWordByWordTranslation || showWordByWordTransliteration
  let wordText

  if (isQCFFont(font)) {
    wordText = (
      <GlyphWord
        font={font}
        qpcUthmaniHafs={word.qpcUthmaniHafs}
        pageNumber={word.pageNumber}
        textCodeV1={word.codeV1}
        textCodeV2={word.codeV2}
        isFontLoaded={isFontLoaded}
      />
    )
  } else if (font === QuranFont.Tajweed) {
    wordText = <TajweedWord path={word.text} alt={word.textUthmani} />
  } else if (word.charTypeName !== CharType.Pause) {
    wordText = <TextWord font={font} text={word.text} charType={word.charTypeName} />
  }

  /*
    Only show the tooltip when the following conditions are met:

    1. When the current character is of type Word.
    2. When it's allowed to have word by word (won't be allowed for search results as of now).
    3. When the tooltip settings are set to either translation or transliteration or both.
  */
  const showTooltip =
    word.charTypeName === CharType.Word && isWordByWordAllowed && !!showTooltipFor.length
  const shouldBeHighLighted = isHighlighted || isTooltipOpened
  // const shouldBeHighLighted =
  //   isHighlighted || isTooltipOpened || (isAudioHighlightingAllowed && isAudioPlayingWord);
  const translationViewTooltipContent = React.useMemo(
    () => (isWordByWordAllowed ? getTooltipText(showTooltipFor, word) : null),
    [isWordByWordAllowed, showTooltipFor, word],
  )

  if (word.charTypeName === 'end') {
    return (
      <QuranReaderIconContainer>
        <QuranReaderIconText>{wordText}</QuranReaderIconText>
        <ChapterNumberIcon />
      </QuranReaderIconContainer>
    )
  }

  return (
    <Box
      className="quran-word"
      {...{
        [DATA_ATTRIBUTE_WORD_LOCATION]: wordLocation,
      }}
      sx={{
        // ...(isRecitationEnabled && {
        //   '&:hover': {
        //     color: 'text.primary',
        //   }
        // }),
        ...(shouldBeHighLighted && {
          color: 'text.primary',
        }),
        ...(shouldShowSecondaryHighlight && {
          backgroundColor: 'background.paper',
        }),
        ...(isWordByWordLayout && {
          textAlign: 'center',
          paddingBlockStart: '0.1875rem',
          paddingBlockEnd: '0.1875rem',
          paddingInlineStart: '0.1875rem',
          paddingInlineEnd: '0.1875rem',
        }),
        ...(readingPreference === ReadingPreference.Translation && {
          marginInlineEnd: '0.375rem',
        }),
        ...(QuranFont.Tajweed && {
          backgroundColor: 'background.default',
        }),
      }}
    >
      <HtmlTooltip
        // open={showTooltip}
        // isOpen={isAudioPlayingWord && showTooltipWhenPlayingAudio ? true : undefined}
        // onOpen={setIsTooltipOpened}
        title={
          // @ts-ignore
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'fontWeightBold',
            }}
          >
            {translationViewTooltipContent}
          </Typography>
        }
      >
        <QuranWordItem
          onClick={() => {
            setCurrentVerse(0)
            setCurrentAudio(`https://audio.qurancdn.com/${word.audio?.url || word.audio_url}`)
            audio.audioEl.current.play()
          }}
        >
          {wordText}
        </QuranWordItem>
      </HtmlTooltip>

      {isWordByWordAllowed && (
        <React.Fragment>
          {showWordByWordTransliteration && <InlineWordByWord text={word.transliteration?.text} />}
          {showWordByWordTranslation && <InlineWordByWord text={word.translation?.text} />}
        </React.Fragment>
      )}
    </Box>
  )
}

export default QuranWord
