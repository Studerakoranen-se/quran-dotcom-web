import { Button, Typography, styled } from '@mui/material'
import { Media, MediaReveal } from '@noaignite/oui'
import { useI18n } from '~/contexts'
import { Html } from '~/components'
import { RouterLink } from '~/containers'
import { CourseListBlockQueryResult } from '~/api/sanity'
import { transformSanityImage } from '~/api/sanity/utils'

const CourseListRoot = styled('section')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(4, 2),
  background: theme.palette.primary.main,
  boxShadow: 'inset 0px 4px 136px rgba(0, 29, 29, 0.8)',

  [theme.breakpoints.up('md')]: {
    minHeight: 650,
    padding: theme.spacing(14, 2),
  },
}))

const CourseListRootMain = styled('div')(({ theme }) => ({
  ...theme.mixins.contain('lg'),
  marginBlockStart: theme.spacing(3),
  marginBlockEnd: theme.spacing(3),
}))

const CourseListHeadingsContainer = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(5),
  //   @ts-ignore
  color: theme.palette.common.white,
  [theme.breakpoints.up('md')]: {
    width: 'max(340px, 41.55vw)',
    margin: '0 auto',
    marginBottom: 0,
  },
}))
const CourseListHeading = styled('h1')(() => ({}))

const HeadingHtmlText = styled(Html)<{
  dangerouslySetInnerHTML: {
    __html: string
  }
}>(({ theme }) => ({
  ...theme.typography.h4,
  margin: 0,
  marginBottom: theme.spacing(2),
  fontSize: `max(${theme.typography.h4.fontSize}, 2.2vw)`,
  textAlign: 'center',
}))

const CourseListItems = styled('div')(({ theme }) => ({
  display: 'grid',
  marginTop: theme.spacing(2.5),
  gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
  gap: '1.25rem',

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2.5),
  },
}))

const CourseListItem = styled('div')(({ theme }) => ({
  display: 'grid',
  overflow: 'hidden',
  alignItems: 'center',
  borderRadius: theme.spacing(),
  backgroundColor: theme.palette.common.white,
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  color: theme.palette.primary.main,

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: theme.spacing(1.5),
  },
}))

const CourseListItemContent = styled('div')(({ theme }) => ({
  display: 'flex',
  zIndex: 50,
  padding: theme.spacing(6, 2),
  flexDirection: 'column',
  height: '100%',
  alignItems: 'flex-start',

  [theme.breakpoints.up('md')]: {
    gridColumn: 'span 2 / span 2',
  },
}))

function CourseList(props: CourseListBlockQueryResult) {
  const { heading, text, entries } = props

  const { t } = useI18n()

  return (
    <CourseListRoot>
      <CourseListRootMain>
        <CourseListHeadingsContainer>
          {heading && (
            <CourseListHeading>
              <HeadingHtmlText dangerouslySetInnerHTML={{ __html: heading }} />
            </CourseListHeading>
          )}

          {text && (
            <Typography
              sx={{
                textAlign: 'center',
              }}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          )}
        </CourseListHeadingsContainer>

        {entries && entries?.length > 0 && (
          <CourseListItems>
            {entries.map((entry, idx: number) => {
              const { image: sanityMediaProps, title, description, uri } = entry
              // @ts-ignore
              const image = transformSanityImage(sanityMediaProps, {
                dpr: 5,
                width: 112,
                height: 70,
              })

              return (
                <CourseListItem key={idx}>
                  {image && (
                    <MediaReveal>
                      {/* @ts-ignore */}
                      <Media src={image} />
                    </MediaReveal>
                  )}
                  <CourseListItemContent>
                    <Typography variant="h4" gutterBottom>
                      {title}
                    </Typography>
                    <Html
                      sx={{ mb: 2 }}
                      dangerouslySetInnerHTML={{
                        __html: description,
                      }}
                    />
                    <Button
                      component={RouterLink}
                      href={uri}
                      variant="contained"
                      size="medium"
                      aria-label={t(__translationGroup)`Read more about "${title}"`}
                      color="primary"
                    >
                      {t(__translationGroup)`Click here`}
                    </Button>
                  </CourseListItemContent>
                </CourseListItem>
              )
            })}
          </CourseListItems>
        )}
      </CourseListRootMain>
    </CourseListRoot>
  )
}

export default CourseList
