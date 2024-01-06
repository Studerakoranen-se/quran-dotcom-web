import * as React from 'react'
// import useSWRImmutable from 'swr/immutable'
// import { useVerseTrackerContext } from '~/contexts'
import QuranReaderStyles from '~/store/types/QuranReaderStyles'
import Verse from '~/types/Verse'
import { VersesResponse } from '~/types/ApiResponses'
// import { getPageBookmarks } from '~/utils/auth/api';
import ChapterHeader from './ChapterHeader'
import TranslationViewCell from './TranslationViewCell'

type TranslationPageVerseProps = {
  verse: Verse
  selectedTranslations?: number[]
  bookmarksRangeUrl: string | null
  mushafId: number
  verseIdx: number
  quranReaderStyles: QuranReaderStyles
  initialData: VersesResponse
  // firstVerseInPage: Verse
  isLastVerseInView: boolean

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

const CHAPTERS_WITHOUT_BISMILLAH = ['1', '9']

function TranslationPageVerse(props: TranslationPageVerseProps) {
  const {
    verse,
    selectedTranslations,
    bookmarksRangeUrl,
    mushafId,
    verseIdx,
    quranReaderStyles,
    initialData,
    // firstVerseInPage,
    isLastVerseInView,

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
  const containerRef = React.useRef<HTMLDivElement>(null)
  // const { verseKeysQueue } = useVerseTrackerContext()
  // const { data: pageBookmarks } = useSWRImmutable(bookmarksRangeUrl, async () => {
  //   const response = await getPageBookmarks(
  //     mushafId,
  //     Number(firstVerseInPage.chapterId),
  //     Number(firstVerseInPage.verseNumber),
  //     initialData.pagination.perPage,
  //   );
  //   return response;
  // });

  // React.useEffect(() => {
  //   // @ts-ignore
  //   let observer: IntersectionObserver = null

  //   if (containerRef.current) {
  //     observer = new IntersectionObserver(
  //       (entries) => {
  //         if (entries[0].isIntersecting) {
  //           verseKeysQueue.current.add(verse.verseKey)
  //         }
  //       },
  //       {
  //         root: null,
  //         rootMargin: '0px',
  //         threshold: 0.5,
  //       },
  //     )
  //     observer.observe(containerRef.current)
  //   }

  //   return () => {
  //     observer?.disconnect()
  //   }
  // }, [isLastVerseInView, verse, verseKeysQueue])

  return (
    <div ref={isLastVerseInView ? containerRef : undefined}>
      {verse.verseNumber === 1 && (
        <ChapterHeader
          // translationName={getTranslationNameString(verse.translations)}
          chapterId={String(verse.chapterId)}
          pageNumber={verse.pageNumber}
          hizbNumber={verse.hizbNumber}
          isTranslationSelected={selectedTranslations?.length > 0}
        />
      )}

      <TranslationViewCell
        verseIndex={verseIdx}
        verse={verse}
        key={verse.id}
        quranReaderStyles={quranReaderStyles}
        // pageBookmarks={pageBookmarks}
        pageBookmarks={undefined}
        bookmarksRangeUrl={bookmarksRangeUrl}
        audio={audio}
        audioPlaying={audioPlaying}
        handleAudioOnPlay={handleAudioOnPlay}
        locale={locale}
        currentAudio={currentAudio}
        handleCurrentAudio={handleCurrentAudio}
        handleHighlightText={handleHighlightText}
        handleCurrentVerseUpdate={handleCurrentVerseUpdate}
        handlePauseAudio={handlePauseAudio}
      />
    </div>
  )
}

export default TranslationPageVerse
