import { alpha, Button, styled, Typography } from '@mui/material'
import { useI18n } from '~/contexts'
import { RouterLink } from '~/containers'
import { BrandIcon, Html, QuranIcon, BookIcon } from '~/components'

const BREAKPOINT_KEY = 'md'

const HeroRoot = styled('section')(({ theme }) => ({
  position: 'relative',
  minHeight: 550,
  color: theme.vars.palette.text.textInverted,
  padding: theme.spacing(20, 2, 15),

  background: `url('/assets/quran-bkg-white.png')`,

  [theme.getColorSchemeSelector('dark')]: {
    background: `url('/assets/quran-bkg.png')`,
  },

  backgroundPosition: 'center',
  backgroundSize: '200%',
  backgroundRepeat: 'no-repeat',

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(30, 2, 20),
    minHeight: 650,
    backgroundSize: '70%',
    backgroundOpacity: 0.5,
  },
}))

const HeroContainer = styled('div')(({ theme }) => ({
  ...theme.mixins.contain('xl'),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'justify-between',
  flexDirection: 'column-reverse',
  textAlign: 'center',

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}))

const HeroMain = styled('div')(({ theme }) => ({
  textAlign: 'center',
  paddingInline: 'var(--cia-container-spacing)',
  zIndex: 111,
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  },
  [theme.breakpoints.up('xl')]: {
    paddingLeft: 0,
  },
}))

const HeroMedia = styled('div')(({ theme }) => ({
  paddingInline: 'var(--cia-container-spacing)',
  width: '100%',
  paddingBottom: '1.25rem',

  [theme.breakpoints.up('xl')]: {
    paddingRight: 0,
  },
}))

const HeroBrandIcon = styled('div')(({ theme }) => ({
  height: 284,
  [theme.breakpoints.up('md')]: {
    height: 400,
  },
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
  ...theme.typography.subtitle1,
  margin: 0,
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    ...theme.typography.subtitle1,
    maxWidth: 500,
  },
}))

const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(8),
  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    width: 'fit-content',
  },
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
    <HeroRoot>
      <HeroContainer>
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
                aria-label={t('aria').translate(`read-more`, { value: heading })}
                startIcon={<QuranIcon color="primary" />}
              >
                {ctaLabel}
              </Button>
              {ctaLabel2 && ctaUrl2 && (
                <Button
                  component={RouterLink}
                  href={ctaUrl2}
                  variant="contained"
                  size="medium"
                  aria-label={t('aria').translate(`read-more`, { value: heading })}
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
      </HeroContainer>
    </HeroRoot>
  )
}

export default Hero
