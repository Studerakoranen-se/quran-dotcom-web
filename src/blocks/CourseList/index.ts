
import { ApiClient, } from '~/utils';

export { default } from './CourseList'

export async function getBlockProps(block: Block) {

    if (!block.props) {
        return {}
    }

    const apiClient = new ApiClient(process.env.APP_URL)
    const result = await apiClient?.request('GET', `api/v1/course/list`, {
        redirect: 'follow',
    })

    if (result) {
        return {
            ...block.props,
            entries: result,
        }
    }
    return block.props
}
