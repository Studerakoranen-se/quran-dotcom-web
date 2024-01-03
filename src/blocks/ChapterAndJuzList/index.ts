import { GetStaticPropsContext } from 'next'

export { default } from './ChapterAndJuzList'

export async function getBlockProps(block: Block, pageProps, context: GetStaticPropsContext) {
  if (!block.props) {
    return {}
  }

  const { locale } = context

  if (pageProps.page.chaptersResponse) {
    return {
      ...block.props,
      locale,
      chapters: pageProps.page.chaptersResponse.chapters,
    }
  }

  return block.props
}
