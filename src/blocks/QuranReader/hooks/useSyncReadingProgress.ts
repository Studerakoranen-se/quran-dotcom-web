import * as React from 'react'
import { useSWRConfig } from 'swr'
import debounce from 'lodash/debounce'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import DataContext from '~/contexts/DataContext'
// import { useVerseTrackerContext } from '~/contexts'
import { selectQuranFont, selectQuranMushafLines } from '~/store/slices/QuranReader/styles'
import { setLastReadVerse } from '~/store/slices/QuranReader/readingTracker'
import { getMushafId, useGlobalIntersectionObserver } from '~/utils'
import {
  makeFilterActivityDaysUrl,
  makeReadingSessionsUrl,
  makeStreakUrl,
} from '~/utils/auth/apiPaths'
import { addReadingSession, updateActivityDay } from '~/utils/auth/api'
import { UpdateActivityDayBody } from '~/types/auth/ActivityDay'
import { getFilterActivityDaysParamsOfCurrentMonth } from '~/utils/activity-day'
import { getObservedVersePayload, getOptions, QURAN_READER_OBSERVER_ID } from '../observer'

const READING_DAY_SYNC_TIME_MS = 5000 // 5 seconds
const READING_SESSION_DEBOUNCE_WAIT_TIME = 2000 // 2 seconds

interface UseSyncReadingProgressProps {
  isReadingPreference: boolean
}

/**
 * This hook is responsible for syncing the user's reading progress with the backend.
 *
 * @param {UseSyncReadingProgressProps} options
 */
const useSyncReadingProgress = ({ isReadingPreference }: UseSyncReadingProgressProps) => {
  const chaptersData = React.useContext(DataContext)

  const quranFont = useSelector(selectQuranFont, shallowEqual)
  const mushafLines = useSelector(selectQuranMushafLines, shallowEqual)
  const { mushaf } = getMushafId(quranFont, mushafLines)

  /**
   * `verseKeysQueue` is a queue of verse keys that we need to send to the backend
   * we will clear the queue every {READING_DAY_SYNC_TIME} milliseconds after sending the data to the backend
   * it is also a Set not an array to avoid duplicate verse keys
   */
  // const { verseKeysQueue, shouldTrackObservedVerses } = useVerseTrackerContext()

  const elapsedReadingTimeInSeconds = React.useRef(0)
  const dispatch = useDispatch()

  const { cache, mutate } = useSWRConfig()

  const addReadingSessionAndClearCache = React.useCallback(
    (chapterNumber, verseNumber) => {
      addReadingSession(chapterNumber, verseNumber).then(() => {
        cache.delete(makeReadingSessionsUrl())
      })
    },
    [cache],
  )

  const debouncedAddReadingSession = React.useMemo(
    () => debounce(addReadingSessionAndClearCache, READING_SESSION_DEBOUNCE_WAIT_TIME),
    [addReadingSessionAndClearCache],
  )

  // send the data to the backend and clear the SWR cache
  const updateReadingDayAndClearCache = React.useCallback(
    (body: UpdateActivityDayBody) => {
      updateActivityDay(body).then(() => {
        // invalidate the current month's history cache to refetch the data if we navigated to it
        const currentMonthHistoryUrl = makeFilterActivityDaysUrl(
          getFilterActivityDaysParamsOfCurrentMonth(),
        )
        cache.delete(currentMonthHistoryUrl)

        mutate(makeStreakUrl())
      })
    },
    [mutate, cache],
  )

  // this function will be called when an element is triggered by the intersection observer
  const onElementVisible = React.useCallback(
    (element: Element) => {
      const lastReadVerse = getObservedVersePayload(element)

      dispatch(
        setLastReadVerse({
          lastReadVerse,
          chaptersData,
        }),
      )
    },
    [chaptersData, dispatch],
  )

  useGlobalIntersectionObserver(
    getOptions(isReadingPreference),
    onElementVisible,
    QURAN_READER_OBSERVER_ID,
  )
}

export default useSyncReadingProgress
