import * as React from 'react'
import createImageUrlBuilder from '@sanity/image-url'
import { SITE_NAME } from '~/utils/constants'
import sanityClient from '~/api/sanity/sanityClient'

const imageUrlBuilder = createImageUrlBuilder(sanityClient)

export interface MetaDataProps<T = typeof React.Fragment> {
  alternates?: { hreflang: string; href: string }[]
  canonicalUrl?: string
  component: T
  fallbackSeo: any
  seo: any
  title?: string
  siteTitle?: string
  url?: string
}

// we need to set children to required in the type since
// Jan: OK that makes sense
// Martin: Could you guys add an explanation to the explanation?
function MetaData<T extends React.ComponentType<{ children: React.ReactNode }>>(
  props: MetaDataProps<T>,
) {
  const {
    alternates,
    canonicalUrl,
    component: Component = React.Fragment,
    title: titleProp,
    url,
    fallbackSeo,
    seo,
    siteTitle: siteTitleProp,
  } = props

  const siteTitle = siteTitleProp || SITE_NAME
  const title = seo?.metaTitle || fallbackSeo?.metaTitle || titleProp
  const shareGraphic = seo?.shareGraphic || fallbackSeo?.shareGraphic
  const shareTitle = seo?.shareTitle || fallbackSeo?.shareTitle
  const shareDesc = seo?.shareDesc || fallbackSeo?.shareDesc

  const metaDesc = seo?.metaDesc || fallbackSeo?.metaDesc

  return (
    <Component>
      <title>{title}</title>
      {metaDesc && <meta name="description" content={metaDesc} />}
      {/* TODO: use transformSanityImage on image prop  */}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />

      {shareTitle && (
        <React.Fragment>
          <meta property="og:title" content={shareTitle} />
          <meta name="twitter:title" content={shareTitle} />
        </React.Fragment>
      )}

      {shareDesc && (
        <React.Fragment>
          <meta property="og:description" content={shareDesc} />
          <meta name="twitter:description" content={shareDesc} />
        </React.Fragment>
      )}

      {shareGraphic && (
        <React.Fragment>
          <meta
            property="og:image"
            content={imageUrlBuilder.image(shareGraphic).width(1200).height(630).url()}
          />
          <meta
            name="twitter:image"
            content={imageUrlBuilder.image(shareGraphic).width(1200).height(630).url()}
          />
        </React.Fragment>
      )}
      {siteTitle && <meta property="og:site_name" content={siteTitle} />}

      {url && <meta property="og:url" content={url} />}
      {(canonicalUrl || url) && <link rel="canonical" href={canonicalUrl || url} />}
      {alternates?.map(({ hreflang, href }, idx) => (
        <link key={idx} rel="alternate" hrefLang={hreflang} href={href} />
      ))}
    </Component>
  )
}

export default MetaData
