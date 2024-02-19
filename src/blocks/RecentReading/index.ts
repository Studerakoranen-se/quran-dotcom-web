import { GetStaticPropsContext } from 'next'

export { default } from './RecentReading'

export async function getBlockProps(block: Block, _, context: GetStaticPropsContext) {
  if (!block.props) {
    return {}
  }

  const { locale } = context

  return {
    ...block.props,
    locale,
  }
}
