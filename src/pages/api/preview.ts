// https://www.sanity.io/guides/nextjs-live-preview
import type { NextApiRequest, NextApiResponse } from 'next'
import groq from 'groq'
// import { createClient } from 'next-sanity'
// import getSecret, { SECRET_ID } from '~/utils/getSecret'
import { previewClient } from '~/api/sanity'
import { i18n } from '../../../locales'

// const sanityClient = createClient({
//   apiVersion: process.env.SANITY_API_VERSION as string,
//   dataset: process.env.SANITY_DATASET as string,
//   projectId: process.env.SANITY_PROJECT_ID as string,
// })

// function redirectToPreview(
//   res: NextApiResponse<string | void>,
//   previewData: { token?: string },
//   Location: string,
// ): void {
//   // Enable Preview Mode by setting the cookies
//   res.setPreviewData(previewData)
//   // Redirect to a preview capable route
//   // FIXME: https://github.com/sanity-io/nextjs-blog-cms-sanity-v3/issues/95
//   // res.writeHead(307, { Location })
//   res.writeHead(307, {
//     Location,
//   })
//   res.end()
// }

export default async function preview(req: NextApiRequest, res: NextApiResponse<string | void>) {
  const { query } = req

  // Check the URL has a valid ?uri param
  if (!query.uri) {
    return res.status(401).send('No uri')
  }

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (!query.secret) {
    return res.status(401).send('No secret in URL')
  }

  // This secret should only be known to this API route and the CMS
  if (query.secret !== process.env.PREVIEW_SECRET) {
    // @ts-ignore
    return res.status(401).json({ message: 'Invalid secret token' })
  }

  const validSlug = await previewClient.fetch(
    groq`*[_type in $documentTypes && uri.current == $uri && __i18n_lang == $locale][0].uri.current`,
    {
      uri: query.uri,
      locale: query.locale || i18n.base,
      documentTypes: ['page', 'blog', 'course'],
    },
  )

  if (!validSlug) {
    return new Response('Invalid slug', { status: 401 })
  }

  // const token = process.env.SANITY_WRITE_TOKEN

  // if (!token) {
  //   throw new Error(
  //     'A secret is provided but there is no `SANITY_API_READ_TOKEN` environment variable setup.',
  //   )
  // }

  // const client = sanityClient.withConfig({ useCdn: false, token })
  // @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // const validSecret = await getSecret(client, SECRET_ID)

  // if (validSecret !== query.secret) {
  //   return res.status(401).send('Invalid secret')
  // }

  // console.log({ validSlug, uri: query.uri })

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched post
  res.writeHead(307, { Location: `/${query.locale || i18n.base}/${query.uri}` ?? `/` })

  return res.end()
  // return redirectToPreview(res, { token }, `/${query.uri}` ?? `/`)
}
