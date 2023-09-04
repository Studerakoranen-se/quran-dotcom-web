import { Typography, styled } from '@mui/material'
import { RouterLink } from '~/containers'
import { ChapterNumberIcon } from '~/components'
import ChapterIconContainer from '~/components/ChapterIcon/partials/ChapterIconContainer'

const SurahPreviewRoot = styled(RouterLink)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1),
  border: `2px solid #E0D2B4`,
  '&:hover': {
    borderColor: '#efe8db',
  },
}))

const SurahPreviewContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: '1px solid var(--color-borders-hairline)',
  paddingBlockStart: 16,
  paddingBlockEnd: 16,
  paddingInlineStart: 19,
  paddingInlineEnd: 19,
  borderRadius: 4,
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

const SurahPreviewIconContainer = styled('div')(({ theme }) => ({
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
    <SurahPreviewRoot href={`/surah/${chapter?.id}`}>
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
          <h1 className="font-semibold">{chapter?.translatedName}</h1>
          <p className="text-[#C6C6C6] group-hover:text-[#E0D2B4] text-sm">
            {chapter?.translatedName}
          </p>
        </div>
      </SurahPreviewContent>
      <SurahPreviewContentLeft>
        <Typography>{chapter?.transliteratedName}</Typography>
        <Typography
          variant="caption"
          sx={{
            color: '#C6C6C6',
          }}
        >
          {chapter?.versesCount} Ayahs
        </Typography>
        <ChapterIconContainer chapterId={chapter?.id.toString()} hasSurahPrefix={false} />
      </SurahPreviewContentLeft>
      {/* </SurahPreviewContainer> */}
    </SurahPreviewRoot>
  )
}

export default SurahPreview
