import { GetStaticPropsContext } from 'next';
import { ApiClient, formatChapters, formatJuzs } from '~/utils';

export { default } from './ChapterAndJuzList'

export async function getBlockProps(
    block: Block,
    pageProps,
    context: GetStaticPropsContext,
) {

    if (!block.props) {
        return {}
    }

    const { locale } = context

    const apiClient = new ApiClient(process.env.QURAN_API)



    const promises = [
        apiClient?.request('GET', `chapters?language=${locale}`),
        apiClient?.request('GET', `juzs`),
    ]



    const result = await Promise.all(promises)

    if (result[0].chapters?.length > 0 && result[1].juzs?.length > 0) {
        return {
            ...block.props,
            // @ts-ignore
            chapters: formatChapters(result[0].chapters, locale),
            juzs: formatJuzs(result[1]?.juzs)
        }
    }

    return block.props
}
