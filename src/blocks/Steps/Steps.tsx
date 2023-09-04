import { Media } from '@noaignite/oui'
import { Typography, styled } from '@mui/material'
import { Html } from '~/components'
const BREAKPOINT_KEY = 'md'

const StepsRoot = styled('section')(({ theme }) => ({
  position: 'relative',
  background: theme.palette.primary.main,
  boxShadow: 'inset 0px 4px 136px rgba(0, 29, 29, 0.8)',
  color: theme.palette.common.white,
  padding: theme.spacing(3.5),
}))

const StepsBackground = styled('div')(({ theme }) => ({
  ...theme.mixins.absolute(0),
  zIndex: 0,
  '& *:not(style)': {
    height: '100%',
  },
  background: `linear-gradient(180deg, #043B3B 0%, rgba(4, 59, 59, 0.5) 53.47%, #043B3B 100%), url('/assets/bg-2.png')`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top',
}))

const StepsContainer = styled('div')(({ theme }) => ({
  ...theme.mixins.contain('lg'),
  position: 'relative',
  //   display: 'grid',
  //   justifyItems: 'center',
  //   alignItems: 'center',
  zIndex: 1,
  padding: 'calc(var(--cia-section-spacing) * 2) 0',
  textAlign: 'center',
  //   [theme.breakpoints.up('md')]: {
  //     gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  //     gap: theme.spacing(12),
  //   },
}))

const StepsHeading = styled('h1')(() => ({}))

const HeadingHtmlText = styled(Html)<{
  dangerouslySetInnerHTML: {
    __html: string
  }
}>(({ theme }) => ({
  ...theme.typography.h3,
  margin: 0,
  fontSize: `max(${theme.typography.h3.fontSize}, 3.2vw)`,
}))

const StepsSubheading = styled('h2')(({ theme }) => ({
  margin: theme.spacing(2, 0, 1),
}))

const SubHeadingHtmlText = styled(Html)<{
  dangerouslySetInnerHTML: {
    __html: string
  }
}>(({ theme }) => ({
  ...theme.typography.preamble2,
  margin: 0,
  [theme.breakpoints.up(BREAKPOINT_KEY)]: theme.typography.preamble,
}))

const StepsContent = styled('div')(({ theme }) => ({
  ...theme.mixins.verticalRhythm(3),
  padding: '0 var(--cia-container-spacing)',
  marginBottom: '2.5rem',
  maxWidth: '100%',
  width: 'max(340px, 41.55vw)',
}))

const StepsEntries = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  gap: '1.25rem',
  alignItems: 'center',
  margin: '0 auto',

  [theme.breakpoints.up('md')]: {
    width: 'max-content',
  },

  //   ...theme.mixins.verticalRhythm(3),
  //   padding: '0 var(--cia-container-spacing)',
  //   maxWidth: '100%',
  //   width: 'max(340px, 41.55vw)',
}))

const StepsItem = styled('div')<{ ownerState: { reverseDirection?: boolean } }>(
  ({ theme, ownerState }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing(),
    width: '100%',
    background: '#0A5757',
    padding: theme.spacing(6, 2),
    gap: theme.spacing(5),

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      gap: theme.spacing(1.2),
      justifyContent: 'space-between',
      height: 192,
      width: 660,
      borderRadius: theme.spacing(20),
      padding: 0,

      ...(ownerState?.reverseDirection && {
        flexDirection: 'row-reverse',
      }),
    },
  }),
)

const StepsItemIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 9999,
  background: '#0A5757',
  width: 168,
  height: 168,
  outlineStyle: 'solid',
  outlineWidth: '10px',
  outlineColor: '#043B3B',

  img: {
    width: 110,
    padding: theme.spacing(1),
  },

  [theme.breakpoints.up('md')]: {
    position: 'static',
  },
}))

const StepsItemArrowIcon = styled('div')(({ theme }) => ({
  display: 'none',
  visibility: 'hidden',
  [theme.breakpoints.up('md')]: {
    display: 'block',
    visibility: 'visible',
    position: 'absolute',
  },
}))

const StepsItemContent = styled('div')(({ theme }) => ({
  zIndex: 10,
  textAlign: 'center',
  margin: '0 auto',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    width: 350,
  },
}))

type StepsProps = {
  children: React.ReactNode
  text: string
  heading: string
  subheading: string
  enablePattern: boolean
  entries: any
}

function Steps(props: StepsProps) {
  const { text, enablePattern, heading, subheading, entries } = props

  return (
    <StepsRoot>
      {enablePattern && <StepsBackground />}

      <StepsContainer>
        <StepsEntries>
          <StepsContent>
            {heading && (
              <StepsHeading>
                <HeadingHtmlText dangerouslySetInnerHTML={{ __html: heading }} />
              </StepsHeading>
            )}

            {subheading && (
              <StepsSubheading>
                <SubHeadingHtmlText dangerouslySetInnerHTML={{ __html: subheading }} />
              </StepsSubheading>
            )}
          </StepsContent>

          {entries?.map((entry, idx) => (
            <>
              <StepsItem
                key={idx}
                ownerState={{
                  reverseDirection: entry.reverseDirection,
                }}
              >
                <StepsItemIcon>
                  <Media src={entry.icon} alt="" />
                </StepsItemIcon>
                <StepsItemContent>
                  {entry.heading && (
                    <Typography variant="h2" gutterBottom>
                      {entry.heading}
                    </Typography>
                  )}
                  {entry.text && <Typography variant="body1">{entry.text}</Typography>}
                </StepsItemContent>
              </StepsItem>
              <StepsItemArrowIcon
                sx={{
                  ...(idx % 2 === 0
                    ? {
                        top: (theme) => theme.spacing(28),
                        right: (theme) => theme.spacing(-10),
                      }
                    : {
                        top: (theme) => theme.spacing(58),
                        left: (theme) => theme.spacing(-10),
                        transform: 'scaleX(-1)',
                      }),
                }}
              >
                <svg
                  width="67"
                  height="222"
                  viewBox="0 0 67 222"
                  fill="cuurentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-7.62939e-06 222L55.8333 222L55.8333 205.35L33.2208 205.35C43.8292 192.4 52.1111 177.922 58.0667 161.916C64.0222 145.917 67 128.945 67 111C67 80.29 59.8831 55.13 45.6493 35.52C31.4081 15.91 16.1917 4.07001 2.07453e-06 -2.92866e-06L1.31035e-06 17.4825C11.1667 21.7375 22.3333 31.7719 33.5 47.5857C44.6667 63.4069 50.25 84.545 50.25 111C50.25 127.835 47.2722 143.697 41.3167 158.586C35.3611 173.482 27.1722 186.85 16.75 198.69L16.75 166.5L-5.20341e-06 166.5L-7.62939e-06 222Z"
                    fill="#0A5757"
                  />
                </svg>
              </StepsItemArrowIcon>
            </>
          ))}
        </StepsEntries>
        {/* <Html dangerouslySetInnerHTML={{ __html: text }} /> */}
      </StepsContainer>
    </StepsRoot>
  )
}

export default Steps
