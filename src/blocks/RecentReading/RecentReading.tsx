import { Box, Typography, styled } from '@mui/material'
import { useSelector } from 'react-redux'
import { RouterLink } from '~/containers'

const RecentReadingRoot = styled('section')(({ theme }) => ({
  position: 'relative',
  padding: 'var(--cia-container-spacing)',
}))

const RecentReadingMain = styled('div')(({ theme }) => ({
  ...theme.mixins.contain('xl'),
  marginBlockStart: theme.spacing(3),
  marginBlockEnd: theme.spacing(3),
}))

const RecentSectionContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 10,
  padding: theme.spacing(4, 0),
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(auto-fit, 200px)',
  },
}))
const RecentSectionItemLink = styled(RouterLink)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid #E0D2B4`,
  borderRadius: theme.spacing(),
  boxShadow: theme.shadows[6],
  textDecoration: 'none',
  [theme.breakpoints.up('md')]: {
    width: 200,
  },
}))
const RecentSectionItem = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  gap: 20,
  padding: theme.spacing(2),
  height: '100%',
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

  if (histories.length === 0) return null

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
                href={`/surah/${history.chapter_number}?startAt=${history.versesCount}`}
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
