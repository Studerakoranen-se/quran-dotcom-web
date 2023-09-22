import createImageQuery from '../createImageQuery'
import { MediaQueryResult } from '../mediaQuery'

export interface StepsBlockQueryResult {
  heading: string
  subheading: string
  enablePattern?: boolean
  entries: {
    heading: string
    text: string
    icon: MediaQueryResult
    reverseDirection?: boolean
  }[]
}

export default `
  heading,
  subheading,
  enablePattern,
  entries[]{
    heading,
    text,
    'icon': {${createImageQuery('coalesce(icon, image)', false)}},
    reverseDirection
  }
`
