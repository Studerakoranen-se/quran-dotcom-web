import mediaQuery from '../mediaQuery'

export interface ArticleHeroBlogQueryResult {
  id?: string
  heading?: string
  subheading?: string
  fullHeight?: boolean
  textColor?: {
    hex?: string
  }
}

export default `
  id,
  heading,
  subheading,
  mediaProps{${mediaQuery}},
  fullHeight,
  "textColor": textColor.hex
`
