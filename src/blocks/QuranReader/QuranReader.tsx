import { styled } from '@mui/material'
import * as React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { selectReadingPreference } from '~/store/slices/QuranReader/readingPreferences'
import { selectIsSidebarNavigationVisible } from '~/store/slices/QuranReader/sidebarNavigation'
import { selectQuranReaderStyles } from '~/store/slices/QuranReader/styles'
import { ChapterInfoResponse, ChapterResponse, VersesResponse } from '~/types/ApiResponses'
import { QuranReaderDataType, ReadingPreference } from '~/types/QuranReader'
// import { addToHistory, updateVerseCount } from '~/store/historySlice'
import { VerseTrackerContextProvider } from '~/contexts/VerseTrackerContext'
import QuranReaderDrawer from './partials/QuranReaderDrawer'
import QuranReaderInfoDrawer from './partials/QuranReaderInfoDrawer'
import QuranReaderView from './partials/QuranReaderView'

const QuranReaderRoot = styled('section')<{
  ownerState: {
    withSidebarNavigationOpenOrAuto: boolean | string
  }
}>(({ theme, ownerState }) => ({
  paddingBlockStart: '1.5rem',
  paddingInlineStart: 0,
  paddingInlineEnd: 0,
  paddingBlockEnd: 'calc(4 * 2rem)',
  transition: '0.4s',

  ...(ownerState?.withSidebarNavigationOpenOrAuto && {
    [theme.breakpoints.up('md')]: {
      marginInlineStart: 'calc(10 * 2rem)',
    },
  }),
}))

const QuranReaderRootMain = styled('div')(({ theme }) => ({
  padding: '0 var(--cia-container-spacing)',

  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(0, 12),
  },
}))

const QuranReaderRootInfiniteScroll = styled('div')<{
  ownerState: { readingView?: boolean }
}>(({ theme, ownerState }) => ({
  marginBlockStart: 0,
  marginBlockEnd: 0,
  marginInlineStart: 'auto',
  marginInlineEnd: 'auto',
  width: '95%',

  [theme.breakpoints.up('md')]: {
    width: '88%',
    maxWidth: '112rem',
  },

  ...(ownerState.readingView && {
    minHeight: '100vh',

    [theme.breakpoints.down('md')]: {
      width: '85%',
    },
  }),
}))

const QuranReaderStickyFilter = styled('div')<{
  ownerState: { enableShadow?: boolean; isHeaderStikcy?: boolean }
}>(({ theme, ownerState }) => ({
  position: 'sticky',
  zIndex: 3,
  top: 0,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  ...(ownerState.isHeaderStikcy && {
    top: 'calc(22px + var(--cia-header-toolbar-primary-height))',
  }),

  ...(ownerState.enableShadow && {
    boxShadow: '0px 22px 28px -3px rgba(0,0,0,0.1)',
  }),
}))

const QuranReaderGridActionsButtons = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  backgroundColor: theme.vars.palette.background.default,
}))

type QuranReaderProps = {
  initialData: VersesResponse
  chapterInfoResponse: ChapterInfoResponse
  chapterResponse: ChapterResponse
  id: number | string // can be the chapter, verse, tafsir, hizb, juz, rub or page's ID.
  quranReaderDataType?: QuranReaderDataType
  locale: string
}

function QuranReader(props: QuranReaderProps) {
  const {
    initialData,
    id,
    quranReaderDataType = QuranReaderDataType.Chapter,
    locale,
    chapterInfoResponse,
    chapterResponse,
  } = props

  const isSidebarNavigationVisible = useSelector(selectIsSidebarNavigationVisible)
  const quranReaderStyles = useSelector(selectQuranReaderStyles, shallowEqual)
  const readingPreference = useSelector(selectReadingPreference) as ReadingPreference
  const isReadingPreference = readingPreference === ReadingPreference.Reading

  return (
    <React.Fragment>
      <QuranReaderRoot
        ownerState={{
          withSidebarNavigationOpenOrAuto: isSidebarNavigationVisible,
        }}
      >
        <QuranReaderRootInfiniteScroll
          ownerState={{
            readingView: isReadingPreference,
          }}
        >
          <VerseTrackerContextProvider>
            <QuranReaderView
              isReadingPreference={isReadingPreference}
              quranReaderStyles={quranReaderStyles}
              initialData={initialData}
              quranReaderDataType={quranReaderDataType}
              resourceId={id}
              locale={locale}
            />
          </VerseTrackerContextProvider>
        </QuranReaderRootInfiniteScroll>
      </QuranReaderRoot>
      <QuranReaderDrawer locale={locale} />
      <QuranReaderInfoDrawer
        chapter={chapterResponse.chapter}
        chapterInfo={chapterInfoResponse.chapterInfo}
        locale={locale}
      />
    </React.Fragment>
  )
}

export default QuranReader
