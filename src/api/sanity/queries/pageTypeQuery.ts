// import pageQuery from './partials/pageQuery'
// import feedQuery from './partials/feedQuery'

import courseQuery from './partials/courseQuery'
import pageQuery, { PageQueryResult } from './partials/pageQuery'

export interface PageTypes {
  page: PageQueryResult
}

export type PageTypeQueryResult<T extends keyof PageTypes> = PageTypes[T]

const PAGE_TYPE_QUERIES = {
  page: pageQuery,
  course: courseQuery,
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
    *[_type in $documentTypes && uri.current == $uri && _id in path("drafts.**") && $preview && __i18n_lang == $defaultLocale][0],
    *[_type in $documentTypes && uri.current == $uri && __i18n_lang == $defaultLocale][0],
  ) {
    ${Object.entries(PAGE_TYPE_QUERIES)
      .map(([documentType, documentQuery]) => `_type == '${documentType}' => {${documentQuery}}`)
      .join(',')}
  }
`
