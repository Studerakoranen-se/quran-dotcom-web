import * as React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { VirtuosoHandle } from 'react-virtuoso'
import ReactAudioPlayer from 'react-audio-player'
import { Box, Button, IconButton, styled } from '@mui/material'
import { BsPlayFill, BsFillPauseFill, BsGear } from 'react-icons/bs'
import {
  selectIsSidebarNavigationVisible,
  setIsVisible,
} from '~/store/slices/QuranReader/sidebarNavigation'
import { selectReadingPreference } from '~/store/slices/QuranReader/readingPreferences'
import { selectQuranReaderStyles } from '~/store/slices/QuranReader/styles'
import { QuranReaderDataType, ReadingPreference } from '~/types/QuranReader'
import { VersesResponse } from '~/types/ApiResponses'
// import { addToHistory, updateVerseCount } from '~/store/historySlice'
import { VerseTrackerContextProvider } from '~/contexts/VerseTrackerContext'
import { FilterIcon } from '~/components'
import QuranReaderDrawer from './partials/QuranReaderDrawer'
import QuranReaderView from './partials/QuranReaderView'

const QuranReaderRoot = styled('section')<{
  ownerState: {
    withSidebarNavigationOpenOrAuto: boolean | string
  }
}>(({ theme, ownerState }) => ({
  paddingBlockStart: '1.5rem',
  paddingInlineStart: 0,
  paddingInlineEnd: 0,
  paddingBlockEnd: 'calc(4 * 2rem)',
  transition: '0.4s',

  ...(ownerState?.withSidebarNavigationOpenOrAuto && {
    [theme.breakpoints.up('md')]: {
      marginInlineStart: 'calc(10 * 2rem)',
    },
  }),
}))

const QuranReaderRootMain = styled('div')(({ theme }) => ({
  padding: '0 var(--cia-container-spacing)',

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 12),
  },
}))

const QuranReaderRootInfiniteScroll = styled('div')(({ theme }) => ({
  marginBlockStart: 0,
  marginBlockEnd: 0,
  marginInlineStart: 'auto',
  marginInlineEnd: 'auto',
  width: '95%',

  [theme.breakpoints.up('md')]: {
    width: '88%',
    maxWidth: '112rem',
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
  width: '100%',
  ...(ownerState.isHeaderStikcy && {
    top: 'calc(22px + var(--cia-header-toolbar-primary-height))',
  }),

  ...(ownerState.enableShadow && {
    boxShadow: '0px 22px 28px -3px rgba(0,0,0,0.1)',
  }),
}))

const QuranReaderGridActionsButtons = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  backgroundColor: theme.vars.palette.background.default,
}))

type QuranReaderProps = {
  initialData: VersesResponse
  id: number | string // can be the chapter, verse, tafsir, hizb, juz, rub or page's ID.
  quranReaderDataType?: QuranReaderDataType
  locale: string
}

