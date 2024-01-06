import { useMemo } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import useSWRImmutable from 'swr/immutable'
import { selectRecentReadingSessions } from '~/store/slices/QuranReader/readingTracker'
import { makeReadingSessionsUrl } from '~/utils/auth/apiPaths'
import { privateFetcher } from '~/utils/auth/api'

interface ReadingSession {
  chapterNumber: number
  id: number
  updatedAt: string
  verseNumber: number
}

const useGetRecentlyReadVerseKeys = () => {
  const recentReadingSessions = useSelector(selectRecentReadingSessions, shallowEqual)

  const { data, isValidating } = useSWRImmutable<ReadingSession[]>(
    makeReadingSessionsUrl(),
    privateFetcher,
  )

  const recentlyReadVerseKeys = useMemo(() => {
    return Object.keys(recentReadingSessions)
  }, [recentReadingSessions])

  // we don't need to pass the error because it'll fallback to an empty array
  return {
    recentlyReadVerseKeys,
    isLoading: isValidating && !data,
  }
}

export default useGetRecentlyReadVerseKeys
