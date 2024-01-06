import { ActivityDayType, FilterActivityDaysParams } from '~/types/auth/ActivityDay'
import { getCurrentMonth, makeDateRangeFromMonth } from './datetime'

export const getFilterActivityDaysParamsOfCurrentMonth = (): FilterActivityDaysParams => {
  const currentMonth = getCurrentMonth()
  const currentYear = new Date().getFullYear()

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return getFilterActivityDaysParams(currentMonth, currentYear)
}

export const getFilterActivityDaysParams = (
  month: number,
  year: number,
): FilterActivityDaysParams => {
  const { from, to } = makeDateRangeFromMonth(month, year)

  const params: FilterActivityDaysParams = {
    from,
    to,
    limit: 31,
    type: ActivityDayType.QURAN,
  }

  return params
}
