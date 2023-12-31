import { Button, Typography, styled } from '@mui/material'
import { Media, MediaReveal } from '@noaignite/oui'
import { useI18n } from '~/contexts'
import { RouterLink } from '~/containers'
import { transformSanityMedia } from '~/api/sanity/utils'

const BREAKPOINT_KEY = 'md'

const CoursesRoot = styled('section')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  minHeight: 'max(240px, 20vw)',
  padding: theme.spacing(4, 0, 3, 0),

  [theme.breakpoints.up('md')]: {
    minHeight: 'calc(100vh - var(--cia-header-height, 0px)) !important',
  },
}))

const CoursesRootMain = styled('div')(({ theme }) => ({
  ...theme.mixins.contain('lg'),
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  gap: '1.25rem',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2.5, 1.25),
  textAlign: 'center',

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
}))

const CoursesEntryHeading = styled('h2')(({ theme }) => ({
  ...theme.typography.h6,
  margin: theme.spacing(0, 0, 2),
  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    fontSize: theme.typography.h2.fontSize,
  },
}))

const CourseItem = styled('div')(({ theme }) => ({
  ...theme.mixins.verticalRhythm(3),
  padding: '0 var(--cia-container-spacing)',
  maxWidth: '100%',
  width: 'max(340px, 41.55vw)',
}))

const CourseMedia = styled(Media)(({ theme }) => ({
  ...theme.mixins.contain(theme.spacing(30)),
}))

type CoursesProps = {
  entries: any
}

function Courses(props: CoursesProps) {
  const { entries } = props

  const { t } = useI18n()

  return (
    <CoursesRoot>
      <CoursesRootMain>
        {entries?.map((entry, idx) => {
          const { mediaProps: sanityMediaProps, heading, text, ctaLabel, ctaUrl } = entry

          const mediaProps = transformSanityMedia(sanityMediaProps)

          return (
            <CourseItem key={idx}>
              {mediaProps && (
                //  @ts-ignore
                <MediaReveal width={mediaProps?.width} height={mediaProps?.height}>
                  <CourseMedia
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
                </MediaReveal>
              )}

              {heading && <CoursesEntryHeading>{heading}</CoursesEntryHeading>}
              {text && <Typography variant="body2">{text}</Typography>}
              {ctaLabel && ctaUrl && (
                <Button
                  component={RouterLink}
                  href={ctaUrl}
                  variant="contained"
                  // @ts-ignore
                  color="text"
                  size="medium"
                  aria-label={t(__translationGroup)`Read more about "${heading}"`}
                  sx={{
                    mt: 3,
                  }}
                >
                  {ctaLabel}
                </Button>
              )}
            </CourseItem>
          )
        })}
      </CoursesRootMain>
    </CoursesRoot>
  )
}

export default Courses
