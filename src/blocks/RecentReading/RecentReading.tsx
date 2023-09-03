import { Typography, styled } from '@mui/material'

const RecentReadingRoot = styled('section')(({ theme }) => ({
  position: 'relative',
}))

const RecentReadingMain = styled('div')(({ theme }) => ({
  ...theme.mixins.contain('lg'),
  marginBlockStart: theme.spacing(3),
  marginBlockEnd: theme.spacing(3),
}))

type RecentReactProps = {
  heading: string
}

function RecentReading(props: RecentReactProps) {
  const { heading } = props

  return (
    <RecentReadingRoot>
      <RecentReadingMain>
        {heading && (
          <Typography variant="h2" component="h4">
            {heading}
          </Typography>
        )}
      </RecentReadingMain>
    </RecentReadingRoot>
  )
}

export default RecentReading
