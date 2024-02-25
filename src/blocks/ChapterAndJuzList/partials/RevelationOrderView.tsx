import * as React from 'react'
import { useRouter } from 'next/router'
import { styled } from '@mui/material'
import Chapter from '~/types/Chapter'
import REVELATION_ORDER from '~/utils/revelationOrder'
import { QURAN_CHAPTERS_COUNT } from '~/utils/chapter'
import { setIsReadingByRevelationOrder } from '~/store/slices/revelationOrder'
import { getSurahNavigationUrl } from '~/utils/navigation'
import SurahPreview from './SurahPreview'

const RevelationOrderViewRoot = styled('div')(() => ({
  borderRadius: 4,
  breakInside: 'avoid-column',
}))

type RevelationOrderViewProps = {
  isDescending: boolean
  chapters: Chapter[]
  locale: string
}

const RevelationOrderView = (props: RevelationOrderViewProps) => {
  const { chapters, isDescending, locale } = props

  const router = useRouter()

  const onSurahClicked = (surahId: string | number) => {
    setIsReadingByRevelationOrder(true)
    router.push(getSurahNavigationUrl(surahId))
  }

  const sortedChaptersByRevelationOrder = React.useMemo(
    () =>
      isDescending
        ? chapters
            .slice()
            .sort(
              (a, b) =>
                REVELATION_ORDER.indexOf(Number(b.id)) - REVELATION_ORDER.indexOf(Number(a.id)),
            )
        : chapters
            .slice()
            .sort(
              (a, b) =>
                REVELATION_ORDER.indexOf(Number(a.id)) - REVELATION_ORDER.indexOf(Number(b.id)),
            ),
    [isDescending, chapters],
  )

  return (
    <React.Fragment>
      {sortedChaptersByRevelationOrder.map((chapter, revelationOrderIndex) => (
        <RevelationOrderViewRoot
          role="button"
          tabIndex={0}
          key={chapter.id}
          onClick={() => onSurahClicked(chapter.id)}
        >
          <SurahPreview
            chapterId={Number(chapter.id)}
            description={`${chapter.versesCount} Ayahs`}
            surahName={`${chapter.transliteratedName}`}
            surahNumber={
              isDescending
                ? QURAN_CHAPTERS_COUNT - Number(revelationOrderIndex)
                : Number(revelationOrderIndex + 1)
            } // Show the number based on the revelation order instead of the surah number.
            // translatedSurahName={getTranslatedSurahName(chapter, t, lang)}
            translatedSurahName={chapter.translatedName as string}
            locale={locale}
            // isLoading={isLoading && clickedSurahId === chapter.id}
          />
        </RevelationOrderViewRoot>
      ))}
    </React.Fragment>
  )
}

export default RevelationOrderView
