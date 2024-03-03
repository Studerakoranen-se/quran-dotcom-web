import { GetStaticPropsContext } from 'next'
import * as blockPropGetters from '~/blocks/getBlockProps'
import type { GetBlockPropsFunctions } from '~/blocks/getBlockProps'
import { createGetBlocksProps } from '~/utils'
import {
  frontpageQuery,
  siteSettingsQuery,
  getClient as getSanityClient,
  FrontpageQueryResult,
  SiteSettingsQueryResult,
} from '~/api/sanity'
import { getAllChaptersData } from '~/utils/chapter'
import { ChaptersResponse } from '~/types/ApiResponses'
import ChaptersData from '~/types/ChaptersData'

export { default } from '~/containers/Page'

type ExtendedFrontpageQueryResult = FrontpageQueryResult & {
  chaptersResponse: ChaptersResponse
  chaptersData: ChaptersData
}

const getBlocksProps = createGetBlocksProps(
  blockPropGetters as GetBlockPropsFunctions<{
    page: ExtendedFrontpageQueryResult
    settings: SiteSettingsQueryResult | null
    preview: boolean
  }>,
)

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale, defaultLocale, preview = false } = context
  const sanityClient = getSanityClient(preview)

  const allChaptersData = await getAllChaptersData(locale)
  const chaptersResponse = {
    chapters: Object.keys(allChaptersData).map((chapterId) => {
      const chapterData = allChaptersData[chapterId]
      return { ...chapterData, id: Number(chapterId) }
    }),
  }

  const [page, settings] = await Promise.all([
    sanityClient.fetch(frontpageQuery, {
      locale,
      preview,
      defaultLocale,
    }),
    sanityClient.fetch(siteSettingsQuery, {
      locale,
      preview,
      defaultLocale,
    }),
  ])

  if (page) {
    page.chaptersData = allChaptersData
    page.chaptersResponse = chaptersResponse

    const blocksWithData = page?.blocks
      ? await getBlocksProps(page.blocks, { page, settings, preview }, context)
      : []

    return {
      props: {
        headerMode: page?.headerMode,
        defaultLocale: context.defaultLocale,
        locale: context.locale,
        settings,
        page: {
          blocks: blocksWithData,
          // siteTitle: settings?.siteTitle,
          // fallbackSeo: settings?.seo,
          uri: page.uri,
          chaptersData: allChaptersData,
          chaptersResponse,
        },
      },
      revalidate: 60 * 10, // 10 minutes
    }
  }
  return {
    notFound: true,
    revalidate: true,
  }
}
