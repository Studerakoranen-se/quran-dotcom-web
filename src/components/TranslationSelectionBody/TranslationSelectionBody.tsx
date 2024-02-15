// @ts-nocheck
import { useCallback, useState, Fragment } from 'react'
import { Action } from '@reduxjs/toolkit'
import groupBy from 'lodash/groupBy'
import omit from 'lodash/omit'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Box } from '@mui/material'
import DataFetcher from '~/components/DataFetcher'
import Checkbox from '~/components/Forms/Checkbox'
import usePersistPreferenceGroup from '~/hooks/auth/usePersistPreferenceGroup'
import useRemoveQueryParam from '~/hooks/useRemoveQueryParam'
import {
  selectTranslations,
  setSelectedTranslations,
} from '~/store/slices/QuranReader/translations'
import { makeTranslationsUrl } from '~/utils/apiPaths'
import filterTranslations from '~/utils/filter-translations'
import { getLocaleName } from '~/utils/locale'
import { TranslationsResponse } from '~/types/ApiResponses'
import PreferenceGroup from '~/types/auth/PreferenceGroup'
import AvailableTranslation from '~/types/AvailableTranslation'
import QueryParam from '~/types/QueryParam'

const TranslationSelectionBody = () => {
  const {
    actions: { onSettingsChange },
    isLoading,
  } = usePersistPreferenceGroup()
  const router = useRouter()
  const translationsState = useSelector(selectTranslations)
  const { selectedTranslations } = translationsState
  const [searchQuery, setSearchQuery] = useState('')
  const removeQueryParam = useRemoveQueryParam()

  /**
   * Persist settings in the DB if the user is logged in before dispatching
   * Redux action, otherwise just dispatch it.
   *
   * @param {number[]} value
   * @param {Action} action
   */
  const onTranslationsSettingsChange = useCallback(
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

  const onTranslationsChange = useCallback(
    (selectedTranslationId) => {
      return (isChecked: boolean) => {
        // when the checkbox is checked
        // add the selectedTranslationId to redux
        // if unchecked, remove it from redux

        const nextTranslations = isChecked
          ? [...selectedTranslations, selectedTranslationId]
          : selectedTranslations.filter((id) => id !== selectedTranslationId) // remove the id

        // if unchecked also remove from query param
        if (!isChecked) {
          removeQueryParam(QueryParam.Translations)
        }

        onTranslationsSettingsChange(
          nextTranslations,
          setSelectedTranslations({ translations: nextTranslations, locale: 'en' }),
          setSelectedTranslations({ translations: selectedTranslations, locale: 'en' }),
        )
        if (nextTranslations.length) {
          router.query[QueryParam.Translations] = nextTranslations.join(',')
          router.push(router, undefined, { shallow: true })
        }
      }
    },
    [onTranslationsSettingsChange, router, selectedTranslations, removeQueryParam],
  )

  const renderTranslationGroup = useCallback(
    (language, translations) => {
      if (!translations) {
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <Fragment />
      }
      return (
        <Box
          sx={{
            marginBlockEnd: '1.1875rem;',
          }}
          key={language}
        >
          <Box
            sx={{
              textTransform: 'capitalize',
              marginBlockEnd: '0.625rem',
              fontSize: '1.125rem',
              fontWeight: '600',
            }}
          >
            {language}
          </Box>
          {translations
            .sort((a: AvailableTranslation, b: AvailableTranslation) =>
              a.authorName.localeCompare(b.authorName),
            )
            .map((translation: AvailableTranslation) => (
              <Box
                key={translation.id}
                sx={{
                  marginBlockEnd: '0.625rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Checkbox
                  id={translation.id.toString()}
                  checked={selectedTranslations.includes(translation.id)}
                  label={translation.translatedName.name}
                  onChange={onTranslationsChange(translation.id)}
                />
              </Box>
            ))}
        </Box>
      )
    },
    [onTranslationsChange, selectedTranslations],
  )

  return (
    <div>
      <DataFetcher
        queryKey={makeTranslationsUrl('en')}
        render={(data: TranslationsResponse) => {
          const filteredTranslations = searchQuery
            ? filterTranslations(data.translations, searchQuery)
            : data.translations

          if (!filteredTranslations.length) {
            // eslint-disable-next-line no-console
            console.log('Empty SearchQuerySource ')
          }

          const translationByLanguages = groupBy(filteredTranslations, 'languageName')
          const selectedTranslationLanguage = getLocaleName('en').toLowerCase()
          const selectedTranslationGroup = translationByLanguages[selectedTranslationLanguage]
          const translationByLanguagesWithoutSelectedLanguage = omit(translationByLanguages, [
            selectedTranslationLanguage,
          ])

          return (
            <div>
              {renderTranslationGroup(selectedTranslationLanguage, selectedTranslationGroup)}
              {Object.entries(translationByLanguagesWithoutSelectedLanguage)
                .sort((a, b) => {
                  return a[0].localeCompare(b[0])
                })
                .map(([language, translations]) => {
                  return renderTranslationGroup(language, translations)
                })}
            </div>
          )
        }}
      />
    </div>
  )
}

export default TranslationSelectionBody
