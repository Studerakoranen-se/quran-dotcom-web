import * as React from 'react'
import QuranReaderStyles from '~/store/types/QuranReaderStyles'
import { QuranReaderDataType } from '~/types/QuranReader'
import { VersesResponse } from '~/types/ApiResponses'
import useSyncReadingProgress from '../hooks/useSyncReadingProgress'
import TranslationView from './TranslationView'

interface Props {
  isReadingPreference: boolean
  quranReaderStyles: QuranReaderStyles
  quranReaderDataType: QuranReaderDataType
  initialData: VersesResponse
  resourceId: number | string
  locale: string
}

const QuranReaderView = (props: Props) => {
  const {
    isReadingPreference,
    quranReaderStyles,
    quranReaderDataType,
    initialData,
    resourceId,
    locale,
  } = props

  useSyncReadingProgress({
    isReadingPreference,
  })

  if (isReadingPreference) {
    return (
      <React.Fragment>
        <p>ReadingView</p>
        {/* <ReadingPreferenceSwitcher /> */}
        {/* <ReadingView
          quranReaderStyles={quranReaderStyles}
          quranReaderDataType={quranReaderDataType}
          initialData={initialData}
          resourceId={resourceId}
        /> */}
      </React.Fragment>
    )
  }

  return (
    <TranslationView
      quranReaderStyles={quranReaderStyles}
      quranReaderDataType={quranReaderDataType}
      initialData={initialData}
      resourceId={resourceId}
      locale={locale}
    />
  )
}
export default QuranReaderView
