import { styled } from '@mui/material'
import React, { ReactNode } from 'react'
import InlineWordByWord from '~/components/QuranWord/InlineWordByWord'
import { QuranFont } from '~/types/QuranReader'
import Word from '~/types/Word'

const PlainVerseTextWordRoot = styled('div')<{
  ownerState: {
    shouldBeHighLighted?: boolean
    isWordByWordLayout?: boolean
    additionalWordGap?: boolean
    tajweedWord?: boolean
  }
}>(({ theme, ownerState }) => ({
  ...theme.typography.body1,
  fontFamily: 'Scheherazade',
  fontSize: theme.typography.pxToRem(26),
  color: theme.vars.palette.text.primary,

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginInlineEnd: '0.375rem',
  marginBlockEnd: '0.625rem',

  ...(ownerState?.isWordByWordLayout && {
    textAlign: 'center',
    paddingBlockStart: '0.1875rem',
    paddingBlockEnd: '0.1875rem',
    paddingInlineStart: '0.1875rem',
    paddingInlineEnd: '0.1875rem',
  }),

  ...(ownerState?.additionalWordGap && {
    marginInlineEnd: theme.spacing(0.75),
  }),

  ...(ownerState?.tajweedWord && {
    '--tajweed-image-bg': 'rgba(31, 189, 233, 0.15)',
    [theme.getColorSchemeSelector('dark')]: {
      '--tajweed-image-bg': 'rgba(255, 255, 255, 0.25)',
    },

    '&:hover': {
      backgroundColor: 'var(--tajweed-image-bg)',
    },
  }),
}))

interface Props {
  word: Word
  font: QuranFont
  children: ReactNode
  shouldShowWordByWordTranslation: boolean
  shouldShowWordByWordTransliteration: boolean
}

const PlainVerseTextWord: React.FC<Props> = ({
  word,
  children,
  shouldShowWordByWordTransliteration,
  shouldShowWordByWordTranslation,
  font,
}) => {
  const isWordByWordLayout = shouldShowWordByWordTranslation || shouldShowWordByWordTransliteration

  return (
    <PlainVerseTextWordRoot
      key={word.location}
      ownerState={{
        isWordByWordLayout,
        tajweedWord: font === QuranFont.Tajweed,
      }}
    >
      {children}
      {shouldShowWordByWordTranslation && <InlineWordByWord text={word?.translation?.text} />}
      {shouldShowWordByWordTransliteration && (
        <InlineWordByWord text={word?.transliteration?.text} />
      )}
    </PlainVerseTextWordRoot>
  )
}

export default PlainVerseTextWord
