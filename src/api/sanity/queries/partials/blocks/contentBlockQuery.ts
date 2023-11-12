export interface ContentBlockQueryResult {
  id?: string
  text: any
  maxWidth?: string
  marginTop?: number
  marginBottom?: number
  textAlign?: string
  disabledPadding?: boolean
}
export default `
  id,
  "text": text[]{
    ...,
    markDefs[]{
      ...,
      _type == "link" => {
        ...,
        "type": _type,
        "href": href.reference->uri.current
      },
    },
  },
  maxWidth,
  marginTop,
  marginBottom,
  textAlign,
  disabledPadding
`
