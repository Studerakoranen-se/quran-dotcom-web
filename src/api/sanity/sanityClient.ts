import { createClient } from '@sanity/client'
import config from './config'

const defaultClient = createClient({
  ...config,
  useCdn: process.env.NODE_ENV === 'production',
})

const previewClient = createClient({
  ...config,
  token: process.env.SANITY_READ_TOKEN,
  useCdn: false,
  perspective: 'previewDrafts',
})

const writeClient = createClient({
  ...config,
  token: process.env.SANITY_WRITE_TOKEN,
})

function getClient(preview = false) {
  return preview ? previewClient : defaultClient
}

export default defaultClient
export { getClient, previewClient, writeClient }
