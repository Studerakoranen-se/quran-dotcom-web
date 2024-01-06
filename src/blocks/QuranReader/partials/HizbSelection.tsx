import { useSelector } from 'react-redux'
import { selectLastReadVerseKey } from '~/store/slices/QuranReader/readingTracker'
import { getHizbIds } from '~/utils/hizb'
import { getHizbNavigationUrl } from '~/utils/navigation'
import ScrollableSelection from './ScrollableSelection'

const HizbSelection = ({ locale }: { locale: string }) => {
  const hizbIds = getHizbIds(locale)
  const lastReadVerseKey = useSelector(selectLastReadVerseKey)

  return (
    <ScrollableSelection
      items={hizbIds}
      getHref={getHizbNavigationUrl}
      searchPlaceholder="Search hizb"
      renderItem={(hizb) => `Hizb ${hizb.label}`}
      selectedItem={Number(lastReadVerseKey.hizb)}
    />
  )
}
export default HizbSelection
