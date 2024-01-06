import * as React from 'react'
import QuranReaderStyles from '~/store/types/QuranReaderStyles'
import { QuranReaderDataType } from '~/types/QuranReader'
import Verse from '~/types/Verse'
import { VersesResponse } from '~/types/ApiResponses'
import useDedupedFetchVerse from '~/hooks/useDedupedFetchVerse'
import { getMushafId } from '~/utils'
import TranslationPageVerse from './TranslationPageVerse'
import TranslationViewCellSkeleton from './TranslationViewCellSkeleton'

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

  audioPlaying: boolean
  currentAudio?: string
  handlePauseAudio: () => void
  handleCurrentVerseUpdate: (verseNumber: number) => void
  handleCurrentAudio: (audio: string) => void
  handleAudioOnPlay: () => void
  handleHighlightText: (verseId: string, segments: any[]) => void
  audio: any
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
    audio,
    audioPlaying,
    handleAudioOnPlay,
    currentAudio,
    handleCurrentAudio,
    handleHighlightText,
    handleCurrentVerseUpdate,
    handlePauseAudio,
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
      <div
      // className={styles.container}
      >
        <TranslationViewCellSkeleton />
      </div>
    )
  }

  return (
    <div
    // className={styles.container}
    >
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

export default TranslationViewVerse
