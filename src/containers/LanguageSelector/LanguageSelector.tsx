import * as React from 'react'
import { Action } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import Router, { useRouter } from 'next/router'
import { ListItemText, MenuItem, MenuList, SvgIcon } from '@mui/material'
import { selectIsUsingDefaultSettings } from '~/store/slices/defaultSettings'
import resetSettings from '~/store/actions/reset-settings'
import {
  selectTranslations,
  setSelectedTranslations,
} from '~/store/slices/QuranReader/translations'
// import { logValueChange } from '~/utils/eventLogger';
import useRemoveQueryParam from '~/hooks/useRemoveQueryParam'
import { setLocaleCookie } from '~/utils/cookies'
import usePersistPreferenceGroup from '~/hooks/auth/usePersistPreferenceGroup'
import PreferenceGroup from '~/types/auth/PreferenceGroup'
import QueryParam from '~/types/QueryParam'
import { i18n } from '@/locales'

const LanguageSelector = React.forwardRef(function LanguageSelector(props) {
  const router = useRouter()
  const dispatch = useDispatch()

  const {
    actions: { onSettingsChange },
    isLoading,
  } = usePersistPreferenceGroup()

  const isUsingDefaultSettings = useSelector(selectIsUsingDefaultSettings)
  const translationsState = useSelector(selectTranslations)
  const { selectedTranslations } = translationsState

  const removeQueryParam = useRemoveQueryParam()

  /**
   * Persist settings in the DB if the user is logged in before dispatching
   * Redux action, otherwise just dispatch it.
   *
   * @param {number[]} value
   * @param {Action} action
   */
  const onTranslationsSettingsChange = React.useCallback(
    (value: number[], action: Action, undoAction: Action) => {
      onSettingsChange(
        'selectedTranslations',
        value,
        action,
        undoAction,
        PreferenceGroup.TRANSLATIONS,
      )
    },
    [onSettingsChange],
  )

  /**
   * When the user changes the language, we will:
   *
   * 1. Call next-translate's setLanguage with the new value.
   * 2. Store the new value of the locale in the cookies so that next time the user
   * lands on the `/` route, he will be redirected to the homepage with the
   * saved locale. This is to over-ride next.js's default behavior which takes
   * into consideration `Accept-language` header {@see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language}
   * as a locale detection mechanism. For further reading on Next.js's behavior
   * {@see https://nextjs.org/docs/advanced-features/i18n-routing}.
   *
   * @param {string} newLocale
   */

  const handleLanguageChange = async (newLocale: string) => {
    const locale = newLocale ?? router.defaultLocale

    // if the user didn't change the settings and he is transitioning to a new locale, we want to apply the default settings of the new locale
    if (isUsingDefaultSettings) {
      dispatch(resetSettings(locale))
    }

    // logValueChange('locale', locale)

    // when the checkbox is checked
    // add the selectedTranslationId to redux
    // if unchecked, remove it from redux

    const nextTranslations = locale === 'en' ? [20] : [48]

    onTranslationsSettingsChange(
      nextTranslations,
      setSelectedTranslations({ translations: nextTranslations, locale }),
      setSelectedTranslations({ translations: selectedTranslations, locale }),
    )

    if (nextTranslations.length && locale !== 'sv') {
      router.query[QueryParam.Translations] = nextTranslations.join(',')
      router.push(router, undefined, { shallow: true, locale })
    } else {
      removeQueryParam(QueryParam.Translations)
      await Router.push(
        {
          pathname: Router.pathname,
          query: Router.query,
        },
        Router.asPath,
        { locale, scroll: true },
      )
    }

    setLocaleCookie(locale)
  }

  return (
    <MenuList dense component="div" {...props}>
      {i18n.languages?.map((language) => (
        <MenuItem
          key={language.path}
          onClick={() => handleLanguageChange(language.id)}
          value={language.id}
          divider
        >
          <ListItemText>
            {language.title}
            {language.id === router.locale && (
              <SvgIcon
                fontSize="small"
                sx={{
                  position: 'absolute',
                  marginTop: -1,
                  color: (theme) => (theme.palette.mode === 'light' ? '#4ab0b0' : '#cab280'),
                }}
              >
                <circle cx="12" cy="12" r="6" />
              </SvgIcon>
            )}
          </ListItemText>
        </MenuItem>
      ))}
    </MenuList>
  )
})

export default LanguageSelector
