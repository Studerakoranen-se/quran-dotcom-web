import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectLastReadVerseKey } from '~/store/slices/QuranReader/readingTracker'
import { getJuzIds, getJuzNumberByHizb } from '~/utils/juz'
import { getJuzNavigationUrl } from '~/utils/navigation'
import ScrollableSelection from './ScrollableSelection'

const JuzSelection = ({ locale }: { locale: string }) => {
  const juzIds = getJuzIds(locale)
  const lastReadVerseKey = useSelector(selectLastReadVerseKey)
  const selectedJuz = useMemo(
    () => getJuzNumberByHizb(Number(lastReadVerseKey.hizb)),
    [lastReadVerseKey.hizb],
  )

  return (
    <ScrollableSelection
      items={juzIds}
      getHref={getJuzNavigationUrl}
      searchPlaceholder="Search Juz"
      renderItem={(juz) => `Juz ${juz.label}`}
      selectedItem={selectedJuz}
    />
  )
}
export default JuzSelection
