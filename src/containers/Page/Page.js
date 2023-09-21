import * as React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { SITE_NAME } from '~/utils/constants'
import * as blockVariants from '~/blocks'
import { createRenderBlock } from '~/utils'
import { MetaData } from '~/components'
import { i18n } from '../../../locales'

const renderBlock = createRenderBlock(blockVariants)

const makeUrl = (locale, uri) => {
  if (locale === 'sv') {
    return `${process.env.APP_URL}`.replace(/\/$/, '')
  }
  return `${process.env.APP_URL}/${uri}`.replace(/\/$/, '')
}

function Page(props) {
  const { blocks, children, uri, title, fallbackSeo, seo, siteTitle, locale, defaultLocale } = props

  const url = makeUrl(locale || defaultLocale, uri)

  const alternates = i18n.languages.map((alternateLocale) => ({
    hreflang: alternateLocale.id,
    href: makeUrl(alternateLocale.id, uri),
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
      {blocks.map(renderBlock)}
      {/* <SearchSection /> */}
    </React.Fragment>
  )
}

Page.propTypes = {
  children: PropTypes.node,
  blocks: PropTypes.array,
}

export default Page
