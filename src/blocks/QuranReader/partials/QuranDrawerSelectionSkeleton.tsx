import * as React from 'react'
import { styled } from '@mui/material/styles'
import Skeleton from '~/components/Skeleton'

const ROWS_COUNT = 12
const rowsArr = Array(ROWS_COUNT).fill(null)

const QuranDrawerSelectionSkeletonRoot = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

const QuranDrawerSelectionSkeleton = () => {
  return (
    <QuranDrawerSelectionSkeletonRoot>
      {rowsArr.map((_, i) => (
        <Skeleton
          key={`skeleton_${i}`}
          isActive
          isSquared
          style={{
            width: 'auto',
            height: 'calc(2 * 1.1875rem)',
            marginBlockEnd: '1.1875rem',
          }}
        />
      ))}
    </QuranDrawerSelectionSkeletonRoot>
  )
}

export default QuranDrawerSelectionSkeleton
