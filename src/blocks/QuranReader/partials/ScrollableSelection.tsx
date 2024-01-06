/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { TextField, styled } from '@mui/material'
import { useRouter } from 'next/router'
import { SCROLL_TO_NEAREST_ELEMENT, useScrollToElement } from '~/hooks/useScrollToElement'
import { RouterLink } from '~/containers'

const ScrollableSelectionRoot = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  position: 'relative',
}))

const ScrollableSelectionListContainer = styled('div')(() => ({
  flex: 1,
  position: 'relative',
}))

const ScrollableSelectionListItems = styled('div')(() => ({
  position: 'absolute',
  inset: 0,
  overflowX: 'hidden',
  overflowY: 'auto',
  paddingBlockEnd: 'calc(2 * 2rem)',
  paddingRight: 'calc(1 * 0.5rem)',
  a: {
    textDecoration: 'none',
  },
}))

const ScrollableSelectionListItem = styled('div')<{ ownerState: { isActive: boolean } }>(
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

const ScrollableSelection = ({
  items,
  searchPlaceholder,
  renderItem,
  getHref,
  isJuz = true,
  selectedItem,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const filteredItems = items.filter(
    (item) =>
      item.value.toString().startsWith(searchQuery) ||
      item.label.toString().startsWith(searchQuery),
  )

  useEffect(() => {
    if (!filteredItems.length) {
      console.log('logEmptySearchResults')
    } else {
      console.log('logTextSearchQuery')
    }
  }, [searchQuery, filteredItems, isJuz])

  const [scroll, selectedItemRef] = useScrollToElement<HTMLDivElement>(SCROLL_TO_NEAREST_ELEMENT)
  useEffect(() => {
    scroll()
  }, [selectedItem, scroll])

  // handle when user press `Enter` in input box
  const handleInputSubmit = (e) => {
    e.preventDefault()
    const firstFilteredItem = filteredItems[0]
    if (filteredItems) {
      const href = getHref(firstFilteredItem.value)
      router.push(href)
    }
  }

  return (
    <ScrollableSelectionRoot>
      <form onSubmit={handleInputSubmit}>
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={searchPlaceholder}
          fullWidth
          sx={{
            marginBlockEnd: '1rem',
          }}
        />
      </form>
      <ScrollableSelectionListContainer>
        <ScrollableSelectionListItems>
          {filteredItems.map((item) => (
            <RouterLink href={getHref(item.value)} key={item.value} shouldPrefetch={false}>
              <ScrollableSelectionListItem
                ownerState={{ isActive: item.value === selectedItem }}
                ref={item.value === selectedItem ? selectedItemRef : null}
              >
                {renderItem(item)}
              </ScrollableSelectionListItem>
            </RouterLink>
          ))}
        </ScrollableSelectionListItems>
      </ScrollableSelectionListContainer>
    </ScrollableSelectionRoot>
  )
}

export default ScrollableSelection
