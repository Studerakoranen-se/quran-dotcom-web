import * as React from 'react'
import createSvgIcon from '../utils/createSvgIcon'

export default createSvgIcon(
  <line
    x1="5"
    y1="10"
    x2="15"
    y2="10"
    stroke="var(--color-secondary-medium)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  'Divider',
  '0 0 20 20',
)
