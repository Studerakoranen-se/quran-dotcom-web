import { Media, MediaReveal } from '@noaignite/oui'
import { Container, styled } from '@mui/material'
import { PortableTextBlock } from '@portabletext/types'
import { transformSanityMedia } from '~/api/sanity/utils'
import { SanityHtml } from '~/containers'

const EditorialRoot = styled('section')<{ ownerState: { layoutReverse?: boolean } }>(
  ({ theme, ownerState }) => ({
    position: 'relative',
    backgroundColor: theme.vars.palette.background.default,
    ccolor: theme.vars.palette.text.primary,
    padding: theme.spacing(3.5),

    ...(!ownerState?.layoutReverse && {
      boxShadow:
        theme.palette.mode === 'light'
          ? 'inset 0px 4px 190px -43px rgb(221 221 221 / 30%)'
          : 'inset 0px 4px 190px -43px #006C6C',
    }),
  }),
)

const EditorialBackground = styled('div')(({ theme }) => ({
  ...theme.mixins.absolute(0),
  zIndex: 0,
  '& *:not(style)': {
    height: '100%',
  },
  background:
    theme.palette.mode === 'light'
      ? `linear-gradient(
    180.03deg,
    #rgb(255 255 255) 16%,
    #ecebeb 61.39%,
    #rgb(255 255 255) 104.17%
  ), url('/assets/bgpattern.svg')`
      : `linear-gradient(
    180.03deg,
    #043b3b 16%,
    rgba(4, 59, 59, 0.85) 61.39%,
    #043b3b 104.17%
  ), url('/assets/bgpattern.svg')`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
}))

const EditorialContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'grid',
  padding: theme.spacing(8, 0),
  justifyItems: 'center',
  alignItems: 'center',
  zIndex: 1,
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: theme.spacing(12),
    padding: theme.spacing(8),
  },
}))

const EditorialMediaReveal = styled(MediaReveal)<{ ownerState: { layoutReverse?: boolean } }>(
  ({ theme, ownerState }) => ({
    ...(ownerState?.layoutReverse
      ? {
          order: -1,
          [theme.breakpoints.down('md')]: {
            marginBottom: theme.spacing(8),
          },
        }
      : {
          [theme.breakpoints.down('md')]: {
            marginTop: theme.spacing(8),
          },
        }),
  }),
)

type EditorialProps = {
  text: PortableTextBlock[]
  mediaProps: any
  layoutReverse?: boolean
  enablePattern?: boolean
}

function Editorial(props: EditorialProps) {
  const { text, mediaProps: sanityMediaProps, layoutReverse, enablePattern } = props

  const mediaProps = transformSanityMedia(sanityMediaProps, {
    img: {
      dpr: 2,
      width: 1280,
      height: 720,
    },
  })

  return (
    <EditorialRoot
      ownerState={{
        layoutReverse,
      }}
    >
      {enablePattern && <EditorialBackground />}
      <Container maxWidth="xl">
        <EditorialContainer>
          {text && <SanityHtml blocks={text} />}
          {mediaProps && (
            <EditorialMediaReveal ownerState={{ layoutReverse }} aspectRatio>
              <Media
                {...(mediaProps?.component === 'video'
                  ? {
                      autoPlay: true,
                      muted: true,
                      loop: true,
                      playsInline: true,
                    }
                  : { alt: '' })}
                {...mediaProps}
              />
            </EditorialMediaReveal>
          )}
        </EditorialContainer>
      </Container>
    </EditorialRoot>
  )
}

export default Editorial
