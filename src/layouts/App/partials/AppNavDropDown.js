import * as React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils'
import { styled } from '@mui/system'
import { ButtonBase, Typography } from '@mui/material'
import { useGlobalHandlers } from '~/contexts'
import { RouterLink } from '~/containers'
import { SITE_MAIN_ID } from '~/utils/constants'

const BREAKPOINT_KEY_1 = 'lg'

const classes = generateUtilityClasses('CiaAppMenuDropDownListItemRoot', [
  'hasSubmenuOpenWithin',
  'hadSubmenuOpenWithin',
  'hasSubmenu',
])

const AppMenuDropDownListItemRoot = styled('li')(({ theme }) => ({
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
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,

    div: {
      opacity: '1 !important',
      visibility: 'visible !important',
    },
  },
}))

const AppMenuDropDownListItem = styled('li')(({ theme }) => ({
  '&:not(:last-child)': {
    borderBottom: '1px solid rgba(46, 56, 68, 0.1)',
  },
}))

const AppMenuDropDownListItemLink = styled('a')(({ theme }) => ({
  transition: theme.transitions.create(['padding', 'background-color', 'color'], {
    duration: theme.transitions.duration.short, // Match MuiButton duration.
  }),
  color: 'inherit',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}))

const AppMenuDropDownListItemPrimary = styled(AppMenuDropDownListItemLink)(({ theme }) => ({
  ...theme.typography.body1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 18px 10px 16px',
  // minHeight: 'var(--cia-header-toolbar-primary-height, 0px)',
}))

const AppMenuDropDownListItemSecondary = styled(AppMenuDropDownListItemLink)(({ theme }) => ({
  ...theme.typography.body1,
  '--_spacing': theme.spacing(1.5),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: 'var(--_spacing) 0',
  '&:hover, &:focus': {
    paddingLeft: 'var(--_spacing)',
  },
}))

const AppMenuDropDownListItemPaper = styled('div')(({ theme }) => ({
  ...theme.mixins.absolute(undefined, undefined, undefined),
  zIndex: theme.zIndex.appBar,
  display: 'flex',
  opacity: 0,
  visibility: 'hidden',
  // overflow: 'hidden',
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  boxShadow: '0px 7px 11px 0px rgb(0 29 29 / 12%)',
  transition: theme.transitions.create(['opacity', 'visibility'], {
    duration: theme.transitions.duration.shortest,
  }),
  // Remove transitions when moving between menu items that have submenus.
  [`.${classes.hasSubmenuOpenWithin}.${classes.hadSubmenuOpenWithin} &`]: {
    transition: 'none',
  },
  // Debug code which forces first menuItem to be open.
  // [`${AppMenuDropDownListItemRoot}:first-child &`]: {
  //   opacity: 1,
  //   visibility: 'visible',
  // },
}))

const AppNavDropDownList = styled('ul')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, 290px)',
}))

function AppNavDropDown(props) {
  const { menuItem } = props

  const router = useRouter()
  const { onLanguageMenuClose } = useGlobalHandlers()

  const rootRef = React.useRef(null)

  const handleMouseEnter = () => {
    onLanguageMenuClose()
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
  const hasSubSubMenu = menuItem.menuItems?.some((x) => x.menuItems?.length > 0)

  return (
    <AppMenuDropDownListItemRoot
      key={router?.asPath}
      className={hasSubMenu ? classes.hasSubmenu : ''}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={rootRef}
    >
      <AppMenuDropDownListItemPrimary
        as={RouterLink}
        href={menuItem.url}
        // {...(hasSubMenu && {
        //   as: ButtonBase,
        //   href: menuItem.url,
        // })}
      >
        {menuItem.label}
      </AppMenuDropDownListItemPrimary>

      {hasSubMenu && (
        <AppMenuDropDownListItemPaper onTransitionEnd={handleSubmenuTransitionEnd}>
          <AppNavDropDownList>
            {(hasSubMenu ? menuItem.menuItems : [false])?.map((item, idx) => (
              <AppMenuDropDownListItem key={idx}>
                {item && (
                  <AppMenuDropDownListItemSecondary as={RouterLink} href={item.url}>
                    {item.label}
                  </AppMenuDropDownListItemSecondary>
                )}
              </AppMenuDropDownListItem>
            ))}
          </AppNavDropDownList>
        </AppMenuDropDownListItemPaper>
      )}
    </AppMenuDropDownListItemRoot>
  )
}

AppNavDropDown.propTypes = {
  menuItem: PropTypes.object,
}

export default AppNavDropDown
