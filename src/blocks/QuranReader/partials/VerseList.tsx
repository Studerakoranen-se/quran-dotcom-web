/* eslint-disable no-console */
import { useState, useMemo, useEffect, useContext } from 'react'
import { styled } from '@mui/material/styles'
import { TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import DataContext from '~/contexts/DataContext'
import { selectLastReadVerseKey } from '~/store/slices/QuranReader/readingTracker'
import SearchQuerySource from '~/types/SearchQuerySource'
import useChapterIdsByUrlPath from '~/hooks/useChapterId'
import { generateChapterVersesKeys, getVerseNumberFromKey } from '~/utils/verse'
import { getChapterWithStartingVerseUrl } from '~/utils/navigation'
import { toLocalizedNumber } from '~/utils/locale'
import VerseListItem from './VerseListItem'

const VerseListRoot = styled('div')(({ theme }) => ({
  paddingInlineStart: '0.625rem',
  paddingInlineEnd: '0.625rem',
  borderInlineStart: `1px solid ${theme.vars.palette.divider}`,
  borderInlineEnd: `1px solid ${theme.vars.palette.divider}`,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  marginInlineStart: '0.625rem',
}))

const VerseListContainer = styled('div')(() => ({
  flex: 1,
  position: 'relative',
}))

const VerseListItems = styled('div')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  overflowX: 'hidden',
  overflowY: 'auto',
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

const VerseList = ({ locale }: { locale: string }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const lastReadVerseKey = useSelector(selectLastReadVerseKey)
  const router = useRouter()
  const chaptersData = useContext(DataContext)

  const chapterIds = useChapterIdsByUrlPath(locale)
  const urlChapterId = chapterIds && chapterIds.length > 0 ? chapterIds[0] : null

  const [currentChapterId, setCurrentChapterId] = useState(urlChapterId)

  useEffect(() => {
    setCurrentChapterId(lastReadVerseKey.chapterId)
  }, [lastReadVerseKey])

  useEffect(() => {
    // when the user navigates to a new chapter, reset the search query, and update the current chapter id
    setSearchQuery('')
    setCurrentChapterId(urlChapterId)
  }, [urlChapterId])

  const verseKeys = useMemo(
    () => (currentChapterId ? generateChapterVersesKeys(chaptersData, currentChapterId) : []),
    [chaptersData, currentChapterId],
  )

  const filteredVerseKeys = verseKeys.filter((verseKey) => {
    const verseNumber = getVerseNumberFromKey(verseKey)
    const localizedVerseNumber = toLocalizedNumber(verseNumber, locale)
    return (
      localizedVerseNumber.toString().startsWith(searchQuery) ||
      verseNumber.toString().startsWith(searchQuery)
    )
  })

  useEffect(() => {
    if (!filteredVerseKeys.length) {
      console.log(searchQuery, SearchQuerySource.SidebarNavigationVersesList)
    } else {
      console.log(searchQuery, SearchQuerySource.SidebarNavigationVersesList)
    }
  }, [searchQuery, filteredVerseKeys])

  // Handle when user press `Enter` in input box
  const handleVerseInputSubmit = (e) => {
    e.preventDefault()
    const firstFilteredVerseKey = filteredVerseKeys[0]
    if (firstFilteredVerseKey) {
      router.push(getChapterWithStartingVerseUrl(firstFilteredVerseKey), undefined, {
        shallow: true, // https://nextjs.org/docs/routing/shallow-routing
      })
    }
  }

  return (
    <VerseListRoot>
      <form onSubmit={handleVerseInputSubmit}>
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Verse"
          fullWidth
          sx={{
            marginBlockEnd: '1rem',
          }}
        />
      </form>
      <VerseListContainer>
        <VerseListItems>
          {filteredVerseKeys.map((verseKey) => {
            return <VerseListItem verseKey={verseKey} key={verseKey} locale={locale} />
          })}
        </VerseListItems>
      </VerseListContainer>
    </VerseListRoot>
  )
}

export default VerseList
