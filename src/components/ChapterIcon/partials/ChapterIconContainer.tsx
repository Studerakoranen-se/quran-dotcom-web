import * as React from 'react'
import { styled, Theme } from '@mui/material/styles'
import { Typography, SxProps } from '@mui/material'
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
  sx?: SxProps<Theme>
}

const ChapterIconContainerRoot = styled('span')<{ ownerState: { size: string } }>(
  ({ ownerState }) => ({
    span: {
      lineHeight: 'normal',
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
  const { chapterId, size = ChapterIconsSize.Medium, hasSurahPrefix = false, ...others } = props
  const ownerState = {
    size,
  }
  return (
    <ChapterIconContainerRoot ownerState={ownerState} {...others}>
      <ChapterIcon id={chapterId} />
      {hasSurahPrefix && (
        <Typography
          className={`icon-surah icon-surah-surah`}
          component="span"
          translate="no"
          variant="h2"
        />
      )}
      {/* {hasSurahPrefix && <ChapterIcon id="surah" />} */}
    </ChapterIconContainerRoot>
  )
}

export default ChapterIconContainer
