import * as React from 'react'
import PropTypes from 'prop-types'
import useSize from '@react-hook/size'
import Router, { useRouter } from 'next/router'
import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils'
import { styled } from '@mui/system'
import {
  AppBar,
  IconButton,
  Button,
  MenuItem,
  TextField,
  Select,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useGlobalState, useGlobalHandlers, useI18n, useRemoteConfig } from '~/contexts'
import LanguageSelector from '~/containers/LanguageSelector'
import { FormitTextField, RouterLink } from '~/containers'
import {
  BrandIcon,
  BrandIconMobile,
  CloseIcon,
  GlobeIcon,
  MenuIcon,
  ModeSwitcher,
} from '~/components'
import { selectIsUsingDefaultSettings } from '~/store/slices/defaultSettings'
import resetSettings from '~/store/actions/reset-settings'
import { SITE_HEADER_ID } from '~/utils/constants'
import { logValueChange } from '~/utils/eventLogger'
import { setLocaleCookie } from '~/utils/cookies'
import { i18n } from '../../../../locales'
import AppStoreMessage from './AppStoreMessage'
import AppNavDropDown from './AppNavDropDown'

const BREAKPOINT_KEY = 'md'

const classes = generateUtilityClasses('CiaAppHeader', [
  'toolbarPushStart',
  'toolbarEdgeEnd',
  'hiddenOnMobile',
  'hiddenOnDesktop',
])

const AppHeaderRoot = styled(AppBar)(({ theme }) => ({
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

const AppHeaderToolbar = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: 'calc(30px + var(--cia-header-toolbar-primary-height))',
  padding: '0 var(--cia-container-spacing)',
  color: theme.vars.palette.text.textInverted,
}))

const AppHeaderBrandLink = styled(RouterLink)(({ theme, ownerState }) => ({
  // marginTop: 20,
  '& > svg': {
    display: 'block',
    // width: 33.4,
    transformOrigin: 'center center',
    transform: 'translate3d(0, 1%, 0) scale(0.8)',
    transition: theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeOut,
    }),
    ...(ownerState.expandedLogo && {
      transform: 'translate3d(0, calc(5% + 8px), 0) scale(1.2)',
    }),
    '& > svg': {
      display: 'block',
      // fontSize: 'calc(var(--cia-toolbar-min-height) * 4)',
    },
    [theme.breakpoints.up(BREAKPOINT_KEY)]: {
      // transform: 'translate3d(0, -65%, 0) scale(0.8)',
      marginTop: 0,
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

const LanguageSelectorRoot = styled(LanguageSelector)(({ theme }) => ({
  ...theme.mixins.scrollable,
  ...theme.mixins.scrollbars,
  maxHeight: 'calc(100vh - var(--cia-header-height) - var(--cia-toolbar-spacing) * 2)',
  marginTop: 'var(--cia-toolbar-spacing)',
  backgroundColor: theme.vars.palette.common.white,
  color: theme.vars.palette.common.black,
  boxShadow: '0px 7px 11px 0px rgb(0 29 29 / 12%)',
  borderRadius: 0,
  '&:focus': {
    outline: 0,
  },
}))

const LanguageSelectorNav = styled('nav')(({ theme }) => ({
  position: 'fixed',
  zIndex: theme.zIndex.appBar,
  top: 'calc(var(--cia-header-height) - 30px)',
  right: 'var(--cia-section-spacing)',
}))

const AppHeader = React.memo(function AppHeader(props) {
  const {
    headerMode: headerModeProp = 'opaque',
    isNavMenuOpen,
    isSomeMenuOpen,
    isStoreMessageOpen,
    isSupportChatOnline,
    isLanguageMenuOpen,
    ...other
  } = props

  const { t } = useI18n()
  const router = useRouter()
  const dispatch = useDispatch()
  const rootRef = React.useRef(null)
  const [, rootHeight] = useSize(rootRef)

  const { menus, menuCtaLabel, menuCtaUrl } = useRemoteConfig()
  const { onNavMenuToggle, onSupportDialogOpen, onLanguageMenuClose, onLanguageMenuToggle } =
    useGlobalHandlers()

  const isUsingDefaultSettings = useSelector(selectIsUsingDefaultSettings)
  const isBreakpointUp = useMediaQuery((theme) => theme.breakpoints.up('md'))

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

  return [
    <AppHeaderRoot
      ref={rootRef}
      position={headerModeProp === 'opaque' ? 'sticky' : 'fixed'}
      id={SITE_HEADER_ID}
      {...other}
    >
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --cia-header-height: ${rootHeight}px;
              --cia-sticky-top: var(--cia-header-height);
            }
          `,
        }}
      />

      {isStoreMessageOpen && <AppStoreMessage />}

      <AppHeaderToolbar>
        <AppHeaderBrandLink
          ownerState={{ expandedLogo: !router.asPath.includes('surah') && expandedLogo }}
          href="/"
          aria-label={t(__translationGroup)`Go to the homepage`}
        >
          {isBreakpointUp ? (
            <BrandIcon
              sx={{
                fontSize: ['opaque', 'auto'].includes(headerModeProp) ? 75 : 90,

                ...(['opaque', 'auto'].includes(headerModeProp) && {
                  transform: 'none !important',
                }),
              }}
            />
          ) : (
            <BrandIconMobile
              sx={{
                fontSize: ['opaque', 'auto'].includes(headerModeProp) ? 75 : 90,
              }}
            />
          )}
        </AppHeaderBrandLink>

        <div className={classes.toolbarPushStart} />

        <AppHeaderNav
          className={classes.hiddenOnMobile}
          aria-label={t(__translationGroup)`Main navigation`}
        >
          <AppHeaderList>
            {menus?.primary?.map((menuItem, idx) => (
              <AppNavDropDown key={menuItem.url} menuItem={menuItem} />
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

        <IconButton onClick={onLanguageMenuToggle} size="small" sx={{ mr: 1 }}>
          <GlobeIcon />
        </IconButton>

        <ModeSwitcher />

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
    </AppHeaderRoot>,
    !isLanguageMenuOpen ? null : (
      <LanguageSelectorNav // NOTE: Must be outside of `AppBar` due to double `backdrop-filter: blur`.
        key="country-menu"
        aria-label={t(__translationGroup)`Language selector`}
      >
        <LanguageSelectorRoot onChange={onLanguageMenuClose} disablePadding autoFocus />
      </LanguageSelectorNav>
    ),
  ]
})

AppHeader.propTypes = {
  headerMode: PropTypes.oneOf(['opaque', 'transparent', 'auto']),
  isNavMenuOpen: PropTypes.bool,
  isSomeMenuOpen: PropTypes.bool,
  isStoreMessageOpen: PropTypes.bool,
  isSupportChatOnline: PropTypes.bool,
  isLanguageMenuOpen: PropTypes.bool,
}

function AppHeaderContainer(props) {
  const {
    isNavMenuOpen,
    isStoreMessageOpen,
    isSomeMenuOpen,
    isSupportChatOnline,
    isLanguageMenuOpen,
  } = useGlobalState()

  return (
    <AppHeader
      isNavMenuOpen={isNavMenuOpen}
      isStoreMessageOpen={isStoreMessageOpen}
      isSupportChatOnline={isSupportChatOnline}
      isSomeMenuOpen={isSomeMenuOpen}
      isLanguageMenuOpen={isLanguageMenuOpen}
      {...props}
    />
  )
}

export default AppHeaderContainer
