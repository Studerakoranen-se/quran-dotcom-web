import * as React from 'react'
import { PortableText } from '@portabletext/react'
import { Typography, Button } from '@mui/material'
import { Html } from '~/components'
import { PortableTextBlock } from '@portabletext/types'

const serializers = {
  // types: {
  //   block: (props) => {
  //     const { style = 'normal', markDefs } = props.node
  //     if (['preamble1', 'preamble2'].includes(style)) {
  //       return (
  //         <Typography variant={style} className={style}>
  //           {props.children}
  //         </Typography>
  //       )
  //     }
  //     if (['button'].includes(style)) {
  //       return (
  //         <Button href={markDefs[0]?.href} variant="contained">
  //           {props.children}
  //         </Button>
  //       )
  //     }
  //     return BlockContent.defaultSerializers.types.block(props)
  //   },
  // },
}

type SanityHtmlProps = {
  blocks: PortableTextBlock[]
}

const SanityHtml = React.forwardRef(function SanityHtml(props: SanityHtmlProps, ref) {
  const { blocks, ...other } = props

  return (
    <Html ref={ref} {...other}>
      <PortableText components={serializers} value={blocks} />
    </Html>
  )
})

export default SanityHtml
