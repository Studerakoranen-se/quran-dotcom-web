import { Media, MediaReveal } from '@noaignite/oui'
import { Button, styled } from '@mui/material'
import { PortableTextBlock } from '@portabletext/types'
import { useI18n } from '~/contexts'
import { RouterLink, SanityHtml } from '~/containers'
import { transformSanityMedia } from '~/api/sanity/utils'

const CourseHeroRoot = styled('section')<{
  ownerState: { largeMedia?: boolean }
}>(({ theme, ownerState }) => ({
  position: 'relative',
  background: theme.vars.palette.background.default,
  color: theme.vars.palette.text.textInverted,
  padding: theme.spacing(20, `var(--cia-container-spacing)`, 5),
  minHeight: 550,

  [theme.breakpoints.up('md')]: {
    minHeight: 650,
    padding: theme.spacing(20, `var(--cia-container-spacing)`, 1),

    ...(ownerState?.largeMedia && {
      padding: theme.spacing(20, `var(--cia-container-spacing)`, 5),
    }),
  },
}))

const CourseHeroContainer = styled('div')(({ theme }) => ({
  ...theme.mixins.contain('lg'),
  position: 'relative',
  display: 'grid',
  justifyItems: 'center',
  alignItems: 'center',
  zIndex: 1,
  paddingBottom: 'calc(var(--cia-section-spacing) * 2)',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: theme.spacing(12),
    padding: 'var(--cia-section-spacing) 0',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}))

const CourseHeroContent = styled('div')(({ theme }) => ({
  ...theme.mixins.verticalRhythm(3),

  marginTop: theme.spacing(6),
  [theme.breakpoints.up('md')]: {
    marginTop: 0,
  },
}))

const CourseHeroMediaReveal = styled(MediaReveal)<{ ownerState: { layoutReverse?: boolean } }>(
  ({ theme, ownerState }) => ({
    order: -1,
    paddingTop: 60,
    [theme.breakpoints.up('md')]: {
      paddingTop: 0,
      ...(ownerState?.layoutReverse && {
        order: -1,
      }),
    },
  }),
)

const CourseHeroBackground = styled('div')(({ theme }) => ({
  ...theme.mixins.absolute(0),
  zIndex: 0,
  '& *:not(style)': {
    height: '100%',
  },
  background: `url('/assets/quran-bkg.png')`,
  backgroundSize: '400px',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center 10%',

  [theme.breakpoints.up('md')]: {
    backgroundPosition: 'center',
    backgroundSize: '800px',
  },
}))

type CourseHeroProps = {
  text: PortableTextBlock[]
  ctaLabel: string
  ctaUrl: string
  mediaProps: any
  layoutReverse?: boolean
  enablePattern?: boolean
  enableHorizontalLine?: boolean
  largeMedia?: boolean
}

function CourseHero(props: CourseHeroProps) {
  const {
    text,
    mediaProps: sanityMediaProps,
    layoutReverse,
    enablePattern,
    ctaLabel,
    ctaUrl,
    enableHorizontalLine,
    largeMedia,
  } = props
  const { t } = useI18n()

  const mediaProps = transformSanityMedia(sanityMediaProps, {
    img: {
      dpr: 2,
      width: 1280,
      height: 720,
    },
  })

  return (
    <CourseHeroRoot
      ownerState={{
        largeMedia,
      }}
    >
      {enablePattern && <CourseHeroBackground />}
      <CourseHeroContainer>
        <CourseHeroContent>
          {text && <SanityHtml blocks={text} />}
          {ctaLabel && ctaUrl && (
            <Button
              component={RouterLink}
              href={ctaUrl}
              variant="contained"
              size="medium"
              aria-label={t(__translationGroup)`Apply for private course"`}
              sx={{
                mt: 3,
              }}
            >
              {ctaLabel}
            </Button>
          )}
        </CourseHeroContent>
        {mediaProps && (
          <CourseHeroMediaReveal
            // width={mediaProps.width}
            // height={mediaProps.height}
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
              sx={(theme) => ({
                width: '80%',
                mx: 'auto',
                ...(largeMedia && {
                  [theme.breakpoints.up('md')]: {
                    width: '110%',
                  },
                }),
              })}
            />
          </CourseHeroMediaReveal>
        )}
      </CourseHeroContainer>
      {enableHorizontalLine && (
        <MediaReveal>
          <Media
            src="/assets/borderh.png"
            alt={t('aria').translate(`horizontal-line`)}
            aria-label={t('aria').translate(`horizontal-line`)}
            sx={(theme) => ({
              position: 'relative',
              width: '100%',
              height: '0.125rem',
              marginLeft: 'auto',
              marginRight: 'auto',

              [theme.breakpoints.up('md')]: {
                width: '50%',
              },

              ...(largeMedia && {
                marginTop: 8,
              }),
            })}
          />
        </MediaReveal>
      )}
    </CourseHeroRoot>
  )
}

export default CourseHero
