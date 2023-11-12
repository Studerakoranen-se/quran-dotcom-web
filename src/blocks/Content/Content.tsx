import * as React from 'react'
import { styled } from '@mui/material'
import { SanityHtml } from '~/containers'
import { ContentBlockQueryResult } from '~/api'

const BREAKPOINT_KEY = 'md'

const ContentRoot = styled('section')({
  padding: 'var(--cia-section-spacing) var(--cia-container-spacing)',
})

const ContentContainer = styled('div')<{
  ownerState: { textAlign?: string; maxWidth?: string }
}>(({ theme, ownerState }) => ({
  ...(ownerState?.textAlign === 'center' && {
    margin: '0 auto',
  }),

  ...(ownerState?.textAlign === 'right' && {
    margin: '0 0 0 auto',
  }),

  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    ...(ownerState?.maxWidth && {
      maxWidth:
        ownerState.maxWidth !== 'none' && ownerState.maxWidth?.trim() !== ''
          ? ownerState.maxWidth
          : undefined,
    }),
  },
}))

function Content(props: ContentBlockQueryResult) {
  const { id, text, maxWidth, textAlign } = props

  return (
    <ContentRoot id={id}>
      <ContentContainer
        ownerState={{
          textAlign,
          maxWidth,
        }}
      >
        <SanityHtml blocks={text} />
      </ContentContainer>
    </ContentRoot>
  )
}

export default Content
