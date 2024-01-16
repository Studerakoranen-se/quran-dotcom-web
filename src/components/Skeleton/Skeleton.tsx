import * as React from 'react'
import { styled } from '@mui/material/styles'

const SkeletonRoot = styled('div')<{
  ownerState: { baseSize: boolean; active: boolean; rounded?: boolean; squared?: boolean }
}>(({ theme, ownerState }) => ({
  ...(ownerState?.baseSize && {
    position: 'relative',
    display: 'block',
  }),
}))

type SkeletonProps = {
  children?: React.ReactNode
  isRounded?: boolean
  isSquared?: boolean
  isActive?: boolean
  style?: React.CSSProperties
  className?: string
}

const Skeleton = ({
  className,
  children,
  isRounded,
  isSquared,
  isActive = true,
  style,
}: SkeletonProps) => {
  return (
    <SkeletonRoot
      className={className}
      ownerState={{ baseSize: !children, active: isActive, rounded: isRounded, squared: isSquared }}
      style={style}
    >
      {children && <span style={{ opacity: 0 }}>{children}</span>}
    </SkeletonRoot>
  )
}

export default Skeleton
