import { Typography, styled } from '@mui/material'
import { RouterLink } from '~/containers'
import { ChapterNumberIcon } from '~/components'
import ChapterIconContainer from '~/components/ChapterIcon/partials/ChapterIconContainer'

const SurahPreviewRoot = styled(RouterLink)(({ theme }) => ({
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

const SurahPreview = (props: any) => {
  const { chapter } = props

  return (
    <SurahPreviewRoot href={`/surah/${chapter?.id}`} shouldPrefetch={false}>
      {/* <SurahPreviewContainer> */}
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
            {chapter?.id}
          </Typography>
          <ChapterNumberIcon
            sx={{
              width: 49,
              height: 60,
            }}
          />
        </SurahPreviewIconContainer>
        <div className="">
          <Typography variant="subtitle1">{chapter?.transliteratedName}</Typography>
          <Typography sx={{ my: 1.2 }}>{chapter?.translatedName}</Typography>
        </div>
      </SurahPreviewContent>
      <SurahPreviewContentLeft>
        <Typography
          className={`icon-surah icon-surah${chapter?.id}`}
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
          {chapter?.versesCount} Ayahs
        </Typography>
        {/* <ChapterIconContainer chapterId={chapter?.id.toString()} hasSurahPrefix={false} /> */}
      </SurahPreviewContentLeft>
      {/* </SurahPreviewContainer> */}
    </SurahPreviewRoot>
  )
}

export default SurahPreview
