/* eslint-disable no-console */
import * as React from 'react'
import { useSelector as useXstateSelector } from '@xstate/react'
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
import { selectShowTooltipWhenPlayingAudio } from '~/store/slices/AudioPlayer/state'
import { ChapterNumberIcon } from '~/components'
import TajweedWord from '~/components/QuranWord/TajweedWordImage'
import TextWord from '~/components/QuranWord/TextWord'
import getTooltipText from '~/components/QuranWord/getToolTipText'
import GlyphWord from '~/components/QuranWord/GlyphWord'
import { isQCFFont } from '~/utils/fontFaceHelper'
import { areArraysEqual } from '~/utils/array'
import { getChapterNumberFromKey, getWordTimeSegment, makeWordLocation } from '~/utils'
import Word, { CharType } from '~/types/Word'
import { QuranFont, ReadingPreference, WordClickFunctionality } from '~/types/QuranReader'
import InlineWordByWord from '~/components/QuranWord/InlineWordByWord'
import { milliSecondsToSeconds } from '~/utils/datetime'
import { AudioPlayerMachineContext } from '~/xstate/AudioPlayerMachineContext'
import { logButtonClick } from '~/utils/eventLogger'
import playWordAudio from './playWordAudio'

export const DATA_ATTRIBUTE_WORD_LOCATION = 'data-word-location'

const QuranWordRoot = styled('div')(({ theme }) => ({
  display: 'inline-block',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
}))

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

const QuranWordItem = styled(ButtonBase)<{
  ownerState: {
    isRecitationEnabled?: boolean
    shouldBeHighLighted?: boolean
    shouldShowSecondaryHighlight?: boolean
    isWordByWordLayout?: boolean
    additionalWordGap?: boolean
    tajweedWord?: boolean
  }
}>(({ theme, ownerState }) => ({
  ...theme.typography.body1,
  fontFamily: 'Scheherazade',
  fontSize: theme.typography.pxToRem(24),
  fontWeight: theme.typography.fontWeightBold,
  color: theme.vars.palette.text.primary,

  ...(ownerState?.isRecitationEnabled && {
    '&:hover': {
      color: theme.palette.mode === 'dark' ? '#E0D2B4' : '#5ea9a9',
    },
  }),

  // ...(ownerState?.shouldBeHighLighted && {
  //   color: theme.palette.mode === 'dark' ? '#E0D2B4' : theme.vars.palette.primary.main,
  // }),

  ...(ownerState?.shouldShowSecondaryHighlight && {
    backgroundColor: '#efe2cd',
  }),

  ...(ownerState?.isWordByWordLayout && {
    textAlign: 'center',
    paddingBlockStart: '0.1875rem',
    paddingBlockEnd: '0.1875rem',
    paddingInlineStart: '0.1875rem',
    paddingInlineEnd: '0.1875rem',
  }),

  ...(ownerState?.additionalWordGap && {
    marginInlineEnd: theme.spacing(0.75),
  }),

  ...(ownerState?.tajweedWord && {
    '--tajweed-image-bg':
      theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(31, 189, 233, 0.15)',

    '&:hover': {
      backgroundColor: 'var(--tajweed-image-bg)',
    },

    ...(ownerState?.shouldBeHighLighted && {
      backgroundColor: 'var(--tajweed-image-bg)',
    }),
  }),

  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(32),
  },

  // [`${QuranReaderVerseItem}:hover &`]: {
  //   span: {
  //     color: '#E0D2B4',
  //   },
  // },

  // // [`${QuranReaderVerseItem}:hover &`]: {
  // //   span: {
  // //     color: '#E0D2B4',
  // //   },
  // // },
}))

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}))

type QuranWordProps = {
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
  } = props

  const [isTooltipOpened, setIsTooltipOpened] = React.useState(false)

  const wordClickFunctionality = useSelector(selectWordClickFunctionality)
  const audioService = React.useContext(AudioPlayerMachineContext)

  const showTooltipWhenPlayingAudio = useSelector(selectShowTooltipWhenPlayingAudio)

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

  // Determine if the audio player is currently playing the word
  const isAudioPlayingWord = useXstateSelector(audioService, (state) => {
    const { surah, ayahNumber, wordLocation: wordPosition } = state.context
    return `${surah}:${ayahNumber}:${wordPosition}` === wordLocation
  })

  const isWordByWordLayout = showWordByWordTranslation || showWordByWordTransliteration

  let wordText: React.ReactNode = null

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
  const shouldBeHighLighted = isHighlighted || isTooltipOpened || isAudioHighlightingAllowed
  const translationViewTooltipContent = React.useMemo(
    () => (isWordByWordAllowed ? getTooltipText(showTooltipFor, word) : null),
    [isWordByWordAllowed, showTooltipFor, word],
  )

  const isRecitationEnabled = wordClickFunctionality === WordClickFunctionality.PlayAudio

  const onClick = React.useCallback(() => {
    if (isRecitationEnabled) {
      logButtonClick('quran_word_pronounce')
      const currentState = audioService.getSnapshot()
      const isPlaying = currentState.matches('VISIBLE.AUDIO_PLAYER_INITIATED.PLAYING')
      const currentSurah = getChapterNumberFromKey(word.verseKey as string)
      const isSameSurah = currentState.context.surah === Number(currentSurah)
      const shouldSeekTo = isPlaying && isSameSurah
      if (shouldSeekTo) {
        const wordSegment = getWordTimeSegment(currentState.context.audioData.verseTimings, word)
        if (!wordSegment) return
        const [startTime] = wordSegment
        audioService.send({ type: 'SEEK_TO', timestamp: milliSecondsToSeconds(startTime) })
      } else {
        playWordAudio(word)
      }
    } else {
      logButtonClick('quran_word')
    }
  }, [audioService, isRecitationEnabled, word])

  if (word.charTypeName === 'end') {
    return (
      <QuranReaderIconContainer>
        <QuranReaderIconText>{wordText}</QuranReaderIconText>
        <ChapterNumberIcon />
      </QuranReaderIconContainer>
    )
  }

  const shouldHandleWordClicking =
    // @ts-ignore
    readingPreference === ReadingPreference.Translation && word.charTypeName !== CharType.End

  return (
    <QuranWordRoot>
      <HtmlTooltip
        placement="top"
        arrow
        disableFocusListener
        // open={showTooltipWhenPlayingAudio ? true : undefined}
        title={<Typography variant="body2">{translationViewTooltipContent}</Typography>}
        // open={isAudioPlayingWord && showTooltipWhenPlayingAudio ? true : undefined}
      >
        <QuranWordItem
          {...(shouldHandleWordClicking && { onClick, onKeyPress: onClick })}
          tabIndex={0}
          {...{
            [DATA_ATTRIBUTE_WORD_LOCATION]: wordLocation,
          }}
          ownerState={{
            isRecitationEnabled,
            shouldBeHighLighted,
            shouldShowSecondaryHighlight,
            isWordByWordLayout,
            additionalWordGap: readingPreference === ReadingPreference.Translation,
            tajweedWord: font === QuranFont.Tajweed,
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
    </QuranWordRoot>
  )
}

export default QuranWord
