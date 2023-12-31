import * as React from 'react'
import {
  ButtonBase,
  Tooltip,
  Typography,
  styled,
  tooltipClasses,
  TooltipProps,
} from '@mui/material'
import { ChapterNumberIcon } from '~/components'
// import { makeWordLocation } from '~/utils'

const QuranReaderIconContainer = styled('div')(() => ({
  position: 'relative',
  span: {
    color: 'white',
    textAlign: 'center',
  },
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
  '&:hover': {
    color: theme.vars.palette.primary.main,
  },

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
  word: any
  setCurrentVerse: any
  setCurrentAudio: any
  audio: any
}

function QuranWord(props: QuranWordProps) {
  const { word, setCurrentVerse, setCurrentAudio, audio } = props

  // creating wordLocation instead of using `word.location` because
  // the value of `word.location` is `1:3:5-7`, but we want `1:3:5`
  // const wordLocation = makeWordLocation(word.verse_key, word.position)
  // console.log({ wordLocation })
  // // Determine if the audio player is currently playing the word
  // const isAudioPlayingWord = useXstateSelector(audioService, (state) => {
  //   const { surah, ayahNumber, wordLocation: wordPosition } = state.context;
  //   return `${surah}:${ayahNumber}:${wordPosition}` === wordLocation;
  // });

  if (word.char_type === 'end') {
    return (
      <QuranReaderIconContainer>
        <Typography
          variant="subtitle1"
          component={'span'}
          sx={{
            textAlign: 'center',
            position: 'absolute',
            top: '1.6rem',
            left: '0',
            width: '100%',
          }}
        >
          {word.text_madani}
        </Typography>
        <ChapterNumberIcon
          sx={{
            width: 49,
            height: 60,
          }}
        />
      </QuranReaderIconContainer>
    )
  }
  return (
    <HtmlTooltip
      title={
        <React.Fragment>
          {/* <Typography variant="body2" sx={{ mb: 0.5 }}>
  {word.translation.text}
</Typography> */}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'fontWeightBold',
            }}
          >
            {word.transliteration.text}
          </Typography>
        </React.Fragment>
      }
    >
      <QuranWordItem
        onClick={() => {
          setCurrentVerse(0)
          setCurrentAudio(`https://audio.qurancdn.com/${word.audio.url}`)
          audio.audioEl.current.play()
        }}
      >
        {word.text_madani}
      </QuranWordItem>
    </HtmlTooltip>
  )
}

export default QuranWord
