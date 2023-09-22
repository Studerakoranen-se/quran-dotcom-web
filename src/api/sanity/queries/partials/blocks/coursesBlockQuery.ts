import createLinkQuery from '../createLinkQuery'
import mediaQuery, { MediaQueryResult } from '../mediaQuery'

export interface CoursesBlockQueryResult {
  entries: {
    heading: string
    text: string
    mediaProps: MediaQueryResult
    ctaLabel?: string
    ctaUrl?: string
  }[]
}

export default `
'parent': ^.parent->.name,
  entries[]{
   heading,
   text,
   ctaLabel,
  'ctaUrl': ${createLinkQuery('ctaUrl')},
  mediaProps{${mediaQuery}},
  }
`
