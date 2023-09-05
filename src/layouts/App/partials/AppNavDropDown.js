import * as React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils'
import { styled } from '@mui/system'
import { ButtonBase, Typography } from '@mui/material'
import { SITE_MAIN_ID } from '~/utils/constants'
import { RouterLink } from '~/containers'

const BREAKPOINT_KEY_1 = 'lg'

const classes = generateUtilityClasses('CiaAppNavDropDownRoot', [
  'hasSubmenuOpenWithin',
  'hadSubmenuOpenWithin',
  'hasSubmenu',
])

const AppNavDropDownRoot = styled('li')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.shortest,
  }),
  [`&.${classes.hasSubmenu}`]: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  '&:hover, &:focus-within, &.Cia-selected': {
    backgroundColor: theme.palette.green[100],
    color: theme.palette.green[100],
  },
}))

const AppNavDropDownLink = styled('a')(({ theme }) => ({
  transition: theme.transitions.create(['padding', 'background-color', 'color'], {
    duration: theme.transitions.duration.short, // Match MuiButton duration.
  }),
  color: theme.palette.common.white,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}))

const AppNavDropDownPrimary = styled(AppNavDropDownLink)(({ theme }) => ({
  ...theme.typography.body1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
  minHeight: 'var(--cia-header-toolbar-primary-height, 0px)',
}))

const AppNavDropDownPaper = styled('div')(({ theme }) => ({
  ...theme.mixins.fixed('var(--cia-header-height, 0px)', 0, undefined),
  zIndex: theme.zIndex.appBar,
  display: 'grid',
  gridGap: 'var(--cia-container-spacing)',
  opacity: 0,
  visibility: 'hidden',
  overflow: 'hidden',
  padding: 'var(--cia-section-spacing) var(--cia-container-spacing)',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  transition: theme.transitions.create(['opacity', 'visibility'], {
    duration: theme.transitions.duration.shortest,
  }),
  // Remove transitions when moving between menu items that have submenus.
  [`.${classes.hasSubmenuOpenWithin}.${classes.hadSubmenuOpenWithin} &`]: {
    transition: 'none',
  },
  [`${AppNavDropDownRoot}:hover &, ${AppNavDropDownRoot}:focus-within &`]: {
    opacity: 1,
    visibility: 'visible',
  },
  [theme.breakpoints.up(BREAKPOINT_KEY_1)]: {
    gridTemplateColumns: '1fr clamp(350px, 33vw, 700px)',
  },
  // Debug code which forces first menuItem to be open.
  // [`${AppNavDropDownRoot}:first-child &`]: {
  //   opacity: 1,
  //   visibility: 'visible',
  // },
}))

const AppNavDropDownList = styled('ul')({
  display: 'grid',
  gridGap: 'var(--cia-container-spacing)',
  gridTemplateColumns: 'repeat(auto-fit, 290px)',
})

function AppNavDropDown(props) {
  const { menuItem } = props
  const router = useRouter()

  const rootRef = React.useRef(null)

  const handleMouseEnter = () => {
    const [target, parent] = [rootRef.current, rootRef.current.parentNode]

    // Handle menu state for if curent item has submenu.
    const hasSubmenu = target.classList.contains(classes.hasSubmenu)
    parent.classList[hasSubmenu ? 'add' : 'remove'](classes.hasSubmenuOpenWithin)
  }

  const handleMouseLeave = () => {
    const [target, parent] = [rootRef.current, rootRef.current.parentNode]

    // Handle menu state for if previous item has submenu.
    const hasSubmenu = target.classList.contains(classes.hasSubmenu)
    parent.classList.remove(classes.hasSubmenuOpenWithin)
    parent.classList[hasSubmenu ? 'add' : 'remove'](classes.hadSubmenuOpenWithin)

    // Ensures no element within the menu remains focused upon mouse leave.
    if (rootRef.current?.contains(document.activeElement)) {
      document.getElementById(SITE_MAIN_ID)?.focus()
    }
  }

  const handleSubmenuTransitionEnd = () => {
    // Reset ramaining menu state when transition completes.
    rootRef.current.parentNode.classList.remove(classes.hadSubmenuOpenWithin)
  }

  const hasSubMenu = menuItem.menuItems?.length > 0
  // const hasSubSubMenu = menuItem.menuItems?.some((x) => x.menuItems?.length > 0)

  return (
    <AppNavDropDownRoot
      key={router?.asPath}
      className={hasSubMenu ? classes.hasSubmenu : ''}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={rootRef}
    >
      <AppNavDropDownPrimary
        as={RouterLink}
        href={menuItem.url}
        {...(hasSubMenu && {
          as: ButtonBase,
          href: undefined,
        })}
      >
        {menuItem.label}
      </AppNavDropDownPrimary>

      {hasSubMenu && (
        <AppNavDropDownPaper onTransitionEnd={handleSubmenuTransitionEnd}>
          <AppNavDropDownList>
            {(hasSubMenu ? menuItem.menuItems : [false])?.map((item, idx) => (
              <li key={idx}>
                {item && (
                  <Typography variant="h5" paragraph>
                    {item.label}
                  </Typography>
                )}
              </li>
            ))}
          </AppNavDropDownList>
        </AppNavDropDownPaper>
      )}
    </AppNavDropDownRoot>
  )
}

AppNavDropDown.propTypes = {
  menuItem: PropTypes.object,
}

export default AppNavDropDown
