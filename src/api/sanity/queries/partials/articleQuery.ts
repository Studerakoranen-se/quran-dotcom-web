// @ts-nocheck
import blocksQuery, { BlocksQueryResult } from './blocksQuery'

export interface ArticleQueryResult extends Pick<Sanity.Schema.Article, 'title' | 'seo'> {
  uri?: NonNullable<Sanity.Schema.Article['uri']>['current'] | undefined
  date?: Sanity.Schema.Article['publishedDate']
  blocks?: BlocksQueryResult[]
}

export default `
  title,
  headerMode,
  'uri': uri.current,
  'date': publishedDate,
  'blocks': blocks[]{${blocksQuery}},
   defined(seo) => { seo {
      metaDesc,
      metaTitle,
      shareDesc,
      shareGraphic,
      shareTitle
    },
  }
`
