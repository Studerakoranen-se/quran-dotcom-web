import { GetStaticPropsContext } from 'next';
import { ApiClient, formatChapters, formatJuzs } from '~/utils';

export { default } from './Surah'

export async function getBlockProps(
    block: Block,
    pageProps,
    context: GetStaticPropsContext,
) {

    if (!block.props) {
        return {}
    }

    const { locale, params = {} } = context
    // const { country, market, pricelist } = params

    const apiClient = new ApiClient(process.env.QURAN_API_V3)
    console.log("apiClient", apiClient)
    const promises = [
        apiClient?.request('GET', `chapters/${1}/verses?recitation=1&translations=21&language=${locale}&text_type=words&per_page=1000&tafsirs=169,381,165,164`),
        apiClient?.request('GET', `chapters/${1}?language=${locale}`),
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
