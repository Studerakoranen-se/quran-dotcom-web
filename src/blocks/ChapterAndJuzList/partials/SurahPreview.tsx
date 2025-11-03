import { Box, styled, Typography } from '@mui/material'
import { ChapterNumberIcon } from '~/components'
import { RouterLink } from '~/containers'
import SurahPreviewBlock from './SurahPreviewBlock'
// import ChapterIconContainer from '~/components/ChapterIcon/partials/ChapterIconContainer'

const SurahPreviewRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  border: `2px solid #E0D2B4`,
  borderRadius: 8,
  '&:hover': {
    borderColor: '#efe8db',
  },
  textDecoration: 'none',
}))

const SurahPreviewContent = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  width: '100%',
}))

const SurahPreviewContentLeft = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(1),
}))

const SurahPreviewIconContainer = styled('div')(() => ({
  position: 'relative',
  p: {
    color: 'white',
  },
  [`${SurahPreviewRoot}:hover &`]: {
    p: {
      color: '#E0D2B4',
    },
  },
}))

export enum SurahPreviewDisplay {
  Block = 'block',
  Row = 'row',
}

type SurahPreviewProps = {
  href?: string
  surahNumber: number
  surahName: string
  translatedSurahName: string
  description?: string
  chapterId: number
  shouldPrefetch?: boolean
  display?: SurahPreviewDisplay
  locale: string
}

const SurahPreview = (props: SurahPreviewProps) => {
  const {
    href,
    surahNumber,
    surahName,
    translatedSurahName,
    description,
    chapterId,
    shouldPrefetch,
    display,
    locale,
  } = props

  if (display === SurahPreviewDisplay.Block) {
    return (
      <SurahPreviewBlock
        chapterId={chapterId}
        surahName={surahName}
        surahNumber={surahNumber}
        translatedSurahName={translatedSurahName}
        description={description}
        locale={locale}
      />
    )
  }

  return (
    <SurahPreviewRoot
      {...(href && {
        as: RouterLink,
        href,
        shouldPrefetch,
      })}
    >
      <SurahPreviewContent>
        <SurahPreviewIconContainer>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: 'fontFamilyTerritory',
              fontWeight: 'fontWeightRegular',
              textAlign: 'center',
              position: 'absolute',
              top: '1.35rem',
              left: '0',
              width: '100%',
            }}
          >
            {chapterId.toString()}
          </Typography>
          <ChapterNumberIcon
            sx={{
              width: 49,
              height: 60,
            }}
          />
        </SurahPreviewIconContainer>
        <Box flex={1} display="flex" flexDirection="column">
          <Typography
            variant="body1"
            sx={{
              fontWeight: 'fontWeightSemibold',
            }}
          >
            {surahName}
          </Typography>
          <Typography
            variant="caption"
            sx={(theme) => ({
              mt: 0.5,
              fontWeight: 'fontWeightMedium',
              opacity: 1,
              [theme.getColorSchemeSelector('dark')]: {
                opacity: 0.6,
              },
            })}
          >
            {translatedSurahName}
          </Typography>
        </Box>
        <SurahPreviewContentLeft>
          <Typography
            // className={`icon-surah icon-surah${chapterId.toString()}`}
            component="span"
            translate="no"
            variant="preamble"
          />
          <Typography
            variant="caption2"
            sx={(theme) => ({
              fontWeight: 'fontWeightMedium',
              opacity: 1,
              [theme.getColorSchemeSelector('dark')]: {
                opacity: 0.6,
              },
            })}
          >
            {description}
          </Typography>
          {/* <ChapterIconContainer chapterId={chapter?.id.toString()} hasSurahPrefix={false} /> */}
        </SurahPreviewContentLeft>
      </SurahPreviewContent>
    </SurahPreviewRoot>
  )
}

export default SurahPreview
