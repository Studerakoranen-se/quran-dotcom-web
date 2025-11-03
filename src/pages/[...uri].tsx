import { GetStaticProps } from 'next'
import { getClient as getSanityClient, pageTypeQuery, SiteSettingsQueryResult } from '~/api/sanity'
import { PageTypeQueryResult, siteSettingsQuery } from '~/api/sanity/queries'
import type { GetBlockPropsFunctions } from '~/blocks/getBlockProps'
import * as blockPropGetters from '~/blocks/getBlockProps'
import { createGetBlocksProps, nextUriToString } from '~/utils'

export { default } from '~/containers/Page'

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
  const uriString = nextUriToString(uri)
  const currentLocale = locale || 'en'
  const currentDefaultLocale = defaultLocale || 'en'

  const sanityClient = getSanityClient(preview)

  const [page, settings] = await Promise.all([
    (sanityClient as any).fetch(pageTypeQuery, {
      documentTypes: ['course', 'page', 'blog'],
      uri: currentLocale !== 'sv' ? `${currentLocale}/${uriString}` : uriString,
      locale: currentLocale,
      localeUnderscoreCountry: currentLocale?.replace('-', '_'),
      preview,
      defaultLocale: currentDefaultLocale,
    }) as unknown as PageType | null,
    (sanityClient as any).fetch(siteSettingsQuery, {
      locale: currentLocale,
      preview,
      defaultLocale: currentDefaultLocale,
    }) as SiteSettingsQueryResult | null,
  ])

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
        locale: currentLocale,
        defaultLocale: currentDefaultLocale,
        page: {
          ...page,
          blocks: blocksWithData,
          seo: page?.seo ?? {},
          siteTitle: settings?.siteTitle,
          fallbackSeo: settings?.seo ?? {},
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
