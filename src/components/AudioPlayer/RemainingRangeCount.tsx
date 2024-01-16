import { useSelector } from '@xstate/react'
import { toLocalizedNumber } from '~/utils/locale'

// eslint-disable-next-line react/prop-types
const RemainingRangeCount = ({ rangeActor }) => {
  const remainingCount = useSelector(rangeActor, (state) => {
    const { totalRangeCycle, currentRangeCycle } = (state as any).context
    return totalRangeCycle - currentRangeCycle + 1 // +1 to include the current cycle
  })
  const localizedRemainingCount = toLocalizedNumber(remainingCount, 'sv')

  return <span>{localizedRemainingCount}</span>
}

export default RemainingRangeCount
