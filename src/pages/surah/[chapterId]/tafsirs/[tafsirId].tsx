/* eslint-disable max-lines */

import { GetStaticPaths, GetStaticProps } from 'next'
import { SWRConfig } from 'swr'
import { fetcher } from '~/api'
import TafsirBody from '~/blocks/QuranReader/partials/TafsirView/TafsirBody'
import { getQuranReaderStylesInitialState } from '~/store/defaultSettings/util'
import { makeTafsirContentUrl, makeTafsirsUrl } from '~/utils/apiPaths'
import { getAllChaptersData, getChapterData } from '~/utils/chapter'
import { scrollWindowToTop } from '~/utils/navigation'
import {
  ONE_WEEK_REVALIDATION_PERIOD_SECONDS,
  REVALIDATION_PERIOD_ON_ERROR_SECONDS,
} from '~/utils/staticPageGeneration'
import { isValidVerseKey } from '~/utils/validator'
import { getVerseAndChapterNumbersFromKey } from '~/utils/verse'
import styles from '../../../../blocks/QuranReader/partials/TafsirView/TafsirView.module.scss'

type AyahTafsirProp = {
  verseNumber: string
  tafsirIdOrSlug?: string
  chapterId: string
  fallback: any
  locale: string
}

const AyahTafsirPage = ({
  verseNumber,
  chapterId,
  tafsirIdOrSlug,
  fallback,
  locale,
}: AyahTafsirProp) => {
  return (
    <SWRConfig value={{ fallback }}>
      <div className={styles.tafsirContainer}>
        <TafsirBody
          shouldRender
          scrollToTop={scrollWindowToTop}
          initialChapterId={chapterId}
          initialVerseNumber={verseNumber?.toString()}
          initialTafsirIdOrSlug={tafsirIdOrSlug || undefined}
          render={({ body, languageAndTafsirSelection, surahAndAyahSelection }) => {
            return (
              <div>
                {surahAndAyahSelection}
                {languageAndTafsirSelection}
                {body}
              </div>
            )
          }}
          locale={locale}
        />
      </div>
    </SWRConfig>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  if (!params) {
    return { notFound: true }
  }

  const { chapterId, tafsirId: tafsirIdOrSlug } = params
  const verseKey = String(chapterId)
  const currentLocale = locale || 'en'
  const chaptersData = await getAllChaptersData(currentLocale)
  // if the verse key or the tafsir id is not valid
  if (!isValidVerseKey(chaptersData, verseKey)) {
    return { notFound: true }
  }
  const [chapterNumber, verseNumber] = getVerseAndChapterNumbersFromKey(verseKey)
  const { quranFont, mushafLines } = getQuranReaderStylesInitialState(currentLocale)
  try {
    const tafsirContentUrl = makeTafsirContentUrl(tafsirIdOrSlug as string, verseKey, {
      lang: currentLocale,
      quranFont,
      mushafLines,
    })
    const tafsirListUrl = makeTafsirsUrl(currentLocale)

    const [tafsirContentData, tafsirListData] = await Promise.all([
      fetcher(tafsirContentUrl),
      fetcher(tafsirListUrl),
    ])

    return {
      props: {
        chaptersData,
        chapterId: chapterNumber,
        chapter: { chapter: getChapterData(chaptersData, chapterNumber) },
        fallback: {
          [tafsirListUrl]: tafsirListData,
          [tafsirContentUrl]: tafsirContentData,
        },
        tafsirData: tafsirContentData,
        verseNumber,
        tafsirIdOrSlug,
        locale: currentLocale,
      },
      revalidate: ONE_WEEK_REVALIDATION_PERIOD_SECONDS, // verses will be generated at runtime if not found in the cache, then cached for subsequent requests for 7 days.
    }
  } catch (error) {
    console.error(error, {
      transactionName: 'getStaticProps-TafsirPage',
      metadata: {
        chapterIdOrSlug: String(params?.chapterId),
        tafsirIdOrSlug: String(params?.tafsirId),
        locale: currentLocale,
      },
    })
    return {
      notFound: true,
      revalidate: REVALIDATION_PERIOD_ON_ERROR_SECONDS,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [], // no pre-rendered chapters at build time.
  fallback: 'blocking', // will server-render pages on-demand if the path doesn't exist.
})

export default AyahTafsirPage
