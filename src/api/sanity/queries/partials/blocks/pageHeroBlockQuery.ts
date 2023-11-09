import mediaQuery, { MediaQueryResult } from '../mediaQuery'

export interface PageHeroBlockQueryResult {
  id?: string
  headline?: string
  mediaProps?: MediaQueryResult
}

export default `
  id,
  headline,
  mediaProps{${mediaQuery}},
  "textColor": textColor.hex,
  fullHeight
`
