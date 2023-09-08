import createLinkQuery from '../createLinkQuery'

export interface CoursesBlockQueryResult {
  entries?: string
}

export default `
  entries[]{
   heading,
   text,
   ctaLabel,
  'ctaUrl': ${createLinkQuery('ctaUrl')}
  }
`
