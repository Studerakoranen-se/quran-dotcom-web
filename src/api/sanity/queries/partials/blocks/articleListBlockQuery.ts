// @ts-nocheck
import createImageQuery, { ImageQueryResult } from '../createImageQuery'
import createLinkQuery from '../createLinkQuery'

export interface ArticleListBlockQueryResult
  extends Pick<Sanity.Schema.ArticleListBlock, 'heading' | 'subheading'> {
  articles: {
    title?: string
    mediaProps?: ImageQueryResult
    date?: string
    url?: string
  }[]
}

// 'articles': *[_type == 'blog' $excludeDrafts] | order(publishedDate desc){
//   title,
//   subheading,
//   ctaText,
//   'mediaProps': {${createImageQuery('coalesce(image, mediaProps)', true)}},
//   'date': publishedDate,
//   'url': select(
//     defined(url) => ${createLinkQuery('url')},
//     '/' + uri.current
//   )
//   }

// TODO: this query should probably coalesce on drafts and published articles so you get draft articles when you preview the article list block
export default `
  heading,
  subheading
`
