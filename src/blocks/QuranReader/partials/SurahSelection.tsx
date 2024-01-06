import * as React from 'react'
import { styled } from '@mui/material/styles'
import SurahList from './SurahList'
import VerseList from './VerseList'

const SurahSelectionRoot = styled('div')(() => ({
  display: 'flex',
  flex: 1,
  '& > .verseListContainer': {
    marginInlineStart: 'var(--spacing-xsmall)',
  },
}))

function SurahSelection({ locale }: { locale: string }) {
  return (
    <SurahSelectionRoot>
      <SurahList locale={locale} />
      <VerseList locale={locale} />
    </SurahSelectionRoot>
  )
}

export default SurahSelection
