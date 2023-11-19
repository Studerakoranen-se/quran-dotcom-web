import createImageQuery from '../createImageQuery'
import { MediaQueryResult } from '../mediaQuery'

export interface TutorsBlockQueryResult {
  heading: string
  text: string
  entries: {
    fullname: string
    title?: string
    gender?: string
    age?: number
    fields?: string[]
    phone?: string
    email?: string
    experience?: string
    text?: any
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
    "title": coalesce(
        title[$locale],
        title[$defaultLocale]
      ),
    gender,
    age,
    experience,
    phone,
    email,
    fields,
    "text": coalesce(
        text[$locale],
        text[$defaultLocale]
      ),
    'image': {${createImageQuery('image', false)}}
  }
`
