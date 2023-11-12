// @ts-nocheck
import createImageQuery, { ImageQueryResult } from '../createImageQuery'
import createLinkQuery from '../createLinkQuery'

export interface ArticleListBlockQueryResult {
  id?: string
  heading?: string
  body?: string
  articles: {
    title?: string
    excerpt?: string
    // mediaProps?: ImageQueryResult
    mediaProps?: any
    date?: string
    url?: string
    ctaLabel?: string
    ctaUrl?: string
  }[]
}

// TODO: this query should probably coalesce on drafts and published articles so you get draft articles when you preview the article list block
export default `
  heading,
  body,
  'articles': *[_type == 'blog'] | order(publishedDate desc){
    title,
    excerpt,
    'mediaProps': {${createImageQuery('coalesce(image, mediaProps)', true)}},
    'date': publishedDate,
    ctaLabel,
    'ctaUrl': select(
      defined(ctaUrl) => ${createLinkQuery('ctaUrl')},
      '/' + uri.current
    )
  }
`
