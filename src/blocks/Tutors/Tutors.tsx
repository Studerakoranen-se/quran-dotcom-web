import { Box, Typography, styled } from '@mui/material'
import { Media, MediaReveal } from '@noaignite/oui'
import { TutorsBlockQueryResult } from '~/api/sanity'
import { transformSanityMedia } from '~/api/sanity/utils'
import { Html } from '~/components'

const TeamRoot = styled('section')(({ theme }) => ({
  position: 'relative',
  background: theme.palette.primary.main,
  boxShadow: 'inset 0px 4px 136px rgba(0, 29, 29, 0.8)',
  color: theme.palette.common.white,
  padding: theme.spacing(3.5),
}))

const TeamGridContainer = styled('div')(({ theme }) => ({
  ...theme.mixins.contain('lg'),
  position: 'relative',
  padding: 'calc(var(--cia-section-spacing) * 2) 0',
}))

const TutorHeading = styled('h1')(() => ({}))

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

const TeamList = styled('div')(({ theme }) => ({
  display: 'grid',
  paddingTop: '2.5rem',
  paddingBottom: '2.5rem',
  gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
  gap: '1.25rem',

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  },

  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  },
}))
const TeamItemCard = styled('div')(() => ({
  overflow: 'hidden',
  position: 'relative',
  borderRadius: '0.5rem',
  backgroundColor: '#ffffff',
}))

export default function Tutors(props: TutorsBlockQueryResult) {
  const { heading, text, entries } = props

  return (
    <TeamRoot>
      <TeamGridContainer>
        {heading && (
          <TutorHeading>
            <HeadingHtmlText dangerouslySetInnerHTML={{ __html: heading }} />
          </TutorHeading>
        )}

        {text && (
          <Typography
            sx={{
              textAlign: 'center',
            }}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}

        <TeamList>
          {entries
            ?.filter((item) => !item?.isHidden)
            .map((item, idx) => {
              const { image: sanityMediaProps, fullname, description } = item

              const image = transformSanityMedia(sanityMediaProps)

              return (
                <TeamItemCard key={idx}>
                  {image && (
                    <MediaReveal>
                      {/* @ts-ignore */}
                      <Media src={image.src} alt="" />
                    </MediaReveal>
                  )}
                  <Box p={2}>
                    {fullname && (
                      <Typography variant="h6" color="primary" gutterBottom>
                        {fullname}
                      </Typography>
                    )}
                    {description && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.dark',
                          lineHeight: 1.4,
                        }}
                      >
                        {description.slice(0, 100)}
                      </Typography>
                    )}
                  </Box>
                </TeamItemCard>
              )
            })}
        </TeamList>
      </TeamGridContainer>
    </TeamRoot>
  )
}
