import * as React from 'react'
import { styled } from '@mui/material'
import { Media, MediaReveal } from '@noaignite/oui'
import { transformSanityMedia } from '~/api/sanity/utils'
import { Html } from '~/components'

const BREAKPOINT_KEY = 'md'

const PageHeroHeroRoot = styled('section')<{
  ownerState: { fullHeight?: boolean; textColor?: string }
}>(({ theme, ownerState }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'max(540px, 20vw)',
  padding: theme.spacing(4, 0, 3, 0),
  clipPath: 'inset(0)',
  ...(ownerState.fullHeight && {
    minHeight: 'calc(100vh - var(--cia-header-height, 0px)) !important',
    zIndex: -1,
  }),
  ...(ownerState.textColor && {
    color: ownerState.textColor,
  }),
  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    padding: theme.spacing(8, 0, 4, 0),
    minHeight: 'max(840px, 20vw)',
  },
}))

const PageHeroMediaReveal = styled(MediaReveal)(({ theme }) => ({
  ...theme.mixins.absolute(0),
  zIndex: -1,

  '& *:not(style)': {
    height: '100%',
  },
}))

const PageHeroMedia = styled(Media)(({ theme }) => ({
  '&:before': {
    ...theme.mixins.absolute(0),
    content: '""',
    background: `linear-gradient(
     180.03deg,
    #043b3b5e 16%,
    rgb(4 59 60 / 88%) 63.39%,
    #043b3b 96.17%
  )`,
    transition: theme.transitions.create(['opacity'], {
      duration: theme.transitions.duration.complex * 2,
    }),
  },
}))

const PageHeroHeroContent = styled('div')(({ theme }) => ({
  ...theme.mixins.verticalRhythm(3),
  padding: '0 var(--cia-container-spacing)',
  maxWidth: '100%',
  width: 'max(340px, 41.55vw)',
  textAlign: 'center',
}))

const PageHeroHeroHeading = styled('h1')(() => ({}))

const PageHeroHeadingHtmlText = styled(Html)(({ theme }) => ({
  ...theme.typography.h3,
  margin: '0 0 -0.2em', // Optically align text to next elements top margin.

  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    ...theme.typography.h4,
    fontSize: `max(${theme.typography.h4.fontSize}, 3.7vw)`,
  },
}))

const PageHeroPatternMediaReveal = styled(MediaReveal)(({ theme }) => ({
  ...theme.mixins.absolute(null, null, 0, null),
  zIndex: -1,

  '& *:not(style)': {
    height: '100%',
  },
}))

function PageHero(props) {
  const { renderIndex, fullHeight, headline, id, mediaProps: sanityMediaProps, textColor } = props

  const rootRef = React.useRef(null)

  const mediaProps = transformSanityMedia(sanityMediaProps, {
    picture: {
      xs: {
        dpr: 2,
        height: fullHeight ? 689 : 400,
      },
      md: {
        height: fullHeight ? 1100 : 700,
      },
    },
  })

  const ownerState = {
    fullHeight,
    textColor,
  }

  return (
    <PageHeroHeroRoot ownerState={ownerState} ref={rootRef} id={id}>
      {mediaProps && (
        <PageHeroMediaReveal>
          <PageHeroMedia
            {...(mediaProps?.component === 'video'
              ? {
                  autoPlay: true,
                  muted: true,
                  loop: true,
                  playsInline: true,
                }
              : { alt: '' })}
            {...mediaProps}
            priority={renderIndex <= 1}
          />
        </PageHeroMediaReveal>
      )}

      <PageHeroHeroContent>
        {headline && (
          <PageHeroHeroHeading>
            <PageHeroHeadingHtmlText dangerouslySetInnerHTML={{ __html: headline }} />
          </PageHeroHeroHeading>
        )}
      </PageHeroHeroContent>

      <PageHeroPatternMediaReveal>
        <Media src="/assets/borderh.png" />
      </PageHeroPatternMediaReveal>
    </PageHeroHeroRoot>
  )
}

export default PageHero
