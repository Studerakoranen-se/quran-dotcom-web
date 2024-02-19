import { Typography, styled } from '@mui/material'
import { useContext } from 'react'
import DataContext from '~/contexts/DataContext'
import { RouterLink } from '~/containers'
import useGetRecentlyReadVerseKeys from '~/hooks/useGetRecentlyReadVerseKeys'
import {
  getChapterData,
  getChapterWithStartingVerseUrl,
  getVerseAndChapterNumbersFromKey,
  toLocalizedNumber,
} from '~/utils'
import SurahPreview, { SurahPreviewDisplay } from '../ChapterAndJuzList/partials/SurahPreview'

const RecentReadingRoot = styled('section')(({ theme }) => ({
  position: 'relative',
  padding: 'var(--cia-container-spacing)',
}))

const RecentReadingMain = styled('div')(({ theme }) => ({
  ...theme.mixins.contain('xl'),
}))

const RecentSectionContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  gap: theme.spacing(4),
  flexWrap: 'nowrap',
  overflowX: 'auto',
}))

const RecentSectionItem = styled('div')(() => ({
  minWidth: 220,
}))

const RecentSectionLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
}))

type RecentReactProps = {
  heading: string
  locale: string
}

function RecentReading(props: RecentReactProps) {
  const { heading, locale } = props

  const chaptersData = useContext(DataContext)
  const { recentlyReadVerseKeys, isLoading } = useGetRecentlyReadVerseKeys()

  if (recentlyReadVerseKeys.length === 0) return null

  return (
    <RecentReadingRoot>
      <RecentReadingMain>
        {heading && (
          <Typography variant="h3" component="h4" sx={{ textAlign: 'center', mb: '24px' }}>
            {heading}
          </Typography>
        )}

        <RecentSectionContainer>
          {recentlyReadVerseKeys.map((verseKey) => {
            const [chapterId, verseNumber] = getVerseAndChapterNumbersFromKey(verseKey)
            const surah = getChapterData(chaptersData, chapterId)

            return (
              <RecentSectionItem>
                <RecentSectionLink key={verseKey} href={getChapterWithStartingVerseUrl(verseKey)}>
                  <SurahPreview
                    display={SurahPreviewDisplay.Block}
                    chapterId={Number(chapterId)}
                    surahNumber={Number(chapterId)}
                    translatedSurahName={surah.translatedName as string}
                    surahName={surah.transliteratedName}
                    description={`Ayah ${toLocalizedNumber(Number(verseNumber), locale)}`}
                    locale={locale}
                  />
                </RecentSectionLink>
              </RecentSectionItem>
            )
          })}
        </RecentSectionContainer>
      </RecentReadingMain>
    </RecentReadingRoot>
  )
}

export default RecentReading
