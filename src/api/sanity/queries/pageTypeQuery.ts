// import pageQuery from './partials/pageQuery'
// import feedQuery from './partials/feedQuery'
// import caseQuery from './partials/caseQuery'
// import serviceQuery from './partials/serviceQuery'

// const PAGE_TYPE_QUERIES = {
//   page: pageQuery,
//   case: caseQuery,
//   feed: feedQuery,
//   service: serviceQuery,
// }

// export default `
//   coalesce(
//     *[_type in $documentTypes && slug.current == $slug && _id in path("drafts.**") && $preview][0],
//     *[_type in $documentTypes && slug.current == $slug ][0],
//     *[_type in $documentTypes && slug.current == $slug && _id in path("drafts.**") && $preview ][0],
//     *[_type in $documentTypes && slug.current == $slug ][0],
//   ) {
//     ${Object.entries(PAGE_TYPE_QUERIES)
//       .map(([documentType, documentQuery]) => `_type == '${documentType}' => {${documentQuery}}`)
//       .join(',')}
//   }
// `

import pageQuery, { PageQueryResult } from './partials/pageQuery'

export interface PageTypes {
  page: PageQueryResult
}

export type PageTypeQueryResult<T extends keyof PageTypes> = PageTypes[T]

const PAGE_TYPE_QUERIES = {
  page: pageQuery,
  service: pageQuery,
}

/* resolve published pages, drafts and localized pages in this order:
  1. Try to get draft documents in the current locale
  2. Try to get published documents in the current locale
  3. Try to get draft documents in the base locale
  4. Try to get published documents in the base locale
*/

export default `
  coalesce(
    *[_type in $documentTypes && uri.current == $uri && _id in path("drafts.**") && $preview && __i18n_lang == $locale][0],
    *[_type in $documentTypes && uri.current == $uri && __i18n_lang == $locale][0],
    // *[_type in $documentTypes && uri.current == $uri && _id in path("drafts.**") && $preview && __i18n_lang == $defaultLocale][0],
    // *[_type in $documentTypes && uri.current == $uri && __i18n_lang == $defaultLocale][0],
  ) {
    ${Object.entries(PAGE_TYPE_QUERIES)
      .map(([documentType, documentQuery]) => `_type == '${documentType}' => {${documentQuery}}`)
      .join(',')}
  }
`
