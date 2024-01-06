import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles'
import { SCROLL_TO_NEAREST_ELEMENT, useScrollToElement } from '~/hooks/useScrollToElement'
import { selectIsVerseKeySelected } from '~/store/slices/QuranReader/readingTracker'
import { toLocalizedNumber } from '~/utils/locale'
import { getChapterWithStartingVerseUrl } from '~/utils/navigation'
import { getVerseNumberFromKey } from '~/utils/verse'
import { RouterLink } from '~/containers'

const VerseListItemRoot = styled('div')<{ ownerState: { isActive: boolean } }>(
  ({ theme, ownerState }) => ({
    '[dir="rtl"] &': {
      direction: 'rtl',
    },

    padding: '0.625rem',
    borderRadius: '0.5rem',

    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },

    ...(ownerState?.isActive && {
      fontWeight: theme.typography.fontWeightBold,
      backgroundColor: theme.palette.action.hover,
    }),
  }),
)

type VerseListItemProps = {
  verseKey: string
  locale: string
}
const VerseListItem = React.memo(({ verseKey, locale }: VerseListItemProps) => {
  const isVerseKeySelected = useSelector(selectIsVerseKeySelected(verseKey))

  const verseNumber = getVerseNumberFromKey(verseKey)
  const localizedVerseNumber = toLocalizedNumber(verseNumber, locale)

  const [scrollTo, verseRef] = useScrollToElement<HTMLDivElement>(SCROLL_TO_NEAREST_ELEMENT)

  useEffect(() => {
    if (isVerseKeySelected) scrollTo()
  }, [scrollTo, isVerseKeySelected])

  return (
    <RouterLink
      href={getChapterWithStartingVerseUrl(verseKey)}
      key={verseKey}
      shallow
      shouldPrefetch={false}
    >
      <VerseListItemRoot
        ref={verseRef}
        ownerState={{
          isActive: isVerseKeySelected,
        }}
      >
        {localizedVerseNumber}
      </VerseListItemRoot>
    </RouterLink>
  )
})

export default VerseListItem
