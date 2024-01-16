import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'
import { Box, useTheme } from '@mui/material'
import { addToHistory, updateVerseCount } from '~/store/historySlice'
import useGetQueryParamOrReduxValue from '~/hooks/useGetQueryParamOrReduxValue'
import useGetQueryParamOrXstateValue from '~/hooks/useGetQueryParamOrXstateValue'
import QuranReaderStyles from '~/store/types/QuranReaderStyles'
import { QuranReaderDataType } from '~/types/QuranReader'
import { VersesResponse } from '~/types/ApiResponses'
import Verse from '~/types/Verse'
import QueryParam from '~/types/QueryParam'
import useScrollToVirtualizedVerse from '../hooks/useScrollToVirtualizedVerse'
import TranslationViewVerse from './TranslationViewVerse'

type TranslationViewProps = {
  quranReaderStyles: QuranReaderStyles
  quranReaderDataType: QuranReaderDataType
  initialData: VersesResponse
  resourceId: number | string // can be the chapter, verse, tafsir, hizb, juz, rub or page's ID.
  locale: string
}

function TranslationView(props: TranslationViewProps) {
  const { quranReaderStyles, quranReaderDataType, initialData, resourceId, locale } = props

  const [apiPageToVersesMap, setApiPageToVersesMap] = React.useState<Record<number, Verse[]>>({
    1: initialData.verses,
  })
  const {
    value: reciterId,
    isQueryParamDifferent: reciterQueryParamDifferent,
  }: { value: number; isQueryParamDifferent: boolean } = useGetQueryParamOrXstateValue(
    QueryParam.Reciter,
  )
  const {
    value: selectedTranslations,
    isQueryParamDifferent: translationsQueryParamDifferent,
  }: { value: number[]; isQueryParamDifferent: boolean } = useGetQueryParamOrReduxValue(
    QueryParam.Translations,
  )

  const {
    value: wordByWordLocale,
    isQueryParamDifferent: wordByWordLocaleQueryParamDifferent,
  }: { value: string; isQueryParamDifferent: boolean } = useGetQueryParamOrReduxValue(
    QueryParam.WBW_LOCALE,
  )

  const virtuosoRef = React.useRef<VirtuosoHandle>(null)

  useScrollToVirtualizedVerse(
    quranReaderDataType,
    // @ts-ignore
    virtuosoRef,
    apiPageToVersesMap,
    String(resourceId),
    initialData.pagination.perPage,
  )

  const verses = React.useMemo(() => Object.values(apiPageToVersesMap).flat(), [apiPageToVersesMap])

  // const dispatch = useDispatch()
  // const theme = useTheme()

  // const [currentVerse, setCurrentVerse] = React.useState<number>(0)

  // const [audio, setAudio] = React.useState<any>()
  // const [currentAudio, setCurrentAudio] = React.useState('')
  // const [audioPlaying, setAudioPlaying] = React.useState(false)

  // const containerRef = React.useRef<HTMLDivElement>(null)

  // const handleCurrentVerseUpdate = React.useCallback((verse) => {
  //   setCurrentVerse(verse)
  // }, [])

  // const handleCurrentAudio = React.useCallback((audioLink) => {
  //   setCurrentAudio(audioLink)
  // }, [])

  // const handleAudioUpdate = React.useCallback((element) => {
  //   setAudio(element)
  // }, [])

  // const handleAudioOnPlay = React.useCallback(() => {
  //   setAudioPlaying(true)
  // }, [])

  // const handleAudioOnPause = React.useCallback(() => {
  //   setAudioPlaying(false)
  // }, [])

  // const handlePauseAudio = () => {
  //   audio.audioEl.current.pause()
  //   audio.audioEl.current.currentTime = 0
  //   handleCurrentAudio('')
  //   handleAudioOnPause()
  // }

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

  // const handleHighlightText = (id: any, segment: any) => {
  //   const verseElement = document.querySelector(`#${id}`)
  //   if (!verseElement) return

  //   const words = Array.from(verseElement.querySelectorAll('button'))

  //   let segmentIndex = 0
  //   // let lastSegmentTime = 0

  //   const audioElement = audio.audioEl.current

  //   const highlightWord = (word) => {
  //     word.style.color = '#139090'
  //   }

  //   const unhighlightWord = (word) => {
  //     word.style.color = '#043b3b'
  //   }

  //   const syncHighlighting = () => {
  //     let currentTime = audioElement.currentTime * 1000

  //     // Add a small buffer time (e.g., 50ms) to the current time
  //     currentTime += 50

  //     // Check if we need to move to the next segment
  //     while (segmentIndex < segment.length && currentTime >= segment[segmentIndex][3]) {
  //       unhighlightWord(words[segmentIndex])
  //       segmentIndex++
  //     }

  //     // Check if we need to highlight a new segment
  //     while (
  //       segmentIndex < segment.length &&
  //       currentTime >= segment[segmentIndex][2] &&
  //       currentTime < segment[segmentIndex][3]
  //     ) {
  //       highlightWord(words[segmentIndex])
  //       segmentIndex++
  //     }

  //     // If audio has ended, unhighlight all words
  //     if (audioElement.ended) {
  //       words.forEach((word) => unhighlightWord(word))
  //     }
  //   }

  //   audioElement.addEventListener('timeupdate', syncHighlighting)
  // }

  // const handleAudioEnded = () => {
  //   const audios = verses?.map((verse: any) => verse.audio)

  //   // const currentIndex = audios.indexOf(currentAudio)
  //   if (currentVerse === (audios && audios?.length - 1)) {
  //     handleCurrentAudio('')
  //     setCurrentVerse(0)
  //   } else {
  //     handleCurrentAudio(`https://audio.qurancdn.com/${audios?.[currentVerse].url}`)
  //     handleHighlightText(`v${currentVerse + 1}`, audios?.[currentVerse].segments)
  //     setCurrentVerse(currentVerse + 1)
  //   }
  // }

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

  // React.useEffect(() => {
  //   if (virtuosoRef.current && router.query.startAt) {
  //     virtuosoRef.current.scrollToIndex({
  //       index: Number(router.query.startAt),
  //       align: 'center',
  //       behavior: 'smooth',
  //     })
  //   }
  // }, [router.query.startAt])

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
      <TranslationViewVerse
        // key={verse.id}
        verseIdx={verseIdx}
        totalVerses={initialData?.metaData?.numberOfVerses as number}
        quranReaderDataType={quranReaderDataType}
        quranReaderStyles={quranReaderStyles}
        setApiPageToVersesMap={setApiPageToVersesMap}
        selectedTranslations={selectedTranslations}
        wordByWordLocale={wordByWordLocale}
        reciterId={reciterId}
        initialData={initialData}
        resourceId={resourceId}
        locale={locale}
      />
    )
  }

  return (
    <Box
      minHeight="100vh"
      // sx={{
      //   marginInlineStart: 'auto',
      //   marginInlineEnd: 'auto',
      //   width: '100%',
      //   ...(isFilterMenuOpen && {
      //     marginBlockStart: 0,
      //     marginBlockEnd: 0,
      //     marginInlineStart: 'auto',
      //     marginInlineEnd: 'auto',
      //     maxWidth: '112rem',
      //   }),
      // }}
    >
      <Virtuoso
        ref={virtuosoRef}
        useWindowScroll
        // @ts-ignore
        totalCount={initialData?.metaData?.numberOfVerses + 1}
        increaseViewportBy={1000}
        initialItemCount={1} // needed for SSR.
        itemContent={itemContentRenderer}
      />
    </Box>
  )
}

export default TranslationView
