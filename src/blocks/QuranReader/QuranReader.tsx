import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'
import ReactAudioPlayer from 'react-audio-player'
import { Box, Button, Collapse, IconButton, Typography, styled } from '@mui/material'
import { IoMdPlay } from 'react-icons/io'
import { IoChatbubble } from 'react-icons/io5'
import { BsBookHalf, BsThreeDots, BsPlayFill, BsFillPauseFill, BsGear } from 'react-icons/bs'
import { addToHistory, updateVerseCount } from '~/store/historySlice'
import { useGlobalHandlers, useGlobalState } from '~/contexts'
import { FilterIcon } from '~/components'
import QuranReaderDrawer from './partials/QuranReaderDrawer'
import QuranWord from './partials/QuranWord'

const BREAKPOINT_KEY = 'md'

const QuranReaderRoot = styled('section')(() => ({
  position: 'relative',
}))

const QuranReaderRootMain = styled('div')(({ theme }) => ({
  padding: 'var(--cia-container-spacing)',
  marginBlockStart: theme.spacing(3),
  marginBlockEnd: theme.spacing(3),

  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(0, 12),
  },
}))

const QuranReaderStickyFilter = styled('div')<{
  ownerState: { enableShadow?: boolean; isHeaderStikcy?: boolean }
}>(({ theme, ownerState }) => ({
  position: 'sticky',
  zIndex: 3,
  top: 0,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
  width: '100%',
  ...(ownerState.isHeaderStikcy && {
    top: 'calc(22px + var(--cia-header-toolbar-primary-height))',
  }),

  ...(ownerState.enableShadow && {
    boxShadow: '0px 22px 28px -3px rgba(0,0,0,0.1)',
  }),
}))

const QuranReaderCollapse = styled(Collapse)<{
  ownerState: { isFilterMenuOpen?: boolean }
}>(({ theme, ownerState }) => ({
  '&.MuiCollapse-root': {
    position: 'sticky',
    top: 'calc(90px + var(--cia-header-toolbar-primary-height))',
    zIndex: 2,
  },

  // display: 'flex',
  // alignItems: 'center',
  // padding: theme.spacing(1, 0),
  // width: '100%',

  ...(ownerState.isFilterMenuOpen && {
    '&.MuiCollapse-wrapper': {
      [theme.breakpoints.up(BREAKPOINT_KEY)]: {
        width: '300px !important', // Disable MuiCollapse on breakpoint.
        visibility: 'visible !important', // Disable MuiCollapse on breakpoint.
        '&.MuiCollapse-wrapperInner': {
          width: '100%',
        },
      },
    },
  }),
}))

const QuranReaderGridActionsButtons = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  backgroundColor: theme.vars.palette.background.default,
}))

const QuranReaderGrid = styled('div')<{ ownerState: { isFilterMenuOpen: boolean } }>(
  ({ theme, ownerState }) => ({
    position: 'relative',
    display: 'flex',
    padding: 'var(--ikas-container-spacing) 0',
    gridTemplateColumns: '1fr',

    [theme.breakpoints.up(BREAKPOINT_KEY)]: {
      gridTemplateColumns: 'calc(10 * 2rem) 1fr',

      ...(ownerState?.isFilterMenuOpen && {
        gridGap: theme.spacing(3),
      }),
    },

    ...(ownerState?.isFilterMenuOpen && {
      gridGap: theme.spacing(3, 1),
    }),
  }),
)

const QuranReaderVerseItem = styled('div')<{ ownerState: { isPlaying?: boolean } }>(
  ({ theme, ownerState }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(1.5),
    padding: theme.spacing(3, 0),
    borderBottom: `2px solid ${theme.vars.palette.divider}`,

    ...(ownerState?.isPlaying && {
      backgroundColor: theme.vars.palette.action.hover,
    }),
  }),
)

const QuranReaderVerseItemWordsContainer = styled('div')(() => ({
  display: 'flex',
  paddingLeft: '2.5rem',
  paddingRight: '0.5rem',
  flexDirection: 'column',
  flexGrow: 1,
  gap: '1.25rem',
  justifyContent: 'center',
}))
const QuranReaderVerseItemWords = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
}))

type QuranReaderProps = {
  chapterId?: number
  chapter?: any
  startAt?: number
  locale?: string
  verses?: any[]
  chapters?: any[]
  juzs?: any[]
}

