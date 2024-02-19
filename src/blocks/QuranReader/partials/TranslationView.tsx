import * as React from 'react'
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'
import { Box } from '@mui/material'
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
