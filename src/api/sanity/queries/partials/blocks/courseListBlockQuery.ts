import { MediaQueryResult } from '../mediaQuery'

export interface CourseListBlockQueryResult {
  heading: string
  text: string
  entries: {
    title: string
    description?: string
    excerpt: string
    unpublishCourse?: boolean
    image: MediaQueryResult
    uri: string
  }[]
}

export default `
  heading,
  text,
  entries[]->{
    title,
    excerpt,
    image,
    unpublishCourse,
    'uri': uri.current
  }
`
