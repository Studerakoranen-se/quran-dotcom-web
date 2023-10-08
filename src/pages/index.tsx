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

export { default } from '~/containers/Page'

const getBlocksProps = createGetBlocksProps(
  blockPropGetters as GetBlockPropsFunctions<{
    page: FrontpageQueryResult
    settings: SiteSettingsQueryResult | null
    preview: boolean
  }>,
)

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale, defaultLocale, preview = false } = context
  const sanityClient = getSanityClient(preview)

  const [page, settings] = await Promise.all([
    // @ts-ignore
    sanityClient.fetch(frontpageQuery, {
      locale,
      preview,
      defaultLocale,
    }) as FrontpageQueryResult | null,
    sanityClient.fetch(siteSettingsQuery, {
      locale,
      preview,
      defaultLocale,
    }) as SiteSettingsQueryResult | null,
  ])

  if (page) {
    const blocksWithData = page?.blocks
      ? // @ts-ignore
        await getBlocksProps(page.blocks, { page, settings, preview }, context)
      : []

    console.log({ settings })
    return {
      props: {
        headerMode: 'auto',
        defaultLocale: context.defaultLocale,
        locale: context.locale,
        settings,
        page: {
          blocks: blocksWithData,
          // siteTitle: settings?.siteTitle,
          // fallbackSeo: settings?.seo,
          uri: page.uri,
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
