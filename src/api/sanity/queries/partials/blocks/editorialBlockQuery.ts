import mediaQuery, { MediaQueryResult } from '../mediaQuery'

export interface EditorialBlockQueryResult {
  id?: string
  text?: string
  mediaProps?: MediaQueryResult
  layoutReverse?: boolean
  enablePattern?: boolean
}

export default `
  text,
  mediaProps{${mediaQuery}},
  layoutReverse,
  enablePattern
`
