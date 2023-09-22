import createLinkQuery from '../createLinkQuery'
import mediaQuery, { MediaQueryResult } from '../mediaQuery'

export interface CourseHeroBlockQueryResult {
  id?: string
  text?: string
  mediaProps?: MediaQueryResult
  layoutReverse?: boolean
  enablePattern?: boolean
}

export default `
  id,
  text,
  mediaProps{${mediaQuery}},
  layoutReverse,
  enablePattern,
  enableHorizontalLine,
  largeMedia,
  ctaLabel,
  'ctaUrl': ${createLinkQuery('ctaUrl')}
`
