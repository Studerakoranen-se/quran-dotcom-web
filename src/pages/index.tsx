import { GetStaticPropsContext } from 'next'
import {
  frontpageQuery,
  FrontpageQueryResult,
  getClient as getSanityClient,
  siteSettingsQuery,
  SiteSettingsQueryResult,
} from '~/api/sanity'
import type { GetBlockPropsFunctions } from '~/blocks/getBlockProps'
import * as blockPropGetters from '~/blocks/getBlockProps'
import { ChaptersResponse } from '~/types/ApiResponses'
import ChaptersData from '~/types/ChaptersData'
import { createGetBlocksProps } from '~/utils'
import { getAllChaptersData } from '~/utils/chapter'

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
  const currentLocale = locale || 'en'
  const currentDefaultLocale = defaultLocale || 'en'
  const sanityClient = getSanityClient(preview)

  const allChaptersData = await getAllChaptersData(currentLocale)
  const chaptersResponse = {
    chapters: Object.keys(allChaptersData).map((chapterId) => {
      const chapterData = allChaptersData[chapterId]
      return { ...chapterData, id: Number(chapterId) }
    }),
  }

  const [page, settings] = await Promise.all([
    (sanityClient as any).fetch(frontpageQuery, {
      locale: currentLocale,
      preview,
      defaultLocale: currentDefaultLocale,
    }),
    (sanityClient as any).fetch(siteSettingsQuery, {
      locale: currentLocale,
      preview,
      defaultLocale: currentDefaultLocale,
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
        defaultLocale: currentDefaultLocale,
        locale: currentLocale,
        settings,
        page: {
          blocks: blocksWithData,
          seo: page?.seo,
          siteTitle: settings?.siteTitle,
          fallbackSeo: settings?.seo,
          uri: page.uri,
          chaptersData: allChaptersData,
          chaptersResponse,
          isHomePage: true,
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
