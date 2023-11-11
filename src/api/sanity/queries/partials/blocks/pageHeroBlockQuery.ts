import mediaQuery, { MediaQueryResult } from '../mediaQuery'

export interface PageHeroBlockQueryResult {
  id?: string
  headline?: string
  mediaProps?: MediaQueryResult
  fullHeight?: boolean
  textColor?: {
    hex?: string
  }
}

export default `
  id,
  headline,
  mediaProps{${mediaQuery}},
  "textColor": textColor.hex,
  fullHeight
`
