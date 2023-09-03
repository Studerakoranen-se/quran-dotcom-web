import * as React from 'react'
import { useRouter } from 'next/router'
import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils'
import { styled } from '@mui/system'
import { useI18n, useRemoteConfig } from '~/contexts'
import RouterLink from '~/containers/RouterLink'

export const classes = generateUtilityClasses('CiaAppNavDropDown', [
  'list',
  'listItem',
  'listItemLink',
  'submenuDefault',
  'submenuMedia',
])

const AppNavDropDownRoot = styled('nav', {
  name: 'AppNavDropDown',
  slot: 'Root',
})({
  display: 'flex',
  alignItems: 'stretch',
  alignSelf: 'stretch',
})

const AppNavDropDownList = styled('ul', {
  name: 'AppNavDropDown',
  slot: 'List',
})({
  display: 'flex',
  margin: 0,
})

const AppNavDropDownListItem = styled('li', {
  name: 'AppNavDropDown',
  slot: 'ListItem',
})(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  '&:after': {
    ...theme.mixins.absolute(undefined, 'var(--cia-theme-spacing)', 0),
    content: '""',
    height: 2,
    backgroundColor: 'currentColor',
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  '&:hover:after, &:focus-within:after, &.Cia-selected:after': {
    transform: 'scaleX(1)',
  },
}))

const AppNavDropDownListItemLink = styled(RouterLink, {
  name: 'AppNavDropDown',
  slot: 'ListItemLink',
})(({ theme }) => ({
  ...theme.typography.body1,
  padding: '0 var(--cia-theme-spacing)',
  color: 'inherit',
  textDecoration: 'none',
}))

const AppNavDropDownSubmenu = styled('div', {
  name: 'AppNavDropDown',
  slot: 'Submenu',
})(({ theme }) => ({
  ...theme.mixins.fixed('var(--cia-header-height)', 0, undefined),
  overflow: 'hidden',
  maxHeight: 0,
  transition: theme.transitions.create(['max-height'], {
    duration: 0,
    easing: theme.transitions.easing.easeOut,
  }),
  [`.${classes.listItem}:hover &, .${classes.listItem}:focus-within &, .${classes.listItemLink}:focus + &`]:
    {
      transitionDuration: `${theme.transitions.duration.shorter}ms`,
      maxHeight: 'var(--submenu-expanded-size)', // Hardcoded value matching submenu template with images.
    },
  [`&.${classes.submenuDefault}`]: {
    '--submenu-expanded-size': '60px',
  },
  [`&.${classes.submenuMedia}`]: {
    '--submenu-expanded-size': '450px',
  },
}))

const AppNavDropDownSubmenuInner = styled('div', {
  name: 'AppNavDropDown',
  slot: 'SubmenuInner',
})(({ theme }) => ({
  padding: theme.spacing(2, 'var(--cia-container-spacing)'),
  backgroundColor: theme.palette.background.paper,
}))

const AppNavDropDownLinkSlideshow = styled('div', {
  name: 'AppNavDropDown',
  slot: 'LinkSlideshow',
})({
  display: 'flex',
  gap: 1,
  padding: '0 var(--cia-toolbar-spacing)',
  margin: '0 calc(var(--cia-toolbar-spacing) * -1)',
  overflowX: 'auto',
  scrollSnapType: 'x mandatory',
  scrollPadding: 'var(--cia-toolbar-spacing)',
})

const AppNavDropDownLinkSlideshowItem = styled(RouterLink, {
  name: 'AppNavDropDown',
  slot: 'LinkSlideshowItem',
})({
  flexShrink: 0,
  display: 'block',
  width: 256,
  scrollSnapAlign: 'start',
  color: 'inherit',
  textDecoration: 'none',
})

const AppNavDropDown = React.memo(function AppNavDropDown(props) {
  const router = useRouter()
  const { t } = useI18n()
  const { menus } = useRemoteConfig()
  console.log({ menus })

  return (
    <AppNavDropDownRoot
      key={router?.asPath} // Re-render on route change to close nav despite hovered.
      aria-label={t(__translationGroup)`Main navigation`}
      {...props}
    >
      {menus?.primary?.length > 0 && (
        <AppNavDropDownList className={classes.list}>
          {menus.primary.map((menuLink, idx) => (
            <AppNavDropDownListItem key={idx} className={classes.listItem}>
              <AppNavDropDownListItemLink className={classes.listItemLink} href={menuLink.url}>
                {menuLink.label}
              </AppNavDropDownListItemLink>

              {menuLink?.links && (
                <AppNavDropDownSubmenu className={classes.submenuDefault}>
                  <AppNavDropDownSubmenuInner>
                    <AppNavDropDownList className={classes.list}>
                      {menuLink.links?.map((subLink, idx2) => (
                        <AppNavDropDownListItem key={idx2} className={classes.listItem}>
                          <AppNavDropDownListItemLink
                            className={classes.listItemLink}
                            href={subLink.url}
                          >
                            {subLink.label}
                          </AppNavDropDownListItemLink>
                        </AppNavDropDownListItem>
                      ))}
                    </AppNavDropDownList>
                  </AppNavDropDownSubmenuInner>
                </AppNavDropDownSubmenu>
              )}
            </AppNavDropDownListItem>
          ))}

          {menus?.secondary?.map((menuLink, idx) => (
            <AppNavDropDownListItem key={idx} className={classes.listItem}>
              <AppNavDropDownListItemLink href={menuLink.url} className={classes.listItemLink}>
                {menuLink.label}
              </AppNavDropDownListItemLink>
            </AppNavDropDownListItem>
          ))}
        </AppNavDropDownList>
      )}
    </AppNavDropDownRoot>
  )
})

export default AppNavDropDown
