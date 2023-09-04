import { ApiClient, formatTutors, } from '~/utils';

export { default } from './Tutors'

export async function getBlockProps(block: Block) {

    if (!block.props) {
        return {}
    }

    const apiClient = new ApiClient(process.env.APP_URL)
    const result = await apiClient?.request('GET', `api/v1/teacher/list`, {
        redirect: 'follow',
    })

    if (result) {
        return {
            ...block.props,
            entries: formatTutors(result),
        }
    }
    return block.props
}
