import * as React from 'react'
import { styled } from '@mui/material'
import { RouterLink } from '~/containers'
import { getAllJuzMappings, getChapterData } from '~/utils/chapter'
import DataContext from '~/contexts/DataContext'
import SurahPreview from './SurahPreview'

const JuzPreviewRoot = styled('div')(({ theme }) => ({
  borderRadius: 4,
  paddingBlockStart: 13,
  paddingBlockEnd: 13,
  paddingInlineStart: 13,
  paddingInlineEnd: 13,
  breakInside: 'avoid-column',
  backgroundColor: '#f1f1f1',
  [theme.getColorSchemeSelector('dark')]: {
    backgroundColor: theme.vars.palette.primary.dark,
  },
}))

const JuzPreviewItem = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  paddingBottom: 5,
}))

const JuzPreviewSurah = styled('div')(() => ({
  '& > * + *': {
    marginTop: 20,
  },
}))

const JuzRouterLink = styled(RouterLink)({
  textDecoration: 'underline',
})

type JuzPreviewProps = {
  isDescending: boolean
  locale: string
}

const JuzPreview = (props: JuzPreviewProps) => {
  const { isDescending, locale } = props

  const [juzMappings, setJuzMappings] = React.useState([])
  const chaptersData = React.useContext(DataContext)

  React.useEffect(() => {
    getAllJuzMappings()
      .then((data) => Object.entries(data))
      // @ts-ignore
      .then(setJuzMappings)
  }, [isDescending])

  const sortedJuzIds = React.useMemo(
    () =>
      isDescending ? juzMappings.slice().sort(([a], [b]) => Number(b) - Number(a)) : juzMappings,
    [isDescending, juzMappings],
  )

  return (
    <React.Fragment>
      {sortedJuzIds.map((juzEntry) => {
        const [juzId, chapterAndVerseMappings] = juzEntry
        const chapterIds = Object.keys(chapterAndVerseMappings)

        return (
          <JuzPreviewRoot key={juzId}>
            <JuzPreviewItem className="flex items-end justify-between pb-5">
              <RouterLink
                href={`/juz/${juzId}`}
                // @ts-ignore
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'space-between',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <span>Juz {juzId}</span>

                <span>Read Juz</span>
              </RouterLink>
            </JuzPreviewItem>
            <JuzPreviewSurah>
              {chapterIds.map((chapterId) => {
                const chapter = getChapterData(chaptersData, chapterId)

                return (
                  <div key={chapterId}>
                    <SurahPreview
                      href={`/juz/${chapterId}/${chapterAndVerseMappings[chapterId]}`}
                      chapterId={Number(chapterId)}
                      description={`${chapter.versesCount} Ayahs`}
                      surahName={chapter.transliteratedName}
                      surahNumber={Number(chapterId)}
                      translatedSurahName={chapter.translatedName as string}
                      locale={locale}
                      // isMinimalLayout={shouldUseMinimalLayout(lang)}
                    />
                  </div>
                )
              })}
            </JuzPreviewSurah>
          </JuzPreviewRoot>
        )
      })}
    </React.Fragment>
  )
}

export default JuzPreview
