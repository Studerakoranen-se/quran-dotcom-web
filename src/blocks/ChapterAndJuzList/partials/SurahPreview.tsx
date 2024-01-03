import { Typography, styled } from '@mui/material'
import { RouterLink } from '~/containers'
import { ChapterNumberIcon } from '~/components'
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

type SurahPreviewProps = {
  href?: string
  surahNumber: number
  surahName: string
  translatedSurahName: string
  description: number | string
  chapterId: number
  isMinimalLayout?: boolean
  isLoading?: boolean
  shouldPrefetch?: boolean
}

const SurahPreview = (props: SurahPreviewProps) => {
  const {
    href,
    surahNumber,
    surahName,
    translatedSurahName,
    description,
    chapterId,
    isMinimalLayout,
    isLoading,
    shouldPrefetch,
  } = props

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
            sx={{
              textAlign: 'center',
              position: 'absolute',
              top: '1.2rem',
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
        <div className="">
          <Typography variant="subtitle1">{surahName}</Typography>
          <Typography sx={{ my: 1.2 }}>{translatedSurahName}</Typography>
        </div>
      </SurahPreviewContent>
      <SurahPreviewContentLeft>
        <Typography
          className={`icon-surah icon-surah${chapterId.toString()}`}
          component="span"
          translate="no"
          variant="h2"
        />
        <Typography
          variant="caption"
          sx={{
            color: '#C6C6C6',
          }}
        >
          {description}
        </Typography>
        {/* <ChapterIconContainer chapterId={chapter?.id.toString()} hasSurahPrefix={false} /> */}
      </SurahPreviewContentLeft>
    </SurahPreviewRoot>
  )
}

export default SurahPreview
