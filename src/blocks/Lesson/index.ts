import { GetStaticPropsContext } from 'next'

export { default } from './Lesson'

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
