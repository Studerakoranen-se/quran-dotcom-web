import * as React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
// import { SITE_NAME } from '~/utils/constants'
import * as blockVariants from '~/blocks'
import { createRenderBlock } from '~/utils'
import { MetaData } from '~/components'
import { i18n } from '../../../locales'

const renderBlock = createRenderBlock(blockVariants)

const makeUrl = (isHomePage, locale, uri) => {
  if (isHomePage) {
    if (locale === 'en') {
      return `${process.env.APP_URL}/en`.replace(/\/$/, '')
    }
    return `${process.env.APP_URL}`.replace(/\/$/, '')
  }

  if (locale === 'en') {
    return `${process.env.APP_URL}/en/${uri}`.replace(/\/$/, '')
  }
  return `${process.env.APP_URL}/${uri}`.replace(/\/$/, '')
}

function Page(props) {
  const {
    blocks,
    // children,
    uri,
    title,
    fallbackSeo,
    seo,
    siteTitle,
    locale,
    defaultLocale,
    hasError,
    isHomePage = false,
  } = props

  if (hasError) {
    return <div>Error</div>
  }

  const url = makeUrl(isHomePage, locale || defaultLocale, uri)

  const alternates = i18n.languages.map((alternateLocale) => ({
    hreflang: alternateLocale.id,
    href: makeUrl(isHomePage, alternateLocale.id, uri),
  }))

  return (
    <React.Fragment>
      <MetaData
        component={Head}
        fallbackSeo={fallbackSeo}
        seo={seo}
        siteTitle={siteTitle}
        title={title}
        url={url}
        canonicalUrl={url}
        alternates={alternates}
      />

      {/* {children} */}
      {blocks?.map(renderBlock)}
      {/* <SearchSection /> */}
    </React.Fragment>
  )
}

Page.propTypes = {
  // children: PropTypes.node,
  blocks: PropTypes.array,
  uri: PropTypes.string,
  title: PropTypes.string,
  fallbackSeo: PropTypes.object,
  seo: PropTypes.object,
  siteTitle: PropTypes.string,
  locale: PropTypes.string,
  defaultLocale: PropTypes.string,
  hasError: PropTypes.string,
  isHomePage: PropTypes.bool,
}

export default Page
