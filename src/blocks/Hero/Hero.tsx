import * as React from 'react'
import { Button, styled, Typography } from '@mui/material'
import { useI18n } from '~/contexts'
import { RouterLink } from '~/containers'
import { BrandIcon, Html, QuranIcon, BookIcon } from '~/components'

const BREAKPOINT_KEY = 'md'

const HeroRoot = styled('section')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'justify-between',
  minHeight: 550,
  color: theme.vars.palette.common.white, // Use `common.white` as color is based on image not theme mode.
  textAlign: 'center',
  paddingTop: 190,
  paddingBottom: 190,

  [theme.breakpoints.up('md')]: {
    minHeight: 650,
  },
  background:
    "linear-gradient(180deg, #043B3B 50%, #043B3B 80%, #043B3B 100%), url('/assets/bg-arbic.png')",
  backgroundPosition: 'top right',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover', // Make the background image cover the container width
}))

const HeroMain = styled('div')(({ theme }) => ({
  textAlign: 'center',
  paddingInline: 'var(--cia-container-spacing)',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  },
}))

const HeroMedia = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  position: 'absolute',
  opacity: 0.5,
  paddingInline: 'var(--cia-container-spacing)',
  width: '100%',
  paddingRight: 60,
  paddingBottom: '1.25rem',

  [theme.breakpoints.up('md')]: {
    position: 'static',
    opacity: 1,
    // paddingRight: 26,
    // paddingLeft: 26,
  },
}))

const HeroBrandIcon = styled('div')(() => ({
  width: 384,
}))

const HeroHeading = styled('h1')(() => ({}))

const HeadingHtmlText = styled(Html)<{
  dangerouslySetInnerHTML: {
    __html: string
  }
}>(({ theme }) => ({
  ...theme.typography.h3,
  margin: 0,
  fontSize: `max(${theme.typography.h3.fontSize}, 3.2vw)`,
}))

const HeroSubheading = styled('h2')(({ theme }) => ({
  margin: theme.spacing(2, 0, 1),
}))

const SubHeadingHtmlText = styled(Html)<{
  dangerouslySetInnerHTML: {
    __html: string
  }
}>(({ theme }) => ({
  ...theme.typography.preamble2,
  maxWidth: 500,
  margin: 0,
  [theme.breakpoints.up(BREAKPOINT_KEY)]: theme.typography.preamble,
}))

const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  // flexDirection: 'column',
  width: 'fit-content',
  gap: theme.spacing(2),
  marginTop: theme.spacing(8),
}))

type HeroProps = {
  heading: string
  subheading: string
  text: string
  ctaLabel?: string
  ctaUrl?: string
  ctaLabel2?: string
  ctaUrl2?: string
}

function Hero(props: HeroProps) {
  const { heading, subheading, text, ctaLabel, ctaUrl, ctaLabel2, ctaUrl2 } = props

  const { t } = useI18n()

  return (
    <React.Fragment>
      <HeroRoot>
        <HeroMain>
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
          {text && <Typography dangerouslySetInnerHTML={{ __html: text }} />}

          {ctaLabel && ctaUrl && (
            <ButtonContainer>
              <Button
                component={RouterLink}
                href={ctaUrl}
                variant="contained"
                size="medium"
                // @ts-ignore
                color="textInverted"
                aria-label={t(__translationGroup)`Read more about "${heading}"`}
                startIcon={<QuranIcon color="primary" />}
              >
                {ctaLabel}
              </Button>
              {ctaLabel2 && ctaUrl2 && (
                <Button
                  component={RouterLink}
                  href={ctaUrl2}
                  variant="contained"
                  // @ts-ignore
                  color="textInverted"
                  size="medium"
                  aria-label={t(__translationGroup)`Read more about "${subheading}"`}
                  startIcon={<BookIcon color="primary" />}
                >
                  {ctaLabel2}
                </Button>
              )}
            </ButtonContainer>
          )}
        </HeroMain>
        <HeroMedia>
          <HeroBrandIcon>
            <BrandIcon sx={{ width: '100%', height: '100%' }} />
          </HeroBrandIcon>
        </HeroMedia>
      </HeroRoot>
    </React.Fragment>
  )
}

export default Hero
