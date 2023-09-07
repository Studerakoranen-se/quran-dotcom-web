// @ts-nocheck
import createLinkQuery, { LinkQueryResult } from './createLinkQuery'

export interface MenuQueryResult
  extends Pick<NonNullable<Sanity.ProductionWorkspace.Schema.MenuItem>, 'label' | 'menuItems'> {
  url?: LinkQueryResult
}

export default `
  "label": coalesce(label, url.reference->title),
  defined(url) => {'url': ${createLinkQuery('url')}},
  menuItems[]{
    "label": coalesce(label, url.reference->title),
    defined(url) => {'url': ${createLinkQuery('url')}},
    menuItems[]{
      "label": coalesce(label, url.reference->title),
      defined(url) => {'url': ${createLinkQuery('url')}},
    },
  },
`
