import { GetStaticProps } from 'next'
import * as blockPropGetters from '~/blocks/getBlockProps'
import type { GetBlockPropsFunctions } from '~/blocks/getBlockProps'
import { PageTypeQueryResult } from '~/api/sanity/queries'
import { createGetBlocksProps, nextUriToString } from '~/utils'
import {
  // pages,
  settings,
} from '~/api/__mock__'
import { getClient as getSanityClient, pageTypeQuery, SiteSettingsQueryResult } from '~/api/sanity'

export { default } from '~/containers/Page'

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

export const getStaticProps: GetStaticProps = async (context) => {
  const { params = {}, locale, preview = false, defaultLocale } = context

  const { uri } = params

  const sanityClient = getSanityClient(preview)

  const uriString = nextUriToString(uri)

  // const page = pages.Course
  const page = (await sanityClient.fetch(pageTypeQuery, {
    documentTypes: ['article', 'category', 'page'],
    uri: uriString,
    localeCountry: locale,
    preview,
    defaultLocale,
  })) as PageType | null

  if (page) {
    const blocksWithData = page?.blocks
      ? // @ts-ignore
        await getBlocksProps(page.blocks, { page, settings, preview }, context)
      : []

    return {
      props: {
        headerMode: 'auto',
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
    revalidate: true,
  }
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
