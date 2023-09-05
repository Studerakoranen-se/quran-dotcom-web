import * as React from 'react'
import PropTypes from 'prop-types'
import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils'
import { styled } from '@mui/system'
import { AppBar, IconButton, Button } from '@mui/material'
import { SITE_HEADER_ID } from '~/utils/constants'
import { useGlobalState, useGlobalHandlers, useI18n, useRemoteConfig } from '~/contexts'
import { RouterLink } from '~/containers'
import { BrandIcon, CloseIcon, MenuIcon, OnlineIcon } from '~/components'
import AppNavDropDown from './AppNavDropDown'
import AppStoreMessage from './AppStoreMessage'

const BREAKPOINT_KEY = 'md'

const classes = generateUtilityClasses('CiaAppHeader', [
  'toolbarPushStart',
  'toolbarEdgeEnd',
  'hiddenOnMobile',
  'hiddenOnDesktop',
])

const AppHeaderRoot = styled(AppBar)(({ theme, ownerState }) => ({
  ...(ownerState.headerMode === 'transparent' && {
    '&:not(:hover):not(:focus-within)': {
      backgroundColor: 'transparent',
      color: ownerState.headerColor,
    },
  }),
  // Util classes
  [`& .${classes.toolbarPushStart}`]: { marginLeft: 'auto' },
  [`& .${classes.toolbarEdgeEnd}`]: { marginRight: -3 },
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
  padding: '0 var(--cia-container-spacing)',
})

const AppHeaderBrandLink = styled(RouterLink)(({ theme, ownerState }) => ({
  color: 'white',
  marginTop: 132,
  '& > svg': {
    display: 'block',
    // width: 33.4,
    transformOrigin: 'center top',
    transform: 'translate3d(0, calc(-50% + 2px), 0) scale(0.5)',
    transition: theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeOut,
    }),
    color: 'white',
    ...(ownerState.expandedLogo && {
      transform: 'translate3d(0, calc(-50% + 8px), 0) scale(1.2)',
    }),
    '& > svg': {
      display: 'block',
      // fontSize: 'calc(var(--cia-toolbar-min-height) * 4)',
    },
    [theme.breakpoints.up(BREAKPOINT_KEY)]: {
      // width: 45,
    },
  },
}))

const AppHeaderNav = styled('nav')(({ theme }) => ({
  margin: theme.spacing(0, 2),
}))

const AppHeaderList = styled('ul')({
  display: 'flex',
})

const AppHeaderCtaButton = styled(Button)(({ theme }) => ({
  ...theme.typography.subtitle2,
}))

const AppHeaderSupportButton = styled(Button)(({ theme }) => ({
  marginInline: theme.spacing(1),
  '& span': {
    margin: 0,
    marginLeft: -5,
  },
}))

const AppHeader = React.memo(function AppHeader(props) {
  const {
    headerColor = 'inherit',
    headerMode: headerModeProp = 'opaque',
    isNavMenuOpen,
    isSomeMenuOpen,
    isStoreMessageOpen,
    isSupportChatOnline,
    ...other
  } = props

  const { t } = useI18n()
  const { menus, menuCtaLabel, menuCtaUrl } = useRemoteConfig()
  const { onNavMenuToggle, onSupportDialogOpen } = useGlobalHandlers()

  const [expandedLogo, setExpandedLogo] = React.useState(true)
  const [disableTransparency, setDisableTransparency] = React.useState(false)

  const syncExpandLogo = React.useCallback(() => {
    setExpandedLogo(window.pageYOffset < 5)
  }, [])

  const syncDisableTransparency = React.useCallback(() => {
    setDisableTransparency(window.pageYOffset > 100)
  }, [])

  React.useEffect(() => {
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
  }, [headerModeProp, syncDisableTransparency, syncExpandLogo])

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
  }

  return (
    <AppHeaderRoot
      ownerState={ownerState}
      position={headerModeProp === 'opaque' ? 'sticky' : 'fixed'}
      id={SITE_HEADER_ID}
      {...other}
    >
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --cia-header-height: ${headerHeight};
              --cia-sticky-top: var(--cia-header-height);
            }
          `,
        }}
      />

      {isStoreMessageOpen && <AppStoreMessage />}

      <AppHeaderToolbar>
        <AppHeaderBrandLink
          ownerState={{ expandedLogo }}
          href="/"
          aria-label={t(__translationGroup)`Go to the homepage`}
        >
          <BrandIcon sx={{ fontSize: '90px' }} />
        </AppHeaderBrandLink>

        <div className={classes.toolbarPushStart} />

        <AppHeaderNav
          className={classes.hiddenOnMobile}
          aria-label={t(__translationGroup)`Main navigation`}
        >
          <AppHeaderList>
            {menus?.primary?.map((menuItem, idx) => (
              <AppNavDropDown key={idx} menuItem={menuItem} />
            ))}
          </AppHeaderList>
        </AppHeaderNav>

        {menuCtaLabel && menuCtaUrl && (
          <AppHeaderCtaButton
            className={classes.hiddenOnMobile}
            component={RouterLink}
            href={menuCtaUrl}
            size="small"
          >
            {menuCtaLabel}
          </AppHeaderCtaButton>
        )}

        <AppHeaderSupportButton
          onClick={onSupportDialogOpen}
          size="small"
          startIcon={
            isSupportChatOnline && (
              <OnlineIcon style={{ width: 20, height: 20, margin: '-10px 0' }} />
            )
          }
          variant="contained"
        >
          {t(__translationGroup)`Let's talk!`}
        </AppHeaderSupportButton>

        <IconButton
          className={classes.hiddenOnDesktop}
          onClick={onNavMenuToggle}
          size="small"
          aria-haspopup="true"
          aria-expanded={isNavMenuOpen}
          aria-label={t(__translationGroup)`Toggle main menu`}
        >
          {isNavMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        <div className={classes.toolbarEdgeEnd} />
      </AppHeaderToolbar>
    </AppHeaderRoot>
  )
})

AppHeader.propTypes = {
  headerColor: PropTypes.string,
  headerMode: PropTypes.oneOf(['opaque', 'transparent', 'auto']),
  isNavMenuOpen: PropTypes.bool,
  isSomeMenuOpen: PropTypes.bool,
  isStoreMessageOpen: PropTypes.bool,
  isSupportChatOnline: PropTypes.bool,
}

function AppHeaderContainer(props) {
  const { isNavMenuOpen, isStoreMessageOpen, isSomeMenuOpen, isSupportChatOnline } =
    useGlobalState()

  return (
    <AppHeader
      isNavMenuOpen={isNavMenuOpen}
      isStoreMessageOpen={isStoreMessageOpen}
      isSupportChatOnline={isSupportChatOnline}
      isSomeMenuOpen={isSomeMenuOpen}
      {...props}
    />
  )
}

export default AppHeaderContainer
