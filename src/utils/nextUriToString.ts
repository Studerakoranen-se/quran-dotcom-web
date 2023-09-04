export default function nextUriToString(nextUri: string | string[] = '') {
    return typeof nextUri === 'string' ? nextUri : nextUri.join('/')
}
