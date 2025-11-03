import { useSelector as useXstateSelector } from '@xstate/react'
import { useContext, useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  getQuranReaderStylesInitialState,
  getTranslationsInitialState,
} from '~/store/defaultSettings/util'
import { selectIsUsingDefaultWordByWordLocale } from '~/store/slices/QuranReader/readingPreferences'
import { selectQuranFont, selectQuranMushafLines } from '~/store/slices/QuranReader/styles'
import { selectIsUsingDefaultTranslations } from '~/store/slices/QuranReader/translations'
import { areArraysEqual } from '~/utils/array'
import { selectIsUsingDefaultReciter } from '~/xstate/actors/audioPlayer/selectors'
import { AudioPlayerMachineContext } from '~/xstate/AudioPlayerMachineContext'

type Props = {
  translations?: number[]
  locale: string
}

const useIsUsingDefaultSettings = (props: Props) => {
  const { translations, locale } = props
  const audioService = useContext(AudioPlayerMachineContext)
  const isUsingDefaultReciter = useXstateSelector(audioService, (state) =>
    selectIsUsingDefaultReciter(state),
  )
  const isUsingDefaultWordByWordLocale = useSelector(selectIsUsingDefaultWordByWordLocale)
  const isUsingDefaultTranslations = useSelector(selectIsUsingDefaultTranslations)

  const quranFont = useSelector(selectQuranFont)
  const mushafLines = useSelector(selectQuranMushafLines)

  const defaultState = useMemo(() => {
    return {
      quranReaderStyles: getQuranReaderStylesInitialState(locale),
      translations: getTranslationsInitialState(locale),
    }
  }, [locale])

  const isUsingDefaultFont =
    defaultState.quranReaderStyles.quranFont === quranFont &&
    defaultState.quranReaderStyles.mushafLines === mushafLines

  const areTranslationsEqual = useMemo(() => {
    if (!translations) {
      return false
    }

    return areArraysEqual(defaultState.translations.selectedTranslations, translations)
  }, [translations, defaultState.translations.selectedTranslations])

  const isUsingDefaultSettings =
    isUsingDefaultFont && isUsingDefaultReciter && isUsingDefaultWordByWordLocale

  if (translations) {
    return isUsingDefaultSettings && isUsingDefaultTranslations && areTranslationsEqual
  }

  return isUsingDefaultSettings
}

export default useIsUsingDefaultSettings
