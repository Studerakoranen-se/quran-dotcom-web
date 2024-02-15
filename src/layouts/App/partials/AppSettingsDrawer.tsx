// @ts-nocheck
import * as React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Drawer, IconButton, Toolbar, Typography, styled } from '@mui/material'
import {
  Navbar,
  selectNavbar,
  setIsNavigationDrawerOpen,
  setIsSearchDrawerOpen,
  setIsSettingsDrawerOpen,
  setIsVisible,
} from '~/store/slices/navbar'
import usePreventBodyScrolling from '~/hooks/usePreventBodyScrolling'
import { CloseIcon } from '~/components'

const BREAKPOINT_KEY = 'sm'

const AppSettingsDrawerRoot = styled(Drawer)(({ theme }) => ({
  '--ikas-toolbar-spacing': theme.spacing(2),
  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    '--ikas-toolbar-spacing': theme.spacing(2),
  },

  zIndex: `${theme.zIndex.appBar - 1} !important`,
  '& .MuiDrawer-paper': {
    top: 'var(--cia-header-height)',
    backgroundColor: theme.vars.palette.background.default,
    maxWidth: '100%',
    width: 375,
    overflowX: 'hidden',
  },
}))

const AppSettingsDrawerScrollContainer = styled('div')(({ theme }) => ({
  ...theme.mixins.scrollable,
  ...theme.mixins.scrollbars,
  display: 'inherit',
  flexDirection: 'inherit',
  flexGrow: 1,
  padding: 'var(--ikas-toolbar-spacing)',
}))

export enum DrawerType {
  Navigation = 'navigation',
  Search = 'search',
  Settings = 'settings',
}

export enum DrawerAnchor {
  Left = 'left',
  Right = 'right',
}

/**
 * Check whether a specific drawer is open or not based on the type.
 *
 * @param {DrawerType} type
 * @param {Navbar} navbar
 * @returns {boolean}
 */
const getIsOpen = (type: DrawerType, navbar: Navbar): boolean => {
  const { isNavigationDrawerOpen, isSettingsDrawerOpen, isSearchDrawerOpen } = navbar
  if (type === DrawerType.Navigation) {
    return isNavigationDrawerOpen
  }
  if (type === DrawerType.Settings) {
    return isSettingsDrawerOpen
  }
  return isSearchDrawerOpen
}

const getActionCreator = (type: DrawerType) => {
  if (type === DrawerType.Navigation) {
    return setIsNavigationDrawerOpen.type
  }
  if (type === DrawerType.Settings) {
    return setIsSettingsDrawerOpen.type
  }
  return setIsSearchDrawerOpen.type
}

interface AppDrawerProps {
  type: DrawerType
  anchor?: DrawerAnchor
  header: React.ReactNode
  hideCloseButton?: boolean
  children: React.ReactNode
  closeOnNavigation?: boolean
}

const AppDrawer = React.memo(function AppSearchDrawer(props: AppDrawerProps) {
  const {
    type,
    anchor = DrawerAnchor.Right,
    header,
    children,
    hideCloseButton = false,
    closeOnNavigation = true,
  } = props

  const { isVisible: isNavbarVisible } = useSelector(selectNavbar, shallowEqual)
  const dispatch = useDispatch()
  const navbar = useSelector(selectNavbar, shallowEqual)
  const isOpen = getIsOpen(type, navbar)

  usePreventBodyScrolling(isOpen)

  const router = useRouter()
  const drawerRef = React.useRef(null)

  const onDrawerClose = React.useCallback(
    (actionSource = 'click') => {
      dispatch({ type: getActionCreator(type), payload: false })
    },
    [dispatch, type],
  )

  React.useEffect(() => {
    // Keep nav bar visible when drawer is open
    if (isOpen) {
      dispatch(setIsVisible(true))
    }

    // Hide navbar after successful navigation
    router.events.on('routeChangeComplete', () => {
      if (isOpen && closeOnNavigation) {
        onDrawerClose('navigation')
      }
    })
  }, [dispatch, router.events, isNavbarVisible, isOpen, closeOnNavigation, onDrawerClose])

  return (
    <AppSettingsDrawerRoot
      // @ts-ignore
      onClose={onDrawerClose}
      open={isOpen}
      anchor={anchor}
      ref={drawerRef}
    >
      <Toolbar variant="dense">
        <Typography variant="body1" sx={{ textAlign: 'left' }}>
          {header}
        </Typography>

        <IconButton onClick={onDrawerClose} edge="end" sx={{ ml: 'auto' }}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <AppSettingsDrawerScrollContainer>{children}</AppSettingsDrawerScrollContainer>
    </AppSettingsDrawerRoot>
  )
})

export default AppDrawer
