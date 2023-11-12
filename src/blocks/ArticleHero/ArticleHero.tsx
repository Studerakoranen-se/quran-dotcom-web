import * as React from 'react'
import { Button, styled } from '@mui/material'
import { Media, MediaReveal } from '@noaignite/oui'
import clsx from 'clsx'
import { transformSanityMedia } from '~/api/sanity/utils'
import { useI18n } from '~/contexts'
import { durationInS, easingValues, Html } from '~/components'
import { ArticleHeroBlogQueryResult } from '~/api'

const BREAKPOINT_KEY = 'md'

const classes = {
  addHeightPadding: 'Cia-spacing',
  addPaddingBottom: 'Cia-padding-bottom',
  HeroSingleButton: 'Cia-hero-single-button',
}

const HeroRoot = styled('section')<{
  ownerState: {
    fullHeight?: boolean
    textColor?: string
  }
}>(({ theme, ownerState }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-end',
  minHeight: 'max(240px, 20vw)',
  padding: theme.spacing(4, 0, 3, 0),
  clipPath: 'inset(0)',
  ...(ownerState?.fullHeight && {
    minHeight: 'calc(100vh - var(--cia-header-height, 0px)) !important',
  }),
  ...(ownerState?.textColor && {
    color: ownerState.textColor,
  }),
  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    padding: theme.spacing(8, 0, 4, 0),
  },
  [`&.${classes.addHeightPadding}`]: {
    minHeight: 'max(340px, 30vw)',
    padding: 'calc(var(--cia-section-spacing) * 2) 0 var(--cia-section-spacing)',
  },
  [`&.${classes.addPaddingBottom}`]: {
    paddingBottom: theme.spacing(6),
  },
}))

const HeroMediaReveal = styled(MediaReveal)(({ theme, ownerState }) => ({
  ...theme.mixins.absolute(0),
  zIndex: -1,
  ...(ownerState.parallax && {
    position: 'fixed',
    bottom: 'auto',
    height: '100vh',
  }),
  '& *:not(style)': {
    height: '100%',
  },
}))

const HeroContent = styled('div')(({ theme }) => ({
  ...theme.mixins.verticalRhythm(3),
  padding: '0 var(--cia-container-spacing)',
  maxWidth: '100%',
  width: 'max(340px, 41.55vw)',
}))

const HeroHeading = styled('h1')(() => ({}))

const HeadingHtmlText = styled(Html)(({ theme }) => ({
  ...theme.typography.h4,
  margin: '0 0 -0.2em', // Optically align text to next elements top margin.
  fontSize: `max(${theme.typography.h4.fontSize}, 3.7vw)`,
}))

const HeroSubheading = styled('h2')(() => ({}))
const SubHeadingHtmlText = styled(Html)(({ theme }) => ({
  ...theme.typography.preamble2,
  maxWidth: 500,
  margin: 0,
  // @ts-ignore
  [theme.breakpoints.up(BREAKPOINT_KEY)]: theme.typography.preamble1,
}))

const HeroButton = styled(Button)(({ theme }) => ({
  [`&.${classes.HeroSingleButton}`]: {
    // Makes entire Hero block clickable.
    position: 'static',
    '&:before': {
      ...theme.mixins.absolute(0),
      content: '""',
    },
  },
}))

const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: 'fit-content',
  gap: theme.spacing(2),
}))

const transition = {
  duration: durationInS.complex * 2,
  ease: easingValues.easeOut,
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition },
}

function Hero(props: ArticleHeroBlogQueryResult & { renderIndex: number; mediaProps: any }) {
  const {
    fullHeight,
    heading,
    id,
    mediaProps: sanityMediaProps,
    renderIndex,
    subheading,
    textColor,
  } = props

  const { t } = useI18n()

  const rootRef = React.useRef(null)

  const [inView, setInView] = React.useState(false)

  const handleEnter = React.useCallback(() => {
    setInView(true)
  }, [])

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

  const hasMedia = Object.keys(sanityMediaProps).length > 0

  return (
    <HeroRoot
      className={clsx(
        hasMedia && classes.addHeightPadding,
        !hasMedia && !subheading && classes.addPaddingBottom,
      )}
      // @ts-ignore
      ownerState={ownerState}
      ref={rootRef}
      id={id}
    >
      {mediaProps && (
        <HeroMediaReveal ownerState={ownerState}>
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
            priority={renderIndex <= 1}
          />
        </HeroMediaReveal>
      )}

      <HeroContent>
        {heading && (
          <HeroHeading>
            <HeadingHtmlText dangerouslySetInnerHTML={{ __html: heading }} />
          </HeroHeading>
        )}
        {subheading && (
          <HeroSubheading>
            <SubHeadingHtmlText dangerouslySetInnerHTML={{ __html: subheading }} />
          </HeroSubheading>
        )}
      </HeroContent>
    </HeroRoot>
  )
}

export default Hero
