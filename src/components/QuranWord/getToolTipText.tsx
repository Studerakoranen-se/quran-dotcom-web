import { Typography } from '@mui/material'
import * as React from 'react'
import { ReactNode } from 'react'
import { WordByWordType } from '~/types/QuranReader'
import Word from '~/types/Word'
// import styles from './QuranWord.module.scss'

/**
 * Generate the Tooltip content based on the settings.
 *
 * @param {WordByWordType[]} showTooltipFor
 * @param {Word} word
 * @returns {ReactNode}
 */
const getTooltipText = (showTooltipFor: WordByWordType[], word: Word): ReactNode => (
  <React.Fragment>
    {showTooltipFor.map((tooltipTextType) => (
      <span key={tooltipTextType}>{word?.[tooltipTextType]?.text}</span>
    ))}
  </React.Fragment>
)

export default getTooltipText
