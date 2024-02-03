import * as React from 'react'
import { Box, Button, ButtonBase, Chip, Drawer, Typography, styled } from '@mui/material'
import { Media, MediaReveal } from '@noaignite/oui'
import { TutorsBlockQueryResult } from '~/api/sanity'
import { transformSanityMedia } from '~/api/sanity/utils'
import { useI18n } from '~/contexts'
import { ArrowForwardIcon, Html } from '~/components'
import { SanityHtml } from '~/containers'

const TeamRoot = styled('section')(({ theme }) => ({
  position: 'relative',
  background: theme.vars.palette.background.default,
  boxShadow:
    theme.palette.mode === 'dark'
      ? 'inset 0px 4px 136px rgba(0, 29, 29, 0.8)'
      : 'inset 0px 4px 136px rgb(218 218 218 / 80%)',
  color: theme.vars.palette.text.textInverted,
  padding: `var(--cia-container-spacing)`,
}))

const TeamGridContainer = styled('div')(({ theme }) => ({
  ...theme.mixins.contain('lg'),
  position: 'relative',
  padding: 'var(--cia-section-spacing) 0',
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
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1rem',

  [theme.breakpoints.up('md')]: {
    gap: '1.25rem',
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

const ActiveTutorDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    ...theme.mixins.scrollbars,
    maxWidth: '100%',
    width: 500, // By design.
    height: '100vh',
    padding: theme.spacing(6),
  },
}))

type ActiveTutorProps = {
  fullname: string
  title?: string
  gender?: string
  age?: number
  fields?: string[]
  languages?: string[]
  phone?: string
  mail?: string
  experience?: string
  text?: any
  isHidden?: boolean
}

export default function Tutors(props: TutorsBlockQueryResult) {
  const { heading, text, entries } = props

  const { t } = useI18n()

  const [activeEntry, setActiveEntry] = React.useState<ActiveTutorProps | null>(null)
  const [open, setOpen] = React.useState(false)

  const handleClose = React.useCallback(() => {
    setOpen(false)
  }, [])

  const handleClick = (entry) => {
    setActiveEntry(entry)
    setOpen(true)
  }

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
              const { image: sanityMediaProps, fullname, title } = item

              const image = transformSanityMedia(sanityMediaProps)

              return (
                <TeamItemCard key={idx}>
                  {image && (
                    <MediaReveal>
                      {/* @ts-ignore */}
                      <Media src={image.src} alt="" />
                    </MediaReveal>
                  )}
                  <Box
                    p={2}
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    minHeight={160}
                  >
                    {fullname && (
                      <Typography variant="h6" color="primary" gutterBottom>
                        {fullname}
                      </Typography>
                    )}
                    {title && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(46, 56, 68, 0.8)',
                          lineHeight: 1.4,
                        }}
                      >
                        {title}
                      </Typography>
                    )}

                    <ButtonBase
                      onClick={() => handleClick(item)}
                      sx={{
                        mt: 'auto',
                      }}
                    >
                      <ArrowForwardIcon
                        fontSize="medium"
                        sx={{
                          color: 'rgba(46, 56, 68, 0.8)',
                        }}
                      />
                    </ButtonBase>
                  </Box>
                </TeamItemCard>
              )
            })}
        </TeamList>

        <ActiveTutorDrawer onClose={handleClose} open={open} anchor="right">
          <Typography variant="h3" gutterBottom>
            {activeEntry?.fullname}
          </Typography>
          <Typography component="h5" variant="subtitle1" sx={{ mb: 2, fontStyle: 'italic' }}>
            {activeEntry?.title}
          </Typography>
          {activeEntry?.fields && (
            <Box my={2} gap={1} display={'flex'} flexWrap={'wrap'}>
              {activeEntry.fields.map((field, idx) => (
                <Chip key={idx} label={field} />
              ))}
            </Box>
          )}

          {activeEntry?.phone && (
            <Typography variant="body1" gutterBottom>
              <strong>{t(__translationGroup)`Phone`}</strong>: {activeEntry?.phone}
            </Typography>
          )}
          {activeEntry?.age && (
            <Typography variant="body1" gutterBottom>
              <strong>{t(__translationGroup)`Age`}</strong>: {activeEntry?.age}
            </Typography>
          )}
          {activeEntry?.mail && (
            <Typography variant="body1" gutterBottom>
              <strong>{t(__translationGroup)`Email`}</strong>: {activeEntry?.mail}
            </Typography>
          )}
          {activeEntry?.experience && (
            <Typography variant="body1">
              <strong>{t(__translationGroup)`Experience`}</strong>: {activeEntry?.experience}
            </Typography>
          )}

          {activeEntry?.languages && (
            <Box>
              <Typography variant="body1">
                <strong>{t(__translationGroup)`Speaks`}</strong>:
              </Typography>
              <Box my={2} gap={1} display={'flex'} flexWrap={'wrap'}>
                {activeEntry.languages.map((field, idx) => (
                  <Chip key={idx} label={field} />
                ))}
              </Box>
            </Box>
          )}

          {activeEntry?.text && <SanityHtml sx={{ mt: 2 }} blocks={activeEntry.text} />}

          <Button onClick={handleClose} color="inherit" variant="contained" sx={{ mt: 4 }}>
            {t(__translationGroup)`Back`}
          </Button>
        </ActiveTutorDrawer>
      </TeamGridContainer>
    </TeamRoot>
  )
}
