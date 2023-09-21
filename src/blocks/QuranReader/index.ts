import { GetStaticPropsContext } from 'next'
import { ApiClient, formatChapters, formatJuzs } from '~/utils'

export { default } from './QuranReader'

export async function getBlockProps(block: Block, pageProps, context: GetStaticPropsContext) {
  if (!block.props) {
    return {}
  }

  const { locale } = context

  const apiClient = new ApiClient(process.env.QURAN_API_V3)

  const promises = [
    apiClient?.request('GET', `chapters?language=${locale}`),
    apiClient?.request('GET', `juzs`),
  ]

  const result = await Promise.all(promises)

  if (result[0].chapters?.length > 0 && result[1].juzs) {
    return {
      ...block.props,
      chapters: result[0].chapters?.map((chapter) => {
        return formatChapters(chapter, locale)
      }),
      juzs: formatJuzs(result[1]?.juzs),
    }
  }

  return block.props
}
