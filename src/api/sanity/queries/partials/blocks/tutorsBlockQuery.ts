import createImageQuery from '../createImageQuery'
import { MediaQueryResult } from '../mediaQuery'

export interface TutorsBlockQueryResult {
  heading: string
  text: string
  entries: {
    fullname: string
    description: string
    image: MediaQueryResult
    isHidden?: boolean
  }[]
}

export default `
  heading,
  text,
  entries[]->{
    isHidden,
    fullname,
    'image': {${createImageQuery('image', false)}},
    description
  }
`
