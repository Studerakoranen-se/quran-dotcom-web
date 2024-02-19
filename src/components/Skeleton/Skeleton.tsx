import * as React from 'react'
import { styled, Theme } from '@mui/material/styles'
import { SxProps } from '@mui/material'

const SkeletonRoot = styled('div')<{
  ownerState: { baseSize: boolean; active: boolean; rounded?: boolean; squared?: boolean }
}>(({ theme, ownerState }) => ({
  ...(ownerState?.baseSize && {
    position: 'relative',
    display: 'block',
  }),

  ...(ownerState?.active && {
    '&:before': {
      ...theme.mixins.absolute(0),
      content: '""',
      insetBlock: 0,
      insetInlineStart: 0,
      insetInlineEnd: 0,
      borderRadius: '4px',
      backgroundColor: theme.palette.background.default,
      animation: '1.5s ease-in-out 0.5s infinite normal none running loading',
    },
  }),

  '@keyframes loading': {
    '0%': { opacity: 1 },
    '50%': { opacity: 0.4 },
    '100%': { opacity: 1 },
  },
}))

type SkeletonProps = {
  children?: React.ReactNode
  isRounded?: boolean
  isSquared?: boolean
  isActive?: boolean
  style?: React.CSSProperties
  className?: string
  sx?: SxProps<Theme>
}

const Skeleton = ({
  className,
  children,
  isRounded,
  isSquared,
  isActive = true,
  style,
  ...others
}: SkeletonProps) => {
  return (
    <SkeletonRoot
      className={className}
      ownerState={{ baseSize: !children, active: isActive, rounded: isRounded, squared: isSquared }}
      style={style}
      {...others}
    >
      {children && <span style={{ opacity: 0 }}>{children}</span>}
    </SkeletonRoot>
  )
}

export default Skeleton
