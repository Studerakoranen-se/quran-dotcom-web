import { IconButton, Typography, styled } from '@mui/material'
import { FeatureListBlockQueryResult } from '~/api/sanity'
// import { useI18n } from '~/contexts'
import {
  BrainIcon,
  CertificateIcon,
  ComputerIcon,
  CurrencyIcon,
  Html,
  UsersIcon,
} from '~/components'

const iconVariants = {
  brain: BrainIcon,
  computer: ComputerIcon,
  users: UsersIcon,
  currency: CurrencyIcon,
  certificate: CertificateIcon,
}

const FeatureListRoot = styled('section')(({ theme }) => ({
  position: 'relative',
  background: theme.palette.primary.main,
  padding: theme.spacing(4, 2),

  [theme.breakpoints.up('md')]: {
    minHeight: 650,
    padding: theme.spacing(14, 2),
  },
}))

const FeatureListRootMain = styled('div')(({ theme }) => ({
  ...theme.mixins.contain('lg'),
}))

const FeatureListHeadingsContainer = styled('div')<{ ownerState: { verticalLayout?: boolean } }>(
  ({ theme, ownerState }) => ({
    marginBottom: theme.spacing(5),
    //   @ts-ignore
    color: theme.palette.inverted.text.primary,
    [theme.breakpoints.up('md')]: {
      width: 'max(340px, 41.55vw)',
      marginRight: 'auto',
      marginLeft: 'auto',

      ...(ownerState?.verticalLayout && {
        marginBottom: theme.spacing(10),
      }),
    },
  }),
)
const FeatureListHeading = styled('h1')(({ theme }) => ({
  margin: 0,

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 0, 4),
  },
}))

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

const FeatureListItems = styled('div')<{ ownerState: { verticalLayout?: boolean } }>(
  ({ theme, ownerState }) => ({
    display: 'grid',
    gap: theme.spacing(5, 3),
    marginTop: theme.spacing(2.5),

    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(6),
      padding: theme.spacing(0, 12),
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: theme.spacing(3, 10),

      ...(ownerState?.verticalLayout && {
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: theme.spacing(10, 3),
      }),
    },
  }),
)

const FeatureListItem = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  marginTop: '0.5rem',
  marginBottom: '0.5rem',
  alignItems: 'center',
  borderRadius: theme.spacing(2),
  border: `1px solid #E0D2B4`,
}))

const FeatureListItemContent = styled('div')<{ ownerState: { verticalLayout?: boolean } }>(
  ({ theme, ownerState }) => ({
    display: 'flex',
    zIndex: 50,
    padding: theme.spacing(4, 4, 4, 10),
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    textAlign: 'left',
    // @ts-ignore
    color: theme.palette.inverted.text.primary,

    ...(ownerState?.verticalLayout && {
      alignItems: 'center',
      textAlign: 'center',
      padding: theme.spacing(6, 6, 3),
    }),

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(6, 3, 3),
    },
  }),
)

const FeatureListIconButton = styled(IconButton)<{ ownerState: { verticalLayout?: boolean } }>(
  ({ theme, ownerState }) => ({
    display: 'flex',
    position: 'absolute',
    left: '-2.5rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing(10),
    border: `1px solid #E0D2B4`,
    width: '6rem',
    height: '6rem',
    background: theme.palette.primary.dark,
    borderStyle: 'solid',

    '&:hover, &:focus': {
      background: theme.palette.primary.dark,
      cursor: 'cursor',
    },

    [theme.breakpoints.down('md')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: '0%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '5rem',
      height: '5rem',
    },

    ...(ownerState?.verticalLayout && {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: '0%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '5rem',
      height: '5rem',
    }),
  }),
)

function FeatureList(props: FeatureListBlockQueryResult) {
  const { heading, text, entries, verticalLayout } = props

  //   const { t } = useI18n()

  return (
    <FeatureListRoot>
      <FeatureListRootMain>
        <FeatureListHeadingsContainer ownerState={{ verticalLayout }}>
          {heading && (
            <FeatureListHeading>
              <HeadingHtmlText dangerouslySetInnerHTML={{ __html: heading }} />
            </FeatureListHeading>
          )}

          {text && (
            <Typography
              sx={{
                textAlign: 'center',
              }}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          )}
        </FeatureListHeadingsContainer>

        {entries && entries?.length > 0 && (
          <FeatureListItems ownerState={{ verticalLayout }}>
            {entries.map((entry: any, idx: number) => {
              const Icon = iconVariants[entry.icon]
              if (!Icon) {
                return null
              }
              return (
                <FeatureListItem key={idx}>
                  <FeatureListIconButton key={idx} ownerState={{ verticalLayout }}>
                    <Icon sx={{ color: '#E0D2B4' }} fontSize="large" />
                  </FeatureListIconButton>
                  <FeatureListItemContent ownerState={{ verticalLayout }}>
                    <Typography
                      variant={verticalLayout ? 'body1' : 'body1'}
                      gutterBottom
                      sx={{
                        fontWeight: !verticalLayout ? 'fontWeightSemibold' : undefined,
                      }}
                    >
                      {entry.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        lineHeight: '1.25rem',
                      }}
                    >
                      {entry.text}
                    </Typography>
                  </FeatureListItemContent>
                </FeatureListItem>
              )
            })}
          </FeatureListItems>
        )}
      </FeatureListRootMain>
    </FeatureListRoot>
  )
}

export default FeatureList
