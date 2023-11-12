export interface AccordionsBlockQueryResult {
  entries?: {
    heading?: string
    entries: {
      heading?: string
      text: any
    }[]
  }[]
}

export default `
  entries[]{
    heading,
    entries[]{
      heading,
      text
    }
  }
`
