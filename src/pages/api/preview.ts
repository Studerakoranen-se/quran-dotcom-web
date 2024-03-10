/* eslint-disable consistent-return */
import type { NextApiRequest, NextApiResponse } from 'next'
// import { isString, SanityClient } from 'sanity'
import groq from 'groq'
import { createClient } from 'next-sanity'
import getSecret, { SECRET_ID } from '~/utils/getSecret'
import { previewClient } from '~/api/sanity'
import { i18n } from '../../../locales'

const sanityClient = createClient({
  apiVersion: process.env.SANITY_API_VERSION as string,
  dataset: process.env.SANITY_DATASET as string,
  projectId: process.env.SANITY_PROJECT_ID as string,
})

export const STUDIO_URL_DEV = 'http://localhost:3333'
export const STUDIO_URL_PROD = 'https://studerakoranen.sanity.studio'

export const WEBSITE_URL_DEV = 'http://localhost:3000'
export const WEBSITE_URL_PROD = 'https://studerakoranen.nu'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req
  const host = req.headers.host

  const token = process.env.SANITY_WRITE_TOKEN

  if (!token) {
    throw new Error(
      'A secret is provided but there is no `SANITY_READ_TOKEN` environment variable setup.',
    )
  }

  if (req.query.fetch) {
    // Allow requests from the Studio's URL
    const corsOrigin = host?.includes('localhost')
      ? // Possibly required for Node 18 which doesn't like "localhost"
        // STUDIO_URL_DEV.replace("//localhost:", "//127.0.0.1:")
        // Otherwise fine on Node 16
        STUDIO_URL_DEV
      : STUDIO_URL_PROD
    res.setHeader('Access-Control-Allow-Origin', corsOrigin)
    res.setHeader('Access-Control-Allow-Credentials', 'true')
  }

  // Check the URL has a valid ?uri param
  if (!query.uri) {
    return res.status(401).send('No uri')
  }

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (!query.secret) {
    return res.status(401).send('No secret in URL')
  }

  const validSlug = await previewClient.fetch(
    groq`*[_type in $documentTypes && uri.current == $uri && __i18n_lang == $locale][0].uri.current`,
    {
      uri: query.uri,
      locale: query.locale || i18n.base,
      documentTypes: ['page', 'blog', 'course', 'blog'],
    },
  )

  if (!validSlug) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  const client = sanityClient.withConfig({ useCdn: false, token })

  // The secret can't be stored in an env variable with a NEXT_PUBLIC_ prefix, as it would make you
  // vulnerable to leaking the token to anyone. If you don't have an custom API with authentication
  // that can handle checking secrets, you may use https://github.com/sanity-io/sanity-studio-secrets
  // to store the secret in your dataset.
  // @ts-ignore
  const storedSecret = await getSecret(client, SECRET_ID, true)

  // This is the most common way to check for auth, but you to use your existing auth
  // infra to protect your token and securely transmit it to the client

  // if (storedSecret !== query.secret) {
  //   return res.status(401).send('Invalid secret')
  // }

  if (!storedSecret) {
    return res.status(401).send('Invalid secret')
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({ token })

  // Return just the HTML if the SEO plugin is requesting it

  if (req.query.fetch) {
    // Create preview URL
    const baseOrigin = host?.includes('localhost') ? WEBSITE_URL_DEV : WEBSITE_URL_PROD
    const absoluteUrl = new URL(validSlug, baseOrigin).toString()

    // Create preview headers from the setPreviewData above
    const previewHeader = res.getHeader('Set-Cookie')
    const previewHeaderString =
      typeof previewHeader === 'string' || typeof previewHeader === 'number'
        ? previewHeader.toString()
        : previewHeader?.join('; ')
    const headers = new Headers()
    headers.append('credentials', 'include')
    headers.append('Cookie', previewHeaderString ?? '')

    const previewHtml = await fetch(absoluteUrl, { headers })
      .then((previewRes) => previewRes.text())
      .catch((err) => console.error(err))

    return res.send(previewHtml)
  }
  // Redirect to the path from the fetched post
  res.writeHead(307, { Location: `/${validSlug}` ?? `/` })

  res.end()
}
