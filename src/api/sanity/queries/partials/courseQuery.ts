// @ts-nocheck
import blocksQuery, { BlocksQueryResult } from './blocksQuery'

export interface CourseQueryResult
  extends Pick<NonNullable<Sanity.ProductionWorkspace.Schema.Page>, 'title' | 'seo'> {
  uri?:
    | NonNullable<NonNullable<Sanity.ProductionWorkspace.Schema.Page>['uri']>['current']
    | undefined
  blocks?: BlocksQueryResult[]
}

export default `
  title,
  'uri': uri.current,
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
