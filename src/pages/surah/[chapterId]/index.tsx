import { GetStaticProps } from 'next'
import { getChapterIdBySlug, getChapterInfo, getChapterVerses, getPagesLookup } from '~/api'
import { getClient as getSanityClient, SiteSettingsQueryResult } from '~/api/sanity'
import { PageTypeQueryResult, siteSettingsQuery } from '~/api/sanity/queries'
import type { GetBlockPropsFunctions } from '~/blocks/getBlockProps'
import * as blockPropGetters from '~/blocks/getBlockProps'
import { getQuranReaderStylesInitialState } from '~/store/defaultSettings/util'
import { PagesLookUpResponse } from '~/types/ApiResponses'
import {
  createGetBlocksProps,
  formatStringNumber,
  getAllChaptersData,
  getChapterData,
  getDefaultWordFields,
  getMushafId,
  getVerseAndChapterNumbersFromKey,
  isValidChapterId,
  isValidVerseKey,
  nextUriToString,
  ONE_WEEK_REVALIDATION_PERIOD_SECONDS,
} from '~/utils'
import { generateVerseKeysBetweenTwoVerseKeys } from '~/utils/verseKeys'

export { default } from '~/containers/Page'

// type PageType = PageTypeQueryResult<'article' | 'course' | 'page'>
type PageType = PageTypeQueryResult<'course' | 'page'>

const getBlocksProps = createGetBlocksProps<{
  page: PageType
  settings: SiteSettingsQueryResult | null
  preview: boolean
}>(
  blockPropGetters as GetBlockPropsFunctions<{
    page: PageType
    settings: SiteSettingsQueryResult | null
    preview: boolean
  }>,
)

// TODO: this needs to be localized and also reflected in next-sitemap.js
const AYAH_KURSI_SLUGS = ['ayatul-kursi', 'آیت الکرسی']

export const getStaticProps: GetStaticProps = async (context) => {
  const { params = {}, locale, preview = false, defaultLocale } = context

  const { chapterId: uri } = params

  const uriString = nextUriToString(uri)

  let chapterIdOrVerseKeyOrSlug = String(params.chapterId || '')
  let isChapter = isValidChapterId(chapterIdOrVerseKeyOrSlug)
  const currentLocale = locale || 'en'
  const currentDefaultLocale = defaultLocale || 'en'
  const chaptersData = await getAllChaptersData(currentLocale)

  const sanityClient = getSanityClient(preview)

  const settings = (await (sanityClient as any).fetch(siteSettingsQuery, {
    locale: currentLocale,
    preview,
    defaultLocale: currentDefaultLocale,
  })) as SiteSettingsQueryResult | null

  // initialize the value as if it's chapter
  let chapterId = chapterIdOrVerseKeyOrSlug
  // if it's not a valid chapter id and it's not a valid verse key, will check if it's Ayat Al kursi or if it's a Surah slug
  if (!isChapter && !isValidVerseKey(chaptersData, chapterIdOrVerseKeyOrSlug)) {
    // if the value is a slug of Ayatul Kursi
    if (AYAH_KURSI_SLUGS.includes(chapterIdOrVerseKeyOrSlug.toLowerCase())) {
      chapterIdOrVerseKeyOrSlug = '2:255'
    } else {
      const sluggedChapterId = await getChapterIdBySlug(chapterIdOrVerseKeyOrSlug, currentLocale)
      // if it's not a valid slug
      if (!sluggedChapterId) {
        return { notFound: true }
      }
      chapterId = sluggedChapterId
      isChapter = true
    }
  }

  const defaultMushafId = getMushafId(
    getQuranReaderStylesInitialState(currentLocale).quranFont,
    getQuranReaderStylesInitialState(currentLocale).mushafLines,
  ).mushaf
  // common API params between a chapter and the verse key.
  let apiParams = {
    ...getDefaultWordFields(),
    mushaf: defaultMushafId,
  }

  let numberOfVerses = 1
  let pagesLookupResponse: PagesLookUpResponse | null = null

  // if it's a verseKey
  if (!isChapter) {
    const [extractedChapterId, verseNumber] =
      getVerseAndChapterNumbersFromKey(chapterIdOrVerseKeyOrSlug)
    chapterId = extractedChapterId
    // only get 1 verse
    apiParams = { ...apiParams, ...{ page: verseNumber, perPage: 1 } }
    pagesLookupResponse = await getPagesLookup({
      chapterNumber: Number(chapterId),
      mushaf: defaultMushafId,
      from: chapterIdOrVerseKeyOrSlug,
      to: chapterIdOrVerseKeyOrSlug,
    })
  } else {
    pagesLookupResponse = await getPagesLookup({
      chapterNumber: Number(chapterId),
      mushaf: defaultMushafId,
    })
    numberOfVerses = generateVerseKeysBetweenTwoVerseKeys(
      chaptersData,
      pagesLookupResponse.lookupRange.from,
      pagesLookupResponse.lookupRange.to,
    ).length

    // @ts-ignore
    const firstPageOfChapter = Object.keys(pagesLookupResponse.pages)[0]
    // @ts-ignore
    const firstPageOfChapterLookup = pagesLookupResponse.pages[firstPageOfChapter]
    apiParams = {
      ...apiParams,
      ...{
        perPage: 'all',
        from: firstPageOfChapterLookup.from,
        to: firstPageOfChapterLookup.to,
      },
    }
  }

  const chapterInfoResponse = await getChapterInfo(chapterId, currentLocale)

  const versesResponse = await getChapterVerses(
    formatStringNumber(chapterId),
    currentLocale,
    apiParams,
  )
  const metaData = { numberOfVerses }

  versesResponse.metaData = metaData
  versesResponse.pagesLookup = pagesLookupResponse

  const chapterResponse = {
    chapter: { ...getChapterData(chaptersData, chapterId), id: chapterId },
  }

  // TODO: we need to handle the case where we want to have more blocks in the future.
  const blocks = [
    {
      name: 'QuranReader',
      props: {
        initialData: versesResponse,
        id: chapterResponse.chapter.id,
        chapterId: uri?.[0],
        locale: currentLocale,
        chapterInfoResponse,
        chapterResponse,
      },
    },
  ]

  return {
    props: {
      locale: currentLocale,
      defaultLocale: currentDefaultLocale,
      page: {
        locale: currentLocale,
        defaultLocale: currentDefaultLocale,
        blocks,
        title: chapterResponse.chapter.transliteratedName || null,
        uri: uriString,
        fallbackSeo: {},
        seo: {},
        chaptersData,
        chapterResponse,
        versesResponse,
        isChapter,
      },
      settings,
    },
    revalidate: ONE_WEEK_REVALIDATION_PERIOD_SECONDS, // chapters will be generated at runtime if not found in the cache, then cached for subsequent requests for 7 days.
  }
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
