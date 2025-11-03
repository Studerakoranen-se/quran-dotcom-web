import { Action } from '@reduxjs/toolkit'
import React from 'react'
import { useSelector } from 'react-redux'
import { Html } from '~/components'
import Counter from '~/components/Counter'
import SpinnerContainer from '~/components/SpinnerContainer'
import usePersistPreferenceGroup from '~/hooks/auth/usePersistPreferenceGroup'
import {
  decreaseTafsirFontScale,
  increaseTafsirFontScale,
  MAXIMUM_TAFSIR_FONT_STEP,
  MINIMUM_FONT_STEP,
  selectQuranReaderStyles,
} from '~/store/slices/QuranReader/styles'
import PreferenceGroup from '~/types/auth/PreferenceGroup'
import { logValueChange } from '~/utils/eventLogger'
import styles from './TafsirText.module.scss'

type TafsirTextProps = {
  direction: string
  languageCode: string
  text: string
}

const FONT_SIZE_CLASS_MAP = {
  1: styles.xs,
  2: styles.sm,
  3: styles.md,
  4: styles.lg,
  5: styles.xl,
}

const TafsirText: React.FC<TafsirTextProps> = ({ direction, languageCode, text }) => {
  const quranReaderStyles = useSelector(selectQuranReaderStyles)
  const {
    actions: { onSettingsChange },
    isLoading,
  } = usePersistPreferenceGroup()
  const { tafsirFontScale } = quranReaderStyles

  /**
   * Persist settings in the DB if the user is logged in before dispatching
   * Redux action, otherwise just dispatch it.
   *
   * @param {string} key
   * @param {number} value
   * @param {Action} action
   */
  const onTafsirsSettingsChange = (
    key: string,
    value: number,
    action: Action,
    undoAction: Action,
  ) => {
    onSettingsChange(key, value, action, undoAction, PreferenceGroup.QURAN_READER_STYLES)
  }

  const onFontScaleDecreaseClicked = () => {
    const newValue = tafsirFontScale - 1
    logValueChange('tafsir_font_scale', tafsirFontScale, newValue)
    onTafsirsSettingsChange(
      'tafsirFontScale',
      newValue,
      decreaseTafsirFontScale(),
      increaseTafsirFontScale(),
    )
  }

  const onFontScaleIncreaseClicked = () => {
    const newValue = tafsirFontScale + 1
    logValueChange('tafsir_font_scale', tafsirFontScale, newValue)
    onTafsirsSettingsChange(
      'tafsirFontScale',
      newValue,
      increaseTafsirFontScale(),
      decreaseTafsirFontScale(),
    )
  }
  return (
    <React.Fragment>
      <div dir={direction} className={styles.counter}>
        <SpinnerContainer isLoading={isLoading}>
          <Counter
            count={tafsirFontScale}
            onDecrement={
              tafsirFontScale === MINIMUM_FONT_STEP ? undefined : onFontScaleDecreaseClicked
            }
            onIncrement={
              tafsirFontScale === MAXIMUM_TAFSIR_FONT_STEP ? undefined : onFontScaleIncreaseClicked
            }
            locale={languageCode}
          />
        </SpinnerContainer>
      </div>
      <Html
        className={FONT_SIZE_CLASS_MAP[tafsirFontScale]}
        dir={direction}
        lang={languageCode}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </React.Fragment>
  )
}
export default TafsirText