function QuranReader(props: QuranReaderProps) {
  const { chapter, chapterId, startAt, locale, verses, chapters = [], juzs = [] } = props

  const dispatch = useDispatch()

  // @ts-ignore
  const { isFilterMenuOpen } = useGlobalState()
  // @ts-ignore
  const { onFilterMenuToggle } = useGlobalHandlers()

  const [currentVerse, setCurrentVerse] = React.useState<number>(0)

  const [audio, setAudio] = React.useState<any>()
  const [currentAudio, setCurrentAudio] = React.useState('')
  const [audioPlaying, setAudioPlaying] = React.useState(false)

  const containerRef = React.useRef<HTMLDivElement>(null)
  const virtuosoRef = React.useRef<VirtuosoHandle>(null)

  const handlePauseAudio = () => {
    audio.audioEl.current.pause()
    audio.audioEl.current.currentTime = 0
    setCurrentAudio('')
    setAudioPlaying(false)
  }

  // const handleTafsir = (verseID: number) => {
  //   axios
  //     .get(
  //       `https://api.quran.com/api/v3/chapters/${chapterId}/verses/${verseID}/tafsirs?language=${locale}`,
  //     )
  //     .then(({ data }) => {
  //       // setChapterInfo(data.chapter);
  //       console.log(data)
  //     })
  // }

  const handleHighlightText = (id: any, segment: any) => {
    const verseElement = document.querySelector(`#${id}`)
    if (!verseElement) return

    const words = Array.from(verseElement.querySelectorAll('button'))

    let segmentIndex = 0
    // let lastSegmentTime = 0

    const audioElement = audio.audioEl.current

    const highlightWord = (word) => {
      word.style.color = '#139090'
    }

    const unhighlightWord = (word) => {
      word.style.color = '#043b3b'
    }

    const syncHighlighting = () => {
      let currentTime = audioElement.currentTime * 1000

      // Add a small buffer time (e.g., 50ms) to the current time
      currentTime += 50

      // Check if we need to move to the next segment
      while (segmentIndex < segment.length && currentTime >= segment[segmentIndex][3]) {
        unhighlightWord(words[segmentIndex])
        segmentIndex++
      }

      // Check if we need to highlight a new segment
      while (
        segmentIndex < segment.length &&
        currentTime >= segment[segmentIndex][2] &&
        currentTime < segment[segmentIndex][3]
      ) {
        highlightWord(words[segmentIndex])
        segmentIndex++
      }

      // If audio has ended, unhighlight all words
      if (audioElement.ended) {
        words.forEach((word) => unhighlightWord(word))
      }
    }

    audioElement.addEventListener('timeupdate', syncHighlighting)
  }

  const handleAudioEnded = () => {
    const audios = verses?.map((verse: any) => verse.audio)

    // const currentIndex = audios.indexOf(currentAudio)
    if (currentVerse === (audios && audios?.length - 1)) {
      setCurrentAudio('')
      setCurrentVerse(0)
    } else {
      setCurrentAudio(`https://audio.qurancdn.com/${audios?.[currentVerse].url}`)
      handleHighlightText(`v${currentVerse + 1}`, audios?.[currentVerse].segments)
      setCurrentVerse(currentVerse + 1)
    }
  }

  React.useEffect(() => {
    if (chapterId) {
      dispatch(addToHistory(chapter))
    }
  }, [chapterId, dispatch, locale, chapter])

  React.useEffect(() => {
    // Get the element by its ID
    const targetElement = document.getElementById(`verse${startAt}`)
    if (targetElement) {
      const offsetTop = targetElement.offsetTop
      const windowHeight = window.innerHeight
      const targetHeight = targetElement.offsetHeight
      const scrollToPosition = offsetTop - windowHeight / 2 + targetHeight / 2

      window.scrollTo({ top: scrollToPosition, behavior: 'smooth' })
    }
  }, [startAt, verses])

  React.useEffect(() => {
    if (!containerRef.current || !verses) {
      // If the container or verses are not available yet, return early
      return
    }

    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.25,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matches = entry.target.id.match(/\d+/)

          dispatch(
            updateVerseCount({
              id: chapterId,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              verseCount: matches ? matches[0]! : 1,
            }),
          )

          // setVisibleId(entry.target.id)
        }
      })
    }, options)

    const elements = containerRef.current.querySelectorAll("[id^='verse']")
    elements.forEach((element) => {
      observer.observe(element)
    })

    // eslint-disable-next-line consistent-return
    return () => {
      elements.forEach((element) => {
        observer.unobserve(element)
      })
    }
  }, [chapterId, dispatch, verses])

  const itemContentRenderer = (verseIdx: number, verse) => {
    // if (verseIdx === initialData.metaData.numberOfVerses) {
    //   return (
    //     <EndOfScrollingControls
    //       quranReaderDataType={quranReaderDataType}
    //       lastVerse={verses[verses.length - 1]}
    //       initialData={initialData}
    //     />
    //   );
    // }

    return (
      <QuranReaderVerseItem
        key={verseIdx}
        id={`verse${verseIdx + 1}`}
        ownerState={{
          isPlaying:
            audioPlaying && currentAudio === `https://audio.qurancdn.com/${verse.audio.url}`,
        }}
      >
        <div className="flex flex-col items-center w-10 gap-4">
          <div className="">{verse.verse_key}</div>
          {audioPlaying && currentAudio === `https://audio.qurancdn.com/${verse.audio.url}` ? (
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
                setCurrentVerse(verse.verse_number)
                setCurrentAudio(`https://audio.qurancdn.com/${verse.audio.url}`)
                audio.audioEl.current.play()
                // setShowControl(true)
                setAudioPlaying(true)
                handleHighlightText(`v${verse.verse_number}`, verse.audio.segments)
              }}
              aria-label={`Filtrele menüyu kapat`}
              size="small"
            >
              <IoMdPlay />
            </IconButton>
          )}

          <IconButton aria-label={`Filtrele menüyu kapat`} size="small">
            <IoChatbubble />
          </IconButton>

          <IconButton
            aria-label={`Filtrele menüyu kapat`}
            size="small"
            // onClick={() => handleTafsir(verse.verse_number)}
          >
            <BsBookHalf />
          </IconButton>

          <IconButton aria-label={`Filtrele menüyu kapat`} size="small">
            <BsThreeDots />
          </IconButton>
        </div>
        <QuranReaderVerseItemWordsContainer>
          <QuranReaderVerseItemWords id={`v${verse.verse_number}`} dir="rtl">
            {verse.words.map((word: any, idx: number) => (
              <QuranWord
                key={idx}
                word={word}
                setCurrentVerse={setCurrentVerse}
                setCurrentAudio={setCurrentAudio}
                audio={audio}
              />
            ))}
          </QuranReaderVerseItemWords>
          <Typography>
            {locale === 'sv' && verse?.swedishTranslations
              ? verse.swedishTranslations.swedishText
              : verse.translations[0].text}
          </Typography>
        </QuranReaderVerseItemWordsContainer>
      </QuranReaderVerseItem>
    )
  }

  return (
    <QuranReaderRoot>
      <QuranReaderRootMain>
        <QuranReaderStickyFilter ownerState={{ enableShadow: false, isHeaderStikcy: true }}>
          <QuranReaderGridActionsButtons>
            <ReactAudioPlayer
              src={currentAudio}
              autoPlay
              // controls
              ref={(element) => {
                setAudio(element)
              }}
              onPlay={() => {
                setAudioPlaying(true)
              }}
              onEnded={() => {
                setAudioPlaying(false)
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                currentVerse === 0 || handleAudioEnded()
              }}
            />
            <IconButton
              onClick={onFilterMenuToggle}
              // sx={
              //   {
              //     // border: (theme) => `1px solid ${theme.vars.palette.divider}`,
              //     // borderRadius: 1,
              //     // p: 0.1,
              //   }
              // }
              aria-label={`Toggle Surah Drawer`}
              size="small"
            >
              {/* @ts-ignore */}
              <FilterIcon fontSize="small" color="text" />
            </IconButton>

            <Box
              display="flex"
              alignItems="center"
              //  className="pt-10 space-y-6"
            >
              {/* <Bismillah bismillah_pre={chapter?.bismillah_pre} /> */}
              <Box>
                {audioPlaying ? (
                  <Button
                    variant="contained"
                    // @ts-ignore
                    color="textInverted"
                    size="medium"
                    onClick={handlePauseAudio}
                    // className="text-[#E0D2B4] flex items-center gap-2 ml-auto"
                    startIcon={<BsFillPauseFill />}
                  >
                    pausa ljud
                  </Button>
                ) : (
                  <Button
                    variant="text"
                    // @ts-ignore
                    color="text"
                    size="medium"
                    onClick={() => {
                      setCurrentAudio(`https://audio.qurancdn.com/${verses?.[0].audio.url}`)
                      setCurrentVerse(1)
                      audio.audioEl.current.play()
                    }}
                    startIcon={<BsPlayFill />}
                    // className="text-[#E0D2B4] flex items-center gap-2 ml-auto"
                  >
                    Spela upp ljud
                  </Button>
                )}
              </Box>
              <IconButton aria-label={`Change Settings`} size="small">
                <BsGear />
              </IconButton>
            </Box>
          </QuranReaderGridActionsButtons>
        </QuranReaderStickyFilter>

        <QuranReaderGrid ownerState={{ isFilterMenuOpen }}>
          <div>
            <QuranReaderCollapse
              in={isFilterMenuOpen}
              orientation="horizontal"
              unmountOnExit
              timeout={100}
              ownerState={{
                isFilterMenuOpen,
              }}
            >
              <QuranReaderDrawer chapters={chapters} juzs={juzs} chapterId={chapterId} />
            </QuranReaderCollapse>
          </div>

          <Box
            minHeight="100vh"
            sx={{
              marginInlineStart: 'auto',
              marginInlineEnd: 'auto',
              width: '100%',
              ...(isFilterMenuOpen && {
                marginBlockStart: 0,
                marginBlockEnd: 0,
                marginInlineStart: 'auto',
                marginInlineEnd: 'auto',
                maxWidth: '112rem',
              }),
            }}
          >
            <Virtuoso
              ref={virtuosoRef}
              useWindowScroll
              data={verses}
              totalCount={chapter?.versesCount}
              increaseViewportBy={1000}
              initialItemCount={1} // needed for SSR.
              itemContent={itemContentRenderer}
            />
          </Box>
        </QuranReaderGrid>
      </QuranReaderRootMain>
    </QuranReaderRoot>
  )
}

export default QuranReader
