import * as React from 'react'
import { SvgIcon } from '@mui/material'

export default function createSvgIcon(
  path: React.ReactNode,
  displayName: string,
  viewBox?: string,
): typeof SvgIcon {
  // @ts-ignore internal component
  // @typescript-eslint/ban-ts-comment
  const Component = (props, ref) => (
    <SvgIcon viewBox={viewBox} ref={ref} {...props}>
      {path}
    </SvgIcon>
  )

  if (process.env.NODE_ENV !== 'production') {
    Component.displayName = `${displayName}Icon`
  }

  // @typescript-eslint/ban-ts-comment
  // @ts-ignore internal component
  return React.memo(React.forwardRef(Component))
}
