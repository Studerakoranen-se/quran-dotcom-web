import * as React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { SiteSettingsQueryResult } from '~/api/sanity'
// import {
//   // pages,
//   settings,
// } from '~/api/__mock__'
import * as blockPropGetters from '~/blocks/getBlockProps'
import type { GetBlockPropsFunctions } from '~/blocks/getBlockProps'
import QuranReader from '~/blocks/QuranReader'
import { PageTypeQueryResult } from '~/api/sanity/queries'
import { Page } from '~/containers'
import {
  ApiClient,
  createGetBlocksProps,
  // isValidChapterId,
  formatChapters,
  // formatJuzs,
} from '~/utils'

type PageType = PageTypeQueryResult<'page'>

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

// type ChapterProps = {}
// : NextPage<ChapterProps>

const Chapter = (props: any) => {
  return (
    <Page {...props}>
      <QuranReader />
    </Page>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {
    params,
    locale,
    // preview = false,
    defaultLocale,
  } = ctx
  // @ts-ignore
  const { chapterId, startAt } = params

  const chapterIdOrVerseKeyOrSlug = String(chapterId)
  // let isChapter = isValidChapterId(chapterIdOrVerseKeyOrSlug)

  // console.log({ chapterIdOrVerseKeyOrSlug, chapterId })

  const apiClient = new ApiClient(process.env.QURAN_API_V3)

  const promises = [
    apiClient?.request(
      'GET',
      `chapters/${chapterId}/verses?recitation=1&translations=21&language=${locale}&text_type=words&per_page=1000&tafsirs=169,381,165,164`,
    ),
    apiClient?.request('GET', `chapters/${chapterId}?language=${locale}`),
  ]

  const [verses, chapter] = await Promise.all(promises)

  if (verses?.verses?.length > 0 && chapter?.chapter?.id) {
    const chapterInfo = formatChapters(chapter.chapter, locale)

    const blocks = await getBlocksProps(
      [
        {
          name: 'QuranReader',
          props: {
            // @ts-ignore
            verses: verses.verses,
            chapter: chapterInfo,
            startAt: startAt || 1,
            chapterId: chapterIdOrVerseKeyOrSlug,
            locale,
          },
        },
      ],
      null,
      ctx,
    )

    return {
      props: {
        page: {
          locale,
          defaultLocale,
          blocks,
          title: chapterInfo?.transliteratedName || null,
          uri: `surah/${chapterId}`,
          fallbackSeo: {},
          seo: {},
        },
      },
      revalidate: 60 * 10,
    }
  }

  return {
    notFound: true,
    revalidate: true,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], // no pre-rendered chapters at build time.
    fallback: 'blocking', // will server-render pages on-demand if the path doesn't exist.
  }
}

export default Chapter