function QuranReader(props: QuranReaderProps) {
  const { initialData, id, quranReaderDataType = QuranReaderDataType.Chapter, locale } = props

  // useSyncReadingProgress({
  //   isReadingPreference: false,
  // })

  const isSidebarNavigationVisible = useSelector(selectIsSidebarNavigationVisible)
  const quranReaderStyles = useSelector(selectQuranReaderStyles, shallowEqual)
  const readingPreference = useSelector(selectReadingPreference) as ReadingPreference
  const isReadingPreference = readingPreference === ReadingPreference.Reading

  const dispatch = useDispatch()

  const [currentVerse, setCurrentVerse] = React.useState<number>(0)

  const [audio, setAudio] = React.useState<any>()
  const [currentAudio, setCurrentAudio] = React.useState('')
  const [audioPlaying, setAudioPlaying] = React.useState(false)

  const handleCurrentVerseUpdate = React.useCallback((verse) => {
    setCurrentVerse(verse)
  }, [])

  const handleCurrentAudio = React.useCallback((audioLink) => {
    setCurrentAudio(audioLink)
  }, [])

  const handleAudioUpdate = React.useCallback((element) => {
    setAudio(element)
  }, [])

  const handleAudioOnPlay = React.useCallback(() => {
    setAudioPlaying(true)
  }, [])

  const handleAudioOnPause = React.useCallback(() => {
    setAudioPlaying(false)
  }, [])

  const handlePauseAudio = () => {
    audio.audioEl.current.pause()
    audio.audioEl.current.currentTime = 0
    handleCurrentAudio('')
    handleAudioOnPause()
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

  const handleHighlightText = (newId: any, segment: any) => {
    const verseElement = document.querySelector(`#${newId}`)
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
    const audios = initialData.verses?.map((verse: any) => verse.audio)

    // const currentIndex = audios.indexOf(currentAudio)
    if (currentVerse === (audios && audios?.length - 1)) {
      handleCurrentAudio('')
      setCurrentVerse(0)
    } else {
      handleCurrentAudio(`https://audio.qurancdn.com/${audios?.[currentVerse].url}`)
      handleHighlightText(`v${currentVerse + 1}`, audios?.[currentVerse].segments)
      setCurrentVerse(currentVerse + 1)
    }
  }

  // React.useEffect(() => {
  //   if (chapterId) {
  //     dispatch(addToHistory(chapter))
  //   }
  // }, [chapterId, dispatch, locale, chapter])

  // React.useEffect(() => {
  //   // Get the element by its ID
  //   const targetElement = document.getElementById(`verse${startAt}`)
  //   if (targetElement) {
  //     const offsetTop = targetElement.offsetTop
  //     const windowHeight = window.innerHeight
  //     const targetHeight = targetElement.offsetHeight
  //     const scrollToPosition = offsetTop - windowHeight / 2 + targetHeight / 2

  //     window.scrollTo({ top: scrollToPosition, behavior: 'smooth' })
  //   }
  // }, [startAt])

  // React.useEffect(() => {
  //   if (!containerRef.current || !verses) {
  //     // If the container or verses are not available yet, return early
  //     return
  //   }

  //   const options = {
  //     root: null,
  //     rootMargin: '50px',
  //     threshold: 0.25,
  //   }

  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         const matches = entry.target.id.match(/\d+/)

  //         dispatch(
  //           updateVerseCount({
  //             id: chapterId,
  //             // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //             verseCount: matches ? matches[0]! : 1,
  //           }),
  //         )

  //         // setVisibleId(entry.target.id)
  //       }
  //     })
  //   }, options)

  //   const elements = containerRef.current.querySelectorAll("[id^='verse']")
  //   elements.forEach((element) => {
  //     observer.observe(element)
  //   })

  //   // eslint-disable-next-line consistent-return
  //   return () => {
  //     elements.forEach((element) => {
  //       observer.unobserve(element)
  //     })
  //   }
  // }, [chapterId, dispatch, verses])

  // React.useEffect(() => {
  //   const updateHighlightColor = () => {
  //     const verseElement = document.querySelector(`#v${currentVerse}`)
  //     if (!verseElement) return

  //     const words = Array.from(verseElement.querySelectorAll('button'))

  //     words.forEach((word) => {
  //       if (theme.palette.mode === 'dark') {
  //         word.style.color = '#E0D2B4'
  //       } else {
  //         word.style.color = '#139090'
  //       }
  //     })
  //   }

  //   updateHighlightColor()

  //   return () => {
  //     // Clean up if needed
  //   }
  // }, [theme.palette.mode, currentVerse])

  return (
    <React.Fragment>
      <QuranReaderRoot
        ownerState={{
          withSidebarNavigationOpenOrAuto: isSidebarNavigationVisible,
        }}
      >
        <QuranReaderRootMain>
          <QuranReaderStickyFilter ownerState={{ enableShadow: false, isHeaderStikcy: true }}>
            <QuranReaderGridActionsButtons>
              <ReactAudioPlayer
                src={currentAudio}
                autoPlay
                // controls
                ref={(element) => {
                  handleAudioUpdate(element)
                }}
                onPlay={() => {
                  setAudioPlaying(true)
                }}
                onEnded={() => {
                  handleAudioOnPause()
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  currentVerse === 0 || handleAudioEnded()
                }}
              />
              {}
              <IconButton
                onClick={() => {
                  dispatch(setIsVisible(true))
                }}
                sx={{
                  border: (th) => `1px solid ${th.vars.palette.divider}`,
                  color: (th) =>
                    th.palette.mode === 'light' ? th.palette.text.primary : '#E0D2B4',
                  borderRadius: 1,
                  p: 0.5,
                  visibility: isSidebarNavigationVisible === true ? 'hidden' : 'visibile',
                }}
                aria-label={`Toggle Surah Drawer`}
                size="small"
              >
                <FilterIcon fontSize="small" />
              </IconButton>

              <Box display="flex" alignItems="center">
                {/* <Bismillah bismillah_pre={chapter?.bismillah_pre} />  */}
                <Box>
                  {audioPlaying ? (
                    <Button
                      variant="text"
                      // @ts-ignore
                      color="text"
                      size="medium"
                      onClick={handlePauseAudio}
                      sx={{
                        color: (th) =>
                          th.palette.mode === 'light' ? th.palette.text.primary : '#E0D2B4',
                        backgroundColor: 'transparent',
                        '&:hover, &:focus-within': {
                          backgroundColor: 'transparent',
                        },
                      }}
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
                        // handleCurrentAudio(`https://audio.qurancdn.com/${verses?.[0].audio.url}`)
                        setCurrentVerse(1)
                        audio.audioEl.current.play()
                      }}
                      startIcon={<BsPlayFill />}
                      sx={{
                        color: (th) =>
                          th.palette.mode === 'light' ? th.palette.text.primary : '#E0D2B4',
                        backgroundColor: 'transparent',
                        '&:hover, &:focus-within': {
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      Spela upp ljud
                    </Button>
                  )}
                </Box>
                <IconButton
                  aria-label={`Change Settings`}
                  size="small"
                  sx={{
                    border: (th) => `1px solid ${th.vars.palette.divider}`,
                    color: (th) =>
                      th.palette.mode === 'light' ? th.palette.text.primary : '#E0D2B4',
                    borderRadius: 1,
                    p: 1,
                  }}
                >
                  <BsGear />
                </IconButton>
              </Box>
            </QuranReaderGridActionsButtons>
          </QuranReaderStickyFilter>
        </QuranReaderRootMain>
        <QuranReaderRootInfiniteScroll>
          <VerseTrackerContextProvider>
            <QuranReaderView
              isReadingPreference={isReadingPreference}
              quranReaderStyles={quranReaderStyles}
              initialData={initialData}
              quranReaderDataType={quranReaderDataType}
              resourceId={id}
              locale={locale}
            />
          </VerseTrackerContextProvider>
        </QuranReaderRootInfiniteScroll>
      </QuranReaderRoot>
      <QuranReaderDrawer locale={locale} />
    </React.Fragment>
  )
}

export default QuranReader
