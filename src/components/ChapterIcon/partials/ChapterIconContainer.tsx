import * as React from 'react'
import { styled } from '@mui/material'

import ChapterIcon from '../ChapterIcon'

export enum ChapterIconsSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  Mega = 'mega',
}

// TODO: maybe replace `hasSurahPrefix` with `variant` and use it to show v1 or v2 surah name font
interface Props {
  chapterId: string
  size?: ChapterIconsSize
  hasSurahPrefix?: boolean
}

const ChapterIconContainerRoot = styled('span')<{ ownerState: { size: string } }>(
  ({ ownerState }) => ({
    span: {
      lineHeight: 'normal',
      fontFamily: '"SurahNames", "Arial", sans-serif',
      fontSize: '1.125rem',
    },

    ...(ownerState.size === ChapterIconsSize.Small && {
      span: {
        fontSize: '0.75rem',
      },
    }),

    ...(ownerState.size === ChapterIconsSize.Large && {
      span: {
        fontSize: '2rem',
      },
    }),

    ...(ownerState.size === ChapterIconsSize.Mega && {
      span: {
        fontSize: 'calc(1.5 * 2rem)',
      },
    }),
  }),
)

const ChapterIconContainer: React.FC<Props> = (props) => {
  const { chapterId, size = ChapterIconsSize.Medium, hasSurahPrefix = true } = props
  const ownerState = {
    size,
  }
  return (
    <ChapterIconContainerRoot ownerState={ownerState}>
      <ChapterIcon id={chapterId} />
      {hasSurahPrefix && <ChapterIcon id="surah" />}
    </ChapterIconContainerRoot>
  )
}

export default ChapterIconContainer
