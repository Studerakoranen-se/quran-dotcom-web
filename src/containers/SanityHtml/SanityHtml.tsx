import * as React from 'react'
import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import { Media, MediaReveal } from '@noaignite/oui'
import { SxProps, Theme, Typography } from '@mui/material'
import { Html } from '~/components'
import { transformSanityImage } from '~/api/sanity/utils'
import RouterLink from '../RouterLink'

const serializers = {
  marks: {
    link: (props: any) => {
      const href = props?.value?.href?.url || props?.value?.href
      return <RouterLink href={href}>{props?.text}</RouterLink>
    },
  },

  types: {
    media: ({ value }) => {
      const mediaProps = transformSanityImage(value.image)

      return (
        <React.Fragment>
          <MediaReveal>
            <Media
              {...(value?.mediaType === 'video' && {
                autoPlay: true,
                muted: true,
                loop: true,
                playsInline: true,
              })}
              src={mediaProps}
              alt={value?.alt}
            />
          </MediaReveal>
          {value?.alt && <Typography variant="caption2">{value?.alt}</Typography>}
        </React.Fragment>
      )
    },
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
  },
}

type SanityHtmlProps = {
  blocks: PortableTextBlock[]
  sx?: SxProps<Theme>
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
