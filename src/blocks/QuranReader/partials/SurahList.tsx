import * as React from 'react'
import { useSelector } from 'react-redux'
import Fuse from 'fuse.js'
import { styled } from '@mui/material/styles'
import { TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { RouterLink } from '~/containers'
import { SCROLL_TO_NEAREST_ELEMENT, useScrollToElement } from '~/hooks/useScrollToElement'
import { getSurahNavigationUrl, toLocalizedNumber } from '~/utils'
import DataContext from '~/contexts/DataContext'
import useChapterIdsByUrlPath from '~/hooks/useChapterId'
import { selectLastReadVerseKey } from '~/store/slices/QuranReader/readingTracker'

const SurahListRoot = styled('div')(() => ({
  flex: 2,
  display: 'flex',
  flexDirection: 'column',
}))

const SurahListContainer = styled('div')(() => ({
  flex: 1,
  position: 'relative',
}))

const SurahListItems = styled('div')(({ theme }) => ({
  ...theme.mixins.scrollbars,
  ...theme.mixins.scrollable,
  position: 'absolute',
  inset: 0,
  paddingBlockEnd: 'calc(2 * 2rem)',
  a: {
    textDecoration: 'none',
  },

  '&::-webkit-scrollbar': {
    width: 5,
    backgroundColor: theme.vars.palette.grey[200],
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette?.mode === 'dark' ? '#cab280' : theme.vars.palette.primary.main,
  },
}))

const SurahListItem = styled('div')<{ ownerState: { isActive: boolean } }>(
  ({ theme, ownerState }) => ({
    '[dir="rtl"] &': {
      direction: 'rtl',
    },

    padding: '0.625rem',
    borderRadius: '0.5rem',

    '&:hover': {
      backgroundColor: theme.vars.palette.action.hover,
    },

    ...(ownerState?.isActive && {
      fontWeight: theme.typography.fontWeightBold,
      backgroundColor: theme.vars.palette.action.hover,
    }),
  }),
)

type SurahListProps = {
  locale: string
}

const filterSurah = (surahs: Chapter[], searchQuery: string) => {
  const fuse = new Fuse(surahs, {
    threshold: 0.3,
    keys: ['id', 'localizedId', 'transliteratedName'],
  })

  const filteredSurah = fuse.search(searchQuery).map(({ item }) => item)

  return filteredSurah as Chapter[]
}

const SurahList = React.memo(function QuranReaderDrawer(props: SurahListProps) {
  const { locale } = props

  // const { t } = useI18n()
  const chaptersData = React.useContext(DataContext)

  const router = useRouter()
  const chapterIds = useChapterIdsByUrlPath(locale)
  const urlChapterId = chapterIds && chapterIds.length > 0 ? chapterIds[0] : null

  const lastReadVerseKey = useSelector(selectLastReadVerseKey)

  const [currentChapterId, setCurrentChapterId] = React.useState(urlChapterId)
  const [searchQuery, setSearchQuery] = React.useState('')

  const chapterDataArray = React.useMemo(() => {
    return Object.entries(chaptersData).map(([id, chapter]) => {
      return {
        ...chapter,
        id,
        localizedId: toLocalizedNumber(Number(id), locale),
      }
    })

    // Sort the chapters by revelation order
    // return Object.entries(chaptersData)
    //   .map(([id, chapter]) => {
    //     return {
    //       ...chapter,
    //       id,
    //       localizedId: toLocalizedNumber(Number(REVELATION_ORDER.indexOf(Number(id)) + 1), lang),
    //     };
    //   })
    //   .sort(
    //     (a, b) => REVELATION_ORDER.indexOf(Number(a.id)) - REVELATION_ORDER.indexOf(Number(b.id)),
    //   );
    // }, [isReadingByRevelationOrder, chaptersData, lang]);
  }, [chaptersData, locale])

  const filteredChapters = searchQuery
    ? filterSurah(chapterDataArray, searchQuery)
    : chapterDataArray

  // Handle when user press `Enter` in input box
  const handleSurahInputSubmit = (e) => {
    e.preventDefault()
    const firstFilteredChapter = filteredChapters[0]
    if (firstFilteredChapter) {
      // @ts-ignore
      router.push(getSurahNavigationUrl(firstFilteredChapter.id))
    }
  }

  const [scrollTo, selectedChapterRef] =
    useScrollToElement<HTMLDivElement>(SCROLL_TO_NEAREST_ELEMENT)

  React.useEffect(() => {
    setCurrentChapterId(lastReadVerseKey.chapterId)
  }, [lastReadVerseKey])

  React.useEffect(() => {
    // when the user navigates to a new chapter, the current chapter id
    setCurrentChapterId(urlChapterId)
  }, [urlChapterId])

  React.useEffect(() => {
    scrollTo()
  }, [currentChapterId, scrollTo])

  return (
    <SurahListRoot>
      <form onSubmit={handleSurahInputSubmit}>
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Surah Search`}
          fullWidth
          sx={{
            marginBlockEnd: '1rem',
          }}
        />
      </form>
      <SurahListContainer>
        <SurahListItems>
          {filteredChapters.map((chapter) => (
            <RouterLink
              key={chapter.id}
              href={getSurahNavigationUrl(`surah/${chapter.id}`)}
              shouldPrefetch={false}
            >
              <SurahListItem
                ownerState={{
                  isActive: chapter?.id?.toString() === currentChapterId,
                }}
              >
                <Typography
                  component="span"
                  sx={{ fontWeight: 'fontWeightBold' }}
                  ref={chapter?.id?.toString() === currentChapterId ? selectedChapterRef : null}
                >
                  {chapter.id}
                </Typography>
                {` - `}
                {/* {chapter.nameSimple} ({chapter.translatedName}) */}
                {chapter.transliteratedName}
              </SurahListItem>
            </RouterLink>
          ))}
        </SurahListItems>
      </SurahListContainer>
    </SurahListRoot>
  )
})

export default SurahList
