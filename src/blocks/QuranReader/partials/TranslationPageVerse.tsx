import * as React from 'react'
// import useSWRImmutable from 'swr/immutable'
import { useVerseTrackerContext } from '~/contexts'
import QuranReaderStyles from '~/store/types/QuranReaderStyles'
import { toLocalizedNumber } from '~/utils'
import Verse from '~/types/Verse'
import { VersesResponse } from '~/types/ApiResponses'
import Translation from '~/types/Translation'
import TranslationViewCell from './TranslationViewCell'
import ChapterHeader from './ChapterHeader'
// import { getPageBookmarks } from '~/utils/auth/api';

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
    locale,
  } = props
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { verseKeysQueue } = useVerseTrackerContext()
  // const { data: pageBookmarks } = useSWRImmutable(bookmarksRangeUrl, async () => {
  //   const response = await getPageBookmarks(
  //     mushafId,
  //     Number(firstVerseInPage.chapterId),
  //     Number(firstVerseInPage.verseNumber),
  //     initialData.pagination.perPage,
  //   );
  //   return response;
  // });

  const getTranslationNameString = (translations?: Translation[]) => {
    let translationName = `No translation selected`
    // @ts-ignore
    if (translations?.length === 1) translationName = translations?.[0].resourceName
    if (translations?.length === 2) {
      translationName = `${translations?.[0].resourceName}, and ${toLocalizedNumber(
        translations.length - 1,
        locale,
      )} other`
    }
    // @ts-ignore
    if (translations?.length > 2) {
      translationName = `${translations?.[0].resourceName}, and ${toLocalizedNumber(
        // @ts-ignore
        translations.length - 1,
        locale,
      )} other`
    }

    return translationName
  }

  React.useEffect(() => {
    // @ts-ignore
    let observer: IntersectionObserver = null

    if (containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            verseKeysQueue.current.add(verse.verseKey)
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.5,
        },
      )
      observer.observe(containerRef.current)
    }

    return () => {
      observer?.disconnect()
    }
  }, [isLastVerseInView, verse, verseKeysQueue])

  return (
    <div ref={isLastVerseInView ? containerRef : undefined}>
      {verse.verseNumber === 1 && (
        <ChapterHeader
          translationName={getTranslationNameString(verse.translations)}
          chapterId={String(verse.chapterId)}
          pageNumber={verse.pageNumber}
          hizbNumber={verse.hizbNumber}
          // @ts-ignore
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
        locale={locale}
      />
    </div>
  )
}

export default TranslationPageVerse
