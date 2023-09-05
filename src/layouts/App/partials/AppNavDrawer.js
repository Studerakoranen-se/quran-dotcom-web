import * as React from 'react'
import PropTypes from 'prop-types'
import { Drawer, styled } from '@mui/material'
import { useGlobalHandlers, useGlobalState, useI18n, useRemoteConfig } from '~/contexts'
import AppNavDrawerListItem from './AppNavDrawerListItem'

const AppNavDrawerRoot = styled(Drawer)(({ theme }) => ({
  '--drawer-top': 'var(--cia-header-height, 0px)',
  top: 'var(--drawer-top)',
  '& .MuiBackdrop-root': {
    top: 'var(--drawer-top)',
  },
  '& .MuiDrawer-paper': {
    ...theme.mixins.scrollbars,
    top: 'var(--drawer-top)',
    maxWidth: '100%',
    width: 500, // By design.
    height: 'calc(100% - var(--drawer-top))',
    padding: 'var(--cia-section-spacing) 0',
  },
}))

const AppNavDrawerScrollContainer = styled('div')(({ theme }) => ({
  ...theme.mixins.scrollable,
  ...theme.mixins.scrollbars,
  display: 'inherit',
  flexDirection: 'inherit',
  flexGrow: 1,
  padding: theme.spacing(2),
}))

const AppNavDrawerList = styled('ul')(({ theme }) => ({
  margin: theme.spacing(2, 0, 4),
  '&:first-of-type': {
    marginTop: 0,
  },
}))

const AppNavDrawer = React.memo(function AppNavDrawer(props) {
  const { isNavMenuOpen, ...other } = props

  const { menus } = useRemoteConfig()
  const { onNavMenuClose } = useGlobalHandlers()
  const { t } = useI18n()

  return (
    <AppNavDrawerRoot onClose={onNavMenuClose} open={isNavMenuOpen} anchor="left" {...other}>
      <AppNavDrawerScrollContainer>
        <nav aria-label={t(__translationGroup)`Main navigation`}>
          {menus?.primary?.length > 0 && (
            <AppNavDrawerList>
              {menus.primary.map((menuLink, idx) => (
                <AppNavDrawerListItem key={idx} menuLink={menuLink} />
              ))}
            </AppNavDrawerList>
          )}
        </nav>

        {/* <Typography variant="body2">
          {t(__translationGroup)`Country`}:{' '}
          <Link // eslint-disable-line jsx-a11y/anchor-is-valid
            onClick={onLanguageMenuToggle}
            component="button"
            type="button"
            underline="always"
            variant="body2"
          >
            {location.country} / {selection.currency}
          </Link>
        </Typography> */}
      </AppNavDrawerScrollContainer>
    </AppNavDrawerRoot>
  )
})

AppNavDrawer.propTypes = {
  isNavMenuOpen: PropTypes.bool,
}

function AppNavDrawerContainer(props) {
  const { isNavMenuOpen } = useGlobalState()

  return <AppNavDrawer isNavMenuOpen={isNavMenuOpen} {...props} />
}

export default AppNavDrawerContainer
