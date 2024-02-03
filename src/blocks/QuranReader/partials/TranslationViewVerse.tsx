import * as React from 'react'
import { styled } from '@mui/material'
import QuranReaderStyles from '~/store/types/QuranReaderStyles'
import { QuranReaderDataType } from '~/types/QuranReader'
import Verse from '~/types/Verse'
import { VersesResponse } from '~/types/ApiResponses'
import useDedupedFetchVerse from '~/hooks/useDedupedFetchVerse'
import { getMushafId } from '~/utils'
import TranslationPageVerse from './TranslationPageVerse'
import TranslationViewCellSkeleton from './TranslationViewCellSkeleton'

const TranslationViewVerseContainer = styled('div')(({ theme }) => ({
  maxWidth: '100%',
  marginInlineStart: 'auto',
  marginInlineEnd: 'auto',
  [theme.breakpoints.up('lg')]: {
    maxWidth: '80%',
  },
}))
type TranslationViewVerseProps = {
  locale: string
  quranReaderStyles: QuranReaderStyles
  selectedTranslations: number[]
  setApiPageToVersesMap: (data: Record<number, Verse[]>) => void
  quranReaderDataType: QuranReaderDataType
  wordByWordLocale: string
  reciterId: number
  resourceId: number | string
  initialData: VersesResponse
  verseIdx: number
  totalVerses: number
}

function TranslationViewVerse(props: TranslationViewVerseProps) {
  const {
    quranReaderDataType,
    wordByWordLocale,
    reciterId,
    resourceId,
    setApiPageToVersesMap,
    initialData,
    quranReaderStyles,
    selectedTranslations,
    verseIdx,
    totalVerses,

    locale,
  } = props

  const mushafId = getMushafId(quranReaderStyles.quranFont, quranReaderStyles.mushafLines).mushaf

  const { verse, firstVerseInPage, bookmarksRangeUrl } = useDedupedFetchVerse({
    verseIdx,
    quranReaderDataType,
    quranReaderStyles,
    wordByWordLocale,
    reciterId,
    resourceId,
    selectedTranslations,
    initialData,
    setApiPageToVersesMap,
    mushafId,
    locale,
  })

  if (!verse) {
    return (
      <TranslationViewVerseContainer>
        <TranslationViewCellSkeleton />
      </TranslationViewVerseContainer>
    )
  }

  return (
    <TranslationViewVerseContainer>
      <TranslationPageVerse
        isLastVerseInView={verseIdx + 1 === totalVerses}
        verse={verse}
        verseIdx={verseIdx}
        mushafId={mushafId}
        quranReaderStyles={quranReaderStyles}
        selectedTranslations={selectedTranslations}
        bookmarksRangeUrl={bookmarksRangeUrl}
        initialData={initialData}
        //  firstVerseInPage={firstVerseInPage}

        locale={locale}
      />
    </TranslationViewVerseContainer>
  )
}

export default TranslationViewVerse
