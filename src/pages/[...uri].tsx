import { GetStaticProps } from 'next'
import * as blockPropGetters from '~/blocks/getBlockProps'
import type { GetBlockPropsFunctions } from '~/blocks/getBlockProps'
import { PageTypeQueryResult, siteSettingsQuery } from '~/api/sanity/queries'
import {
  createGetBlocksProps,
  getChapterData,
  getAllChaptersData,
  getTranslatedVerse,
  isValidChapterId,
  isValidVerseKey,
  nextUriToString,
  getDefaultWordFields,
  getVerseAndChapterNumbersFromKey,
  formatStringNumber,
  ONE_WEEK_REVALIDATION_PERIOD_SECONDS,
  REVALIDATION_PERIOD_ON_ERROR_SECONDS,
  getMushafId,
} from '~/utils'
import { getClient as getSanityClient, pageTypeQuery, SiteSettingsQueryResult } from '~/api/sanity'
import { getChapterIdBySlug, getChapterInfo, getChapterVerses, getPagesLookup } from '~/api'
import { PagesLookUpResponse } from '~/types/ApiResponses'
import { generateVerseKeysBetweenTwoVerseKeys } from '~/utils/verseKeys'
import { getQuranReaderStylesInitialState } from '~/store/defaultSettings/util'

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

  const { uri } = params
  const uriString = nextUriToString(uri)

  let chapterIdOrVerseKeyOrSlug = String(params.uri?.[1])
  let isChapter = isValidChapterId(chapterIdOrVerseKeyOrSlug)
  const chaptersData = await getAllChaptersData(locale)

  const sanityClient = getSanityClient(preview)

  const [page, settings] = await Promise.all([
    sanityClient.fetch(pageTypeQuery, {
      documentTypes: ['course', 'page', 'blog'],
      uri: locale !== 'sv' ? `${locale}/${uriString}` : uriString,
      locale,
      localeUnderscoreCountry: locale?.replace('-', '_'),
      preview,
      defaultLocale,
    }) as unknown as PageType | null,
    sanityClient.fetch(siteSettingsQuery, {
      locale,
      preview,
      defaultLocale,
    }) as SiteSettingsQueryResult | null,
  ])

  if (uriString.includes('surah') || uriString.includes('juz')) {
    // initialize the value as if it's chapter
    let chapterId = chapterIdOrVerseKeyOrSlug
    // if it's not a valid chapter id and it's not a valid verse key, will check if it's Ayat Al kursi or if it's a Surah slug
    if (!isChapter && !isValidVerseKey(chaptersData, chapterIdOrVerseKeyOrSlug)) {
      // if the value is a slug of Ayatul Kursi
      if (AYAH_KURSI_SLUGS.includes(chapterIdOrVerseKeyOrSlug.toLowerCase())) {
        chapterIdOrVerseKeyOrSlug = '2:255'
      } else {
        const sluggedChapterId = await getChapterIdBySlug(chapterIdOrVerseKeyOrSlug, locale)
        // if it's not a valid slug
        if (!sluggedChapterId) {
          return { notFound: true }
        }
        chapterId = sluggedChapterId
        isChapter = true
      }
    }

    const defaultMushafId = getMushafId(
      getQuranReaderStylesInitialState(locale).quranFont,
      getQuranReaderStylesInitialState(locale).mushafLines,
    ).mushaf
    // common API params between a chapter and the verse key.
    let apiParams = {
      ...getDefaultWordFields(),
      mushaf: defaultMushafId,
    }

    let numberOfVerses = 1
    let pagesLookupResponse: PagesLookUpResponse | null = null

    try {
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

      const chapterInfoResponse = await getChapterInfo(chapterId, locale as string)

      const versesResponse = await getChapterVerses(
        formatStringNumber(chapterId),
        locale as string,
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
            chapterId: uri?.[1],
            locale,
            chapterInfoResponse,
            chapterResponse,
          },
        },
      ]

      return {
        props: {
          locale,
          defaultLocale,
          page: {
            locale,
            defaultLocale,
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
    } catch (error) {
      return {
        props: { hasError: true },
        revalidate: REVALIDATION_PERIOD_ON_ERROR_SECONDS, // 35 seconds will be enough time before we re-try generating the page again.
      }
    }
  }

  if (page) {
    const blocksWithData = page?.blocks
      ? await getBlocksProps(page.blocks, { page, settings, preview }, context)
      : []

    return {
      props: {
        // @ts-ignore
        headerMode: page?.headerMode,
        settings,
        preview,
        locale,
        defaultLocale,
        page: {
          ...page,
          blocks: blocksWithData,
        },
      },
      revalidate: 60 * 10,
    }
  }

  return {
    notFound: true,
    props: { hasError: true },
    revalidate: 604800,
  }
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
