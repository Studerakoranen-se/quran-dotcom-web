import { MediaQueryResult } from '../mediaQuery'

export interface CourseListBlockQueryResult {
  heading: string
  text: string
  entries: {
    title: string
    description: string
    image: MediaQueryResult
    uri: string
  }[]
}

export default `
  heading,
  text,
  entries[]->{
    title,
    description,
    image,
    'uri': uri.current
  }
`
