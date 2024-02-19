import { styled } from '@mui/material/styles'
import { Skeleton } from '~/components'

const BREAKPOINT_KEY = 'md'

const SkeletonItem = styled(Skeleton)(({ theme }) => ({
  display: 'flex',

  flex: '1 0 100%',
  margin: '0.625rem 0.1875rem',

  padding: '0.625rem 0',
  height: 'calc(2 * 2rem)',

  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    flex: '1 0 42%',
    margin: '0.625rem',
  },
  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    flex: '1 0 30%',
  },
}))

const SkeletonTab = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  margin: 'var(--spacing-xsmall)',
  marginInlineStart: '0.1875rem',

  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    marginInlineStart: 0,
  },
}))

const CHAPTERS_COUNT = 114
const chaptersArr = Array(CHAPTERS_COUNT).fill(null)

const ChapterAndJuzListSkeleton = () => {
  return (
    <span>
      <SkeletonTab>
        <Skeleton
          isActive
          isSquared
          sx={{
            width: 'calc(3 * 2rem)',
            marginInlineEnd: '0.8125rem',
            marginBlockEnd: '0.625rem',
          }}
        />
        <Skeleton
          isActive
          isSquared
          sx={{
            width: ' calc(3 * 2rem)',
          }}
        />
      </SkeletonTab>
      {chaptersArr.map((k, i) => (
        <SkeletonItem
          // eslint-disable-next-line react/no-array-index-key
          key={`skeleton_${i}`}
          isActive
          isSquared
        />
      ))}
    </span>
  )
}

export default ChapterAndJuzListSkeleton
