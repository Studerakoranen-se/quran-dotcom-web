import { GetStaticProps } from 'next'
import * as blockPropGetters from '~/blocks/getBlockProps'
import { createGetBlocksProps,
  // nextUriToString
} from '~/utils'
import { pages, settings } from '~/api/__mock__'

export { default } from '~/containers/Page'

const getBlocksProps = createGetBlocksProps<Block, Page>(blockPropGetters)

export const getStaticProps: GetStaticProps = async (context) => {
  const {
    // params = {},
    locale, preview = false, defaultLocale } = context
  // const { uri } = params

  // const uriString = nextUriToString(uri)

  const page = pages.PrivateCourse

  if (page) {
    const blocksWithData = page?.blocks ? await getBlocksProps(page.blocks, page, context) : []

    return {
      props: {
        headerMode: 'auto',
        page: {
          ...page,
          blocks: blocksWithData,
        },
        settings,
        preview,
        locale,
        defaultLocale,
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
