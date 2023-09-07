import * as React from 'react'
// import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { SITE_NAME } from '~/utils/constants'
import * as blockVariants from '~/blocks'
import { createRenderBlock } from '~/utils'
// import SearchSection from '~/components/SearchSection'
// import { i18n } from '../../../locales'

const renderBlock = createRenderBlock(blockVariants)

// const makeUrl = (locale, uri) => {
//   if (locale === 'ar') {
//     return `${process.env.APP_URL}`.replace(/\/$/, '')
//   }
//   return `${process.env.APP_URL}/${uri}`.replace(/\/$/, '')
// }

function Page(props) {
  const {
    blocks,
    children,
    // uri,
    // title,
    // fallbackSeo,
    // seo,
    // siteTitle
  } = props

  // const router = useRouter()
  // const { locale } = router

  // const url = makeUrl(locale, uri)

  // const alternates = i18n.languages.map((alternateLocale) => ({
  //   hreflang: alternateLocale.id,
  //   href: makeUrl(alternateLocale.id, uri),
  // }))

  return (
    <React.Fragment>
      <Head>
        <title>{`Page | ${SITE_NAME}`}</title>
      </Head>

      {children}
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
