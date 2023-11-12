import { GetStaticProps } from 'next'
import * as blockPropGetters from '~/blocks/getBlockProps'
import type { GetBlockPropsFunctions } from '~/blocks/getBlockProps'
import { PageTypeQueryResult, siteSettingsQuery } from '~/api/sanity/queries'
import { ApiClient, createGetBlocksProps, formatChapters, nextUriToString } from '~/utils'
import { getClient as getSanityClient, pageTypeQuery, SiteSettingsQueryResult } from '~/api/sanity'

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

export const getStaticProps: GetStaticProps = async (context) => {
  const { params = {}, locale, preview = false, defaultLocale } = context

  const { uri } = params

  const sanityClient = getSanityClient(preview)
  const apiClient = new ApiClient(process.env.QURAN_API_V3)

  const uriString = nextUriToString(uri)
  console.log('uriString', uriString)
  // const page = pages.Course

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

  if (uriString.includes('surah')) {
    const promises = [
      apiClient?.request(
        'GET',
        `chapters/${[
          uri?.[1],
        ]}/verses?recitation=1&translations=21&language=${locale}&text_type=words&per_page=1000&tafsirs=169,381,165,164`,
      ),
      apiClient?.request('GET', `chapters/${uri?.[1]}?language=${locale}`),
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
              // startAt: startAt || 1,
              startAt: 1,
              chapterId: uri?.[1],
              locale,
            },
          },
        ],
        null,
        context,
      )

      return {
        props: {
          page: {
            locale,
            defaultLocale,
            blocks,
            title: chapterInfo?.transliteratedName || null,
            uri: uriString,
            fallbackSeo: {},
            seo: {},
          },
          settings,
        },
        revalidate: 604800, // chapters will be generated at runtime if not found in the cache, then cached for subsequent requests for 7 days.
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
        headerMode: page?.headerMode ?? 'auto',
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
    revalidate: 604800,
  }
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
