import { useCallback, useMemo, useState } from 'react'
import { Action, AsyncThunkAction } from '@reduxjs/toolkit'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { selectQuranFont, selectQuranMushafLines } from '~/store/slices/QuranReader/styles'
import { getMushafId } from '~/utils/api'
import { addOrUpdateUserPreference } from '~/utils/auth/api'
import PreferenceGroup from '~/types/auth/PreferenceGroup'

type ActionOrThunkAction = Action | AsyncThunkAction<any, any, any>
type Value = string | number | boolean | Record<string, any>

type Actions = {
  onSettingsChangeWithoutDispatch: (
    key: string,
    value: Value,
    preferenceGroup: PreferenceGroup,
    callback: () => void,
  ) => void
  onSettingsChange: (
    key: string,
    value: Value,
    action: ActionOrThunkAction,
    undoAction: ActionOrThunkAction,
    preferenceGroup: PreferenceGroup,
    successCallback?: () => void,
  ) => void
  onXstateSettingsChange: (
    key: string,
    value: string | number | boolean | Record<string, any>,
    action: () => void,
    undoAction: () => void,
    preferenceGroup: PreferenceGroup,
    successCallback?: () => void,
  ) => void
}

type PersistPreferences = { actions: Actions; isLoading: boolean }

/**
 * A hook that will be used to:
 * 1. If the user is logged in, we persist settings
 * to the DB then dispatch the redux action that
 * would apply the changes locally (and might also persist
 * it locally in the localStorage depending on the slice)
 * 2. If not, just dispatch the action.
 *
 * @returns {PersistPreferences}
 */
const usePersistPreferenceGroup = (): PersistPreferences => {
  const dispatch = useDispatch()
  const isLoggedIn = false
  const [isLoading, setIsLoading] = useState(false)

  const quranFont = useSelector(selectQuranFont, shallowEqual)
  const mushafLines = useSelector(selectQuranMushafLines, shallowEqual)

  // this function is used to get the updated mushafId and pass it to addOrUpdateUserPreference
  // if the preferenceGroup is not QURAN_READER_STYLES, it will return undefined
  const getUpdatedMushafId = useCallback(
    (
      preferenceGroup: PreferenceGroup,
      key: string,
      value: string | number | boolean | Record<string, any>,
    ) => {
      if (preferenceGroup !== PreferenceGroup.QURAN_READER_STYLES) return undefined

      const font = key === 'quranFont' ? value : quranFont
      const lines = key === 'mushafLines' ? value : mushafLines

      // @ts-ignore
      return getMushafId(font, lines).mushaf
    },
    [quranFont, mushafLines],
  )

  const actions = useMemo(
    () => ({
      onSettingsChangeWithoutDispatch: (
        key: string,
        value: string | number | boolean | Record<string, any>,
        preferenceGroup: PreferenceGroup,
        callback: () => void,
      ) => {
        if (isLoggedIn) {
          setIsLoading(true)
          addOrUpdateUserPreference(
            key,
            value,
            preferenceGroup,
            getUpdatedMushafId(preferenceGroup, key, value),
          )
            .then(() => {
              callback()
            })
            .finally(() => {
              setIsLoading(false)
            })
        } else {
          callback()
        }
      },
      onXstateSettingsChange: (
        key: string,
        value: string | number | boolean | Record<string, any>,
        action: () => void,
        undoAction: () => void,
        preferenceGroup: PreferenceGroup,
        successCallback?: () => void,
      ) => {
        if (isLoggedIn) {
          action()
          setIsLoading(true)
          addOrUpdateUserPreference(
            key,
            value,
            preferenceGroup,
            getUpdatedMushafId(preferenceGroup, key, value),
          )
            .then(() => {
              if (successCallback) {
                successCallback()
              }
            })
            .catch(() => {
              // toast(t('error.pref-persist-fail'), {
              //   status: ToastStatus.Warning,
              //   actions: [
              //     {
              //       text: t('undo'),
              //       primary: true,
              //       onClick: () => {
              //         undoAction();
              //       },
              //     },
              //     {
              //       text: t('continue'),
              //       primary: false,
              //       onClick: () => {
              //         if (successCallback) {
              //           successCallback();
              //         }
              //       },
              //     },
              //   ],
              // });
            })
            .finally(() => {
              setIsLoading(false)
            })
        } else {
          action()
        }
      },
      onSettingsChange: (
        key: string,
        value: string | number | boolean | Record<string, any>,
        action: ActionOrThunkAction,
        undoAction: ActionOrThunkAction,
        preferenceGroup: PreferenceGroup,
        successCallback?: () => void,
      ) => {
        if (isLoggedIn) {
          // 1. dispatch the action first
          // @ts-ignore
          dispatch(action)
          setIsLoading(true)
          addOrUpdateUserPreference(
            key,
            value,
            preferenceGroup,
            getUpdatedMushafId(preferenceGroup, key, value),
          )
            .then(() => {
              if (successCallback) {
                successCallback()
              }
            })
            .catch(() => {
              // toast(t('error.pref-persist-fail'), {
              //   status: ToastStatus.Warning,
              //   actions: [
              //     {
              //       text: t('undo'),
              //       primary: true,
              //       onClick: () => {
              //         dispatch(undoAction);
              //       },
              //     },
              //     {
              //       text: t('continue'),
              //       primary: false,
              //       onClick: () => {
              //         if (successCallback) {
              //           successCallback();
              //         }
              //       },
              //     },
              //   ],
              // });
            })
            .finally(() => {
              setIsLoading(false)
            })
        } else {
          // @ts-ignore
          dispatch(action)
        }
      },
    }),
    [isLoggedIn, getUpdatedMushafId, dispatch],
  )

  return { actions, isLoading }
}

export default usePersistPreferenceGroup
