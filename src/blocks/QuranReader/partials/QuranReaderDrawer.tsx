import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material/styles'
import { Box, IconButton, useMediaQuery } from '@mui/material'
import {
  selectIsSidebarNavigationVisible,
  selectNavigationItem,
  selectSelectedNavigationItem,
  NavigationItem,
  setIsVisible,
} from '~/store/slices/QuranReader/sidebarNavigation'
import { selectIsReadingByRevelationOrder } from '~/store/slices/revelationOrder'
import useOutsideClickDetector from '~/hooks/useOutsideClickDetector'
import { CloseIcon, Tabs } from '~/components'
import SidebarNavigationSelections from './QuranDrawerSelections'

const QuranReaderDrawerRoot = styled('div')<{
  ref: React.RefObject<HTMLElement>
  ownerState: { containerAuto: boolean; visibleContainer: boolean }
}>(({ theme, ownerState }) => ({
  height: '100vh',
  maxHeight: '100vh',
  position: 'fixed',
  insetBlockStart: 0,
  insetInlineStart: 0,
  overflowX: 'hidden',
  zIndex: 3,
  boxSizing: 'border-box',
  backgroundColor: theme.vars.palette.background.default,
  width: 'calc(100% - (2 * 2rem))',
  paddingInline: '1.1875rem',
  transition: 'transform 0.4s',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'hidden',
  boxShadow: '0px 22px 28px -3px rgba(0,0,0,0.1)',
  paddingBlockStart: 'calc(2 * 3rem)',

  transform: 'translateX(-100%)',
  '[dir="rtl"] &': {
    transform: 'translateX(100%)',
  },

  [theme.breakpoints.up('md')]: {
    width: 'calc(10 * 2rem)',
    paddingBlockStart: 'calc(3.5 * 2rem)',
  },

  ...(ownerState?.visibleContainer && {
    transform: 'translateX(0%)',

    '[dir="rtl"] & ': {
      transform: 'translateX(0%)', // need to duplicate for specificity
    },

    [theme.breakpoints.up('md')]: {
      width: 'calc(10 * 2rem)',
      paddingBlockStart: 'calc(3.5 * 2rem)',
    },
  }),

  ...(ownerState?.containerAuto && {
    [theme.breakpoints.up('md')]: {
      // width: 'calc(10 * 2rem)',
      transform: 'translateX(0%)',
      ' [dir="rtl"] &': {
        transform: 'translateX(0%)', // need to duplicate for specificity
      },
    },
  }),
}))

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

type QuranReaderDrawerProps = {
  locale: string
}

const QuranReaderDrawer = React.memo(function QuranReaderDrawer(props: QuranReaderDrawerProps) {
  const { locale } = props

  const isVisible = useSelector(selectIsSidebarNavigationVisible)
  const selectedNavigationItem = useSelector(selectSelectedNavigationItem)
  const isReadingByRevelationOrder = useSelector(selectIsReadingByRevelationOrder)

  const dispatch = useDispatch()
  // @ts-ignore
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const sidebarRef = React.useRef<React.RefObject<HTMLElement>>()

  const tabs = React.useMemo(
    () => [
      { title: 'Surah', value: NavigationItem.Surah },
      { title: 'Juz', value: NavigationItem.Juz },
    ],
    [],
  )

  const onTabSelected = (event: React.SyntheticEvent, value) => {
    dispatch(selectNavigationItem(value as NavigationItem))
  }

  useOutsideClickDetector(
    // @ts-ignore
    sidebarRef,
    () => {
      dispatch(setIsVisible(false))
    },
    isVisible && isMobile,
  )

  return (
    <QuranReaderDrawerRoot
      // @ts-ignore
      ref={sidebarRef}
      ownerState={{
        visibleContainer: isVisible === true,
        containerAuto: isVisible === 'auto',
      }}
    >
      {!isReadingByRevelationOrder ? (
        // Default ordering
        <React.Fragment>
          {/* switchContainer */}
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginInlineEnd: '0.375rem' }}>
              {/* @ts-ignore */}
              <Tabs tabs={tabs} onSelect={onTabSelected} selected={selectedNavigationItem} />
            </Box>
            <IconButton
              onClick={() => {
                dispatch(setIsVisible(false))
              }}
              sx={(theme) => ({
                border: `1px solid ${theme.vars.palette.divider}`,
                color: theme.palette.text.primary,

                [theme.getColorSchemeSelector('dark')]: {
                  color: '#E0D2B4',
                },

                borderRadius: 1,
                p: 0.5,
              })}
              aria-label={`Toggle Surah Drawer`}
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box
            sx={{
              marginBlockStart: '1rem',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              paddingBlockEnd: '1rem',
            }}
          >
            <SidebarNavigationSelections
              isVisible={isVisible}
              selectedNavigationItem={selectedNavigationItem}
              locale={locale}
            />
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
              marginBlockEnd: '0.1875rem',
            }}
          >
            <IconButton
              onClick={() => {
                dispatch(setIsVisible(false))
              }}
              sx={(theme) => ({
                border: `1px solid ${theme.vars.palette.divider}`,
                color: theme.palette.text.primary,

                [theme.getColorSchemeSelector('dark')]: {
                  color: '#E0D2B4',
                },

                borderRadius: 1,
                p: 0.5,
              })}
              aria-label={`Toggle Surah Drawer`}
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <SidebarNavigationSelections
            isVisible={isVisible}
            selectedNavigationItem={NavigationItem.Surah}
            locale={locale}
          />
        </React.Fragment>
      )}
    </QuranReaderDrawerRoot>
  )
})

export default QuranReaderDrawer
