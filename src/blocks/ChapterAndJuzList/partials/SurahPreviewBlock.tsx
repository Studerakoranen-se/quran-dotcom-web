import * as React from 'react'
import { Box, Typography, styled } from '@mui/material'
// import { ChapterNumberIcon } from '~/components'
import { shouldUseMinimalLayout, toLocalizedNumber } from '~/utils'
import ChapterIconContainer, {
  ChapterIconsSize,
} from '~/components/ChapterIcon/partials/ChapterIconContainer'

const SurahPreviewBlockRoot = styled('div')(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid rgba(224, 210, 180, 0.3)`,
  borderRadius: theme.spacing(),
  '&:hover': {
    borderColor: 'rgba(224, 210, 180, 1)',
  },
  textDecoration: 'none',
  paddingBlockStart: '1rem',
  paddingBlockEnd: '1rem',
  paddingInlineStart: '1rem',
  paddingInlineEnd: '1rem',
  maxWidth: 'calc(6*4rem)',
  height: '100%',
}))

type SurahPreviewBlockProps = {
  surahNumber: number
  surahName: string
  translatedSurahName: string
  chapterId: number
  description?: string
  locale: string
}

const SurahPreviewBlock = ({
  chapterId,
  surahName,
  surahNumber,
  translatedSurahName,
  description,
  locale,
}: SurahPreviewBlockProps) => {
  const isMinimalLayout = shouldUseMinimalLayout(locale)

  const localizedSurahNumber = React.useMemo(() => {
    return toLocalizedNumber(surahNumber, locale)
  }, [locale, surahNumber])

  return (
    <SurahPreviewBlockRoot>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography
            sx={{
              opacity: (theme) => (theme.palette.mode === 'dark' ? 0.6 : 1),
              marginBlockEnd: '1rem',
            }}
          >
            {isMinimalLayout && <React.Fragment> Surah </React.Fragment>}
            {translatedSurahName}
          </Typography>

          {!isMinimalLayout && (
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'fontWeightSemibold',
                marginBlockEnd: '1rem',
              }}
            >
              Surah
              <br />
              {surahName}
            </Typography>
          )}
        </Box>

        <Typography
          sx={{
            fontWeight: 'fontWeightSemibold',
          }}
        >
          {localizedSurahNumber}
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        borderRadius="4px"
        marginTop="auto"
        sx={{
          py: '20px',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#022929' : 'rgba(224, 210, 180, 0.3)',
        }}
      >
        <ChapterIconContainer
          chapterId={chapterId.toString()}
          hasSurahPrefix
          size={ChapterIconsSize.Large}
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#E5BD77E5' : theme.palette.primary.main,
          }}
        />
        {description && <Typography variant="caption">{description}</Typography>}
      </Box>
    </SurahPreviewBlockRoot>
  )
}

export default SurahPreviewBlock
