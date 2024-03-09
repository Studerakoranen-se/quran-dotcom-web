import type { GetServerSidePropsContext, GetStaticPropsContext } from 'next'
import type { BlocksQueryResult } from '~/api/sanity/queries'
import type { GetBlockPropsFunctions } from '~/blocks/getBlockProps'

export default function createGetBlocksProps<T>(blockPropGetters: GetBlockPropsFunctions<T>) {
  return async function getBlocksProps(
    blocks: BlocksQueryResult[],
    page: T,
    context: GetServerSidePropsContext | GetStaticPropsContext,
  ) {
    const blocksPromises = blocks?.map((block) =>
      transformBlock<T>(block, page, context, blockPropGetters),
    )

    let blocksWithData = blocks
    if (blocksPromises) {
      blocksWithData = await Promise.all(blocksPromises)
    }

    return blocksWithData
  }
}

async function transformBlock<T>(
  block: BlocksQueryResult,
  page: T,
  context: GetServerSidePropsContext | GetStaticPropsContext,
  blockPropGetters: GetBlockPropsFunctions<T>,
) {
  if (!block.name || !block.props) {
    return block
  }

  const getBlockProps = blockPropGetters[block.name]
  let blockProps = { ...block.props }

  if (getBlockProps) {
    blockProps = await getBlockProps(block, page, context)
  }

  // fetch child block props
  if (block.props.children && block.props.children.length > 0) {
    blockProps.children = await Promise.all(
      block.props.children.map(async (childBlock) =>
        transformBlock(childBlock, page, context, blockPropGetters),
      ),
    )
  }

  return {
    name: block.name,
    props: blockProps,
  }
}
