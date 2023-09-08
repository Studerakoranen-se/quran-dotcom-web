import { Box, Typography, styled } from '@mui/material'
import { useSelector } from 'react-redux'
import { RouterLink } from '~/containers'

const RecentReadingRoot = styled('section')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2, 3.5),
}))

const RecentReadingMain = styled('div')(({ theme }) => ({
  ...theme.mixins.contain('lg'),
  marginBlockStart: theme.spacing(3),
  marginBlockEnd: theme.spacing(3),
}))

const RecentSectionContainer = styled('div')(({ theme }) => ({
  ...theme.mixins.contain('lg'),
  position: 'relative',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 10,
  justifyContent: 'center',
  padding: theme.spacing(4, 0),
}))
const RecentSectionItemLink = styled(RouterLink)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid #E0D2B4`,
  width: 200,
  borderRadius: theme.spacing(),
  boxShadow: theme.shadows[6],
  textDecoration: 'none',
}))
const RecentSectionItem = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  gap: 20,
  padding: theme.spacing(2),
}))

const RecentSectionItemAyah = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: 80,
  color: theme.palette.common.white,
  backgroundColor: '#022929',
  borderRadius: theme.spacing(),
}))

type RecentReactProps = {
  heading: string
}

function RecentReading(props: RecentReactProps) {
  const { heading } = props

  const histories = useSelector((state: any) => state.history?.recentSurahs)

  return (
    <RecentReadingRoot>
      <RecentReadingMain>
        {heading && (
          <Typography variant="h2" component="h4" sx={{ textAlign: 'center' }}>
            {heading}
          </Typography>
        )}
        {histories.length > 0 && (
          <RecentSectionContainer>
            {histories.map((history: any, idx: number) => (
              <RecentSectionItemLink
                key={idx}
                href={`/surah/${history.chapter_number}?start_at=${history.versesCount}`}
              >
                <RecentSectionItem>
                  <Box display="flex" justifyContent="space-between">
                    <Typography color="text">{history.translatedName}</Typography>
                    <Typography>{history.chapter_number}</Typography>
                  </Box>
                  <Typography variant="subtitle1">Surah {history.nameSimple}</Typography>
                  <div className="flex-grow" />
                  <RecentSectionItemAyah>
                    <Typography
                      sx={{
                        fontFamily: '"SurahNames", "Arial", sans-serif',
                      }}
                    >
                      {history.nameArabic}
                    </Typography>
                    <Typography>Ayah {history.versesCount}</Typography>
                  </RecentSectionItemAyah>
                </RecentSectionItem>
              </RecentSectionItemLink>
            ))}
          </RecentSectionContainer>
        )}
      </RecentReadingMain>
    </RecentReadingRoot>
  )
}

export default RecentReading
