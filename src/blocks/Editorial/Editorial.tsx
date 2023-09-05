import { Media, MediaReveal } from '@noaignite/oui'
import { Container, styled } from '@mui/material'
import { Html } from '~/components'

const EditorialRoot = styled('section')<{
  ownerState: { enablePattern?: boolean }
}>(({ theme }) => ({
  position: 'relative',
  background: theme.palette.primary.main,
  boxShadow: 'inset 0px 4px 136px rgba(0, 29, 29, 0.8)',
  color: theme.palette.common.white,
  padding: theme.spacing(3.5),
  // ...(ownerState?.enablePattern && {
  //   background: `linear-gradient(
  //   180.03deg,
  //   #043b3b 31.97%,
  //   rgba(4, 59, 59, 0.85) 61.39%,
  //   #043b3b 104.17%
  // )`,
  // }),
}))

const EditorialBackground = styled('div')(({ theme }) => ({
  ...theme.mixins.absolute(0),
  zIndex: 0,
  '& *:not(style)': {
    height: '100%',
  },
  background: `linear-gradient(
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
  padding: theme.spacing(8),
  justifyItems: 'center',
  alignItems: 'center',
  zIndex: 1,
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: theme.spacing(12),
  },
}))

const EditorialMediaReveal = styled(MediaReveal)<{ ownerState: { layoutReverse?: boolean } }>(
  ({ ownerState }) => ({
    ...(ownerState?.layoutReverse && {
      order: -1,
    }),
  }),
)

type EditorialProps = {
  children: React.ReactNode
  text: string
  mediaProps: any
  layoutReverse: boolean
  enablePattern: boolean
}

function Editorial(props: EditorialProps) {
  const { text, mediaProps, layoutReverse, enablePattern } = props

  const ownerState = {
    enablePattern,
  }
  return (
    <EditorialRoot ownerState={ownerState}>
      {enablePattern && <EditorialBackground />}
      <Container maxWidth="xl">
        <EditorialContainer>
          <Html dangerouslySetInnerHTML={{ __html: text }} />
          {mediaProps && (
            <EditorialMediaReveal
              width={mediaProps.width}
              height={mediaProps.height}
              ownerState={{ layoutReverse }}
            >
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
