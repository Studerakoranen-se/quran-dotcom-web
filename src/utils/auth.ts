import { configureRefreshFetch } from 'refresh-fetch'
import { camelizeKeys } from 'humps'
import { ActivityDay, UpdateActivityDayBody } from '~/types/auth/ActivityDay'
import PreferenceGroup from '~/types/auth/PreferenceGroup'
import { Mushaf } from '~/types/QuranReader'
import {
  makeActivityDaysUrl,
  makeReadingSessionsUrl,
  makeRefreshTokenUrl,
  makeUserBulkPreferencesUrl,
} from './apiPaths'

const shouldRefreshToken = (error) => {
  return error?.message === 'must refresh token'
}

type RequestData = Record<string, any>

const handleErrors = async (res) => {
  const body = await res.json()
  throw new Error(body?.message)
}

export const OFFLINE_ERROR = 'OFFLINE'

export type RefreshToken = {
  success: true
  exp: number
}

/**
 * Execute a POST request
 *
 * @param {string} url
 * @param {RequestData} requestData
 * @returns {Promise<T>}
 */
export const postRequest = <T>(url: string, requestData: RequestData): Promise<T> =>
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  privateFetcher(url, {
    method: 'POST',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData),
  })

// Intl.DateTimeFormat is performance heavy so we are caching the formatter.
// @ts-ignore
let dateTimeFormatter: Intl.DateTimeFormat = null
// @ts-ignore
let timezone: string = null

/**
 * Returns the current timezone.
 *
 * @example `Europe/London`
 * @returns {string}
 */
export const getTimezone = (): string => {
  if (timezone) return timezone
  if (!dateTimeFormatter) dateTimeFormatter = new Intl.DateTimeFormat()

  timezone = dateTimeFormatter.resolvedOptions().timeZone
  return timezone
}

export const fetcher = async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  // if the user is not online when making the API call
  if (typeof window !== 'undefined' && !window.navigator.onLine) {
    throw new Error(OFFLINE_ERROR)
  }
  const res = await fetch(input, init)
  if (!res.ok || res.status === 500 || res.status === 404) {
    throw res
  }
  const json = await res.json()
  return camelizeKeys(json)
}

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export const refreshToken = async (): Promise<RefreshToken> => privateFetcher(makeRefreshTokenUrl())

export const withCredentialsFetcher = async <T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> => {
  try {
    const data = await fetcher<T>(input, {
      ...init,
      credentials: 'include',
      headers: {
        ...init?.headers,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'x-timezone': getTimezone(),
      },
    })
    return data
  } catch (error) {
    await handleErrors(error)
    // @ts-ignore
    return null
  }
}

export const privateFetcher = configureRefreshFetch({
  shouldRefreshToken,
  // @ts-ignore
  refreshToken,
  fetch: withCredentialsFetcher,
})

export const addReadingSession = async (chapterNumber: number, verseNumber: number) =>
  postRequest(makeReadingSessionsUrl(), {
    chapterNumber,
    verseNumber,
  })

export const updateActivityDay = async ({
  mushafId,
  type,
  ...body
}: UpdateActivityDayBody): Promise<ActivityDay> =>
  postRequest(makeActivityDaysUrl({ mushafId, type }), body)

export const addOrUpdateBulkUserPreferences = async (
  preferences: Record<PreferenceGroup, any>,
  mushafId: Mushaf,
) => postRequest(makeUserBulkPreferencesUrl(mushafId), preferences)
