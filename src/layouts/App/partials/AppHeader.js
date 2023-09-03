import * as React from 'react'
import PropTypes from 'prop-types'
import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils'
import { AppBar, Badge, IconButton, styled } from '@mui/material'
import { useGlobalHandlers, useGlobalState, useI18n } from '~/contexts'
import { RouterLink } from '~/containers'
import { BrandIcon, CartIcon, SearchIcon, CloseIcon, MenuIcon } from '~/components'
import AppStoreMessage from './AppStoreMessage'
import AppNavDropDown from './AppNavDropDown'

const BREAKPOINT_KEY = 'md'

export const classes = generateUtilityClasses('CiaAppHeader', [
  'toolbarPushMobile',
  'toolbarPushDesktop',
  'hiddenOnMobile',
  'hiddenOnDesktop',
])

const AppHeaderRoot = styled(AppBar)(({ theme, ownerState }) => ({
  ...(ownerState.mounted && {
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.shortest, // Match value of `IconButton`
    }),
  }),
  ...(ownerState.headerMode === 'transparent' && {
    '&:not(:hover):not(:focus-within)': {
      backgroundColor: 'transparent',
      color: ownerState.headerColor,
    },
  }),
  // Util classes
  [`& .${classes.toolbarPushMobile}`]: {
    [theme.breakpoints.down(BREAKPOINT_KEY)]: { marginLeft: 'auto' },
  },
  [`& .${classes.toolbarPushDesktop}`]: {
    [theme.breakpoints.up(BREAKPOINT_KEY)]: { marginLeft: 'auto' },
  },
  [`& .${classes.hiddenOnMobile}`]: {
    [theme.breakpoints.down(BREAKPOINT_KEY)]: { display: 'none' },
  },
  [`& .${classes.hiddenOnDesktop}`]: {
    [theme.breakpoints.up(BREAKPOINT_KEY)]: { display: 'none' },
  },
}))

const AppHeaderToolbar = styled('div')({
  display: 'flex',
  alignItems: 'center',
  height: 'var(--cia-header-toolbar-primary-height)',
  paddingInline: 'var(--cia-container-spacing)',
})

const AppHeaderBrandLink = styled(RouterLink)(({ theme, ownerState }) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate3d(-50%, calc(-50% + 2px), 0) scale(1)',
  transformOrigin: 'center top',
  transition: theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.complex,
    easing: theme.transitions.easing.easeOut,
  }),
  color: 'white',
  ...(ownerState.expandedLogo && {
    transform: 'translate3d(-50%, calc(-50% + 8px), 0) scale(1.2)',
  }),
  '& > svg': {
    display: 'block',
    // fontSize: 'calc(var(--cia-toolbar-min-height) * 4)',
  },
}))

const StyledBrandIcon = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  display: 'block',
  zIndex: theme.zIndex.appBar + 1,
  width: 33.4,
  height: 'auto',
  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    width: 45,
  },
}))

const AppHeader = React.memo(function AppHeader(props) {
  const {
    headerColor = 'inherit',
    headerMode: headerModeProp = 'opaque',
    isNavMenuOpen,
    isSearchMenuOpen,
    isSomeMenuOpen,
    isStoreMessageOpen,
    productsCount,
    ...other
  } = props

  const { onNavMenuToggle, onSearchMenuToggle } = useGlobalHandlers()
  const { t } = useI18n()

  const [disableTransparency, setDisableTransparency] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [expandedLogo, setExpandedLogo] = React.useState(true)

  const syncDisableTransparency = React.useCallback(() => {
    setDisableTransparency(window.pageYOffset > 100)
  }, [])

  const syncExpandLogo = React.useCallback(() => {
    setExpandedLogo(window.pageYOffset < 5)
  }, [])

  React.useEffect(() => {
    setMounted(true)
    syncDisableTransparency()

    const handleScroll = () => {
      syncExpandLogo()
      syncDisableTransparency()
    }

    if (headerModeProp === 'auto') {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }

    return undefined
  }, [headerModeProp, syncDisableTransparency])

  let computedHeaderMode = 'opaque'
  if (
    (headerModeProp === 'transparent' || (headerModeProp === 'auto' && !disableTransparency)) &&
    !isSomeMenuOpen
  ) {
    computedHeaderMode = 'transparent'
  }

  let headerHeight = 'var(--cia-header-toolbar-primary-height)'
  if (isStoreMessageOpen) {
    headerHeight = `calc(${headerHeight} + var(--cia-header-toolbar-secondary-height))`
  }

  const ownerState = {
    headerColor,
    headerMode: computedHeaderMode,
    mounted,
  }

  return (
    <AppHeaderRoot
      ownerState={ownerState}
      position={headerModeProp === 'opaque' ? 'sticky' : 'fixed'}
      {...other}
    >
      {isStoreMessageOpen && <AppStoreMessage />}

      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
          :root {
            --cia-header-height: ${headerHeight};
            --cia-initial-sticky-top: ${
              headerModeProp === 'opaque' ? 'var(--cia-header-height)' : 0
            };
            --cia-sticky-top: ${headerModeProp !== 'transparent' ? 'var(--cia-header-height)' : 0};
          }
        `,
        }}
      />

      <AppHeaderToolbar>
        <IconButton
          className={classes.hiddenOnDesktop}
          onClick={onNavMenuToggle}
          color="inherit" // Inherit color from `headerColor`.
          edge="start"
          size="small"
          aria-haspopup="true"
          aria-expanded={isNavMenuOpen}
          aria-label={t(__translationGroup)`Toggle main menu`}
        >
          {isNavMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        <AppNavDropDown
          className={classes.hiddenOnMobile}
          // sx={{ ml: -1 }}
        />

        <div className={classes.toolbarPushMobile} />
        <div className={classes.toolbarPushDesktop} />

        <AppHeaderBrandLink
          ownerState={{ expandedLogo }}
          href="/"
          aria-label={t(__translationGroup)`Go to the homepage`}
        >
          <BrandIcon sx={{ fontSize: '90px' }} />
        </AppHeaderBrandLink>

        <IconButton
          onClick={onSearchMenuToggle}
          color="inherit" // Inherit color from `headerColor`.
          size="small"
          aria-haspopup="true"
          aria-expanded={isSearchMenuOpen}
          aria-label={t(__translationGroup)`Toggle search`}
        >
          {isSearchMenuOpen ? <CloseIcon /> : <SearchIcon />}
        </IconButton>
      </AppHeaderToolbar>
    </AppHeaderRoot>
  )
})

AppHeader.propTypes = {
  headerColor: PropTypes.string,
  headerMode: PropTypes.oneOf(['opaque', 'transparent', 'auto']),
  isNavMenuOpen: PropTypes.bool,
  isSearchMenuOpen: PropTypes.bool,
  isSomeMenuOpen: PropTypes.bool,
  isStoreMessageOpen: PropTypes.bool,
}

function AppHeaderContainer(props) {
  const { isNavMenuOpen, isSearchMenuOpen, isSomeMenuOpen, isStoreMessageOpen } = useGlobalState()

  return (
    <AppHeader
      isNavMenuOpen={isNavMenuOpen}
      isSearchMenuOpen={isSearchMenuOpen}
      isSomeMenuOpen={isSomeMenuOpen}
      isStoreMessageOpen={isStoreMessageOpen}
      {...props}
    />
  )
}

export default AppHeaderContainer
