import { MediaQueryResult } from '../mediaQuery'

export interface FeatureListBlockQueryResult {
  heading: string
  text: string
  verticalLayout?: boolean
  entries: {
    title: string
    text: string
    icon: MediaQueryResult
  }[]
}

export default `
  heading,
  text,
  verticalLayout,
  entries[]{
    heading,
    text,
    icon
  }
`
