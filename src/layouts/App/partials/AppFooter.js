import * as React from 'react'
import { Box, IconButton, Typography, styled } from '@mui/material'
import { Media, MediaReveal } from '@noaignite/oui'
import { useRemoteConfig, useI18n } from '~/contexts'
import { RouterLink, SanityHtml } from '~/containers'
import { SITE_FOOTER_ID } from '~/utils/constants'
import { BrandIcon, FacebookIcon, InstagramIcon, PinterestIcon, TwitterIcon } from '~/components'

const iconVariants = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Pinterest: PinterestIcon,
  Twitter: TwitterIcon,
}

const BREAKPOINT_KEY = 'md'

const AppFooterRoot = styled('footer')(({ theme }) => ({
  padding: 'var(--cia-section-spacing) var(--cia-container-spacing)',
  backgroundColor: theme.vars.palette.background.default,
  color: theme.vars.palette.text.textInverted,
  overflow: 'hidden',
  flexShrink: 0,
}))

const AppFooterContainer = styled('div')(({ theme }) => ({
  ...theme.mixins.contain('lg'),
}))

const AppFooterGroups = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridRowGap: theme.spacing(6.5),

  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridRowGap: '5rem',
    gridColumnGap: '5rem',
  },
}))

const AppFooterGroup = styled('div')(({ theme }) => ({
  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    order: 1,
    flex: '1 1 250px',
  },
}))

const AppFooterAside = styled('aside')(({ theme }) => ({
  flexDirection: 'column',
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: 0,
  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    flex: '1 1 350px',
  },
}))

const AppFooterGroupHeader = styled('div')(({ theme }) => ({
  ...theme.typography.body2,
  marginBottom: theme.spacing(2.5),
  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    marginBottom: theme.spacing(4),
    ...theme.typography.body1,
  },
}))

const AppFooterGroupBody = styled('div')(({ theme }) => ({
  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    paddingBottom: theme.spacing(3),
  },
}))

const AppFooterNavList = styled('ul')(() => ({
  margin: 0,
  padding: 0,
  listStyleType: 'none',
}))
const AppFooterNavListItem = styled('li')(({ theme }) => ({
  '&:not(:first-of-type)': {
    marginTop: theme.spacing(1.3),
  },
}))

const AppFooterNavListItemText = styled(RouterLink)(({ theme }) => ({
  ...theme.typography.body2,
  color: 'inherit',
  padding: 0,
  minWidth: 'unset',
  textDecoration: 'none',
  '&:hover': {
    opacity: 0.5,
    cursor: 'pointer',
  },
  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    ...theme.typography.body1,
  },
}))

const AppFooterBrandLink = styled(RouterLink)(({ theme }) => ({
  '& > svg': {
    display: 'block',

    '& > svg': {
      display: 'block',
      // fontSize: 'calc(var(--cia-toolbar-min-height) * 4)',
    },
    [theme.breakpoints.up(BREAKPOINT_KEY)]: {
      // width: 45,
    },
  },
}))

const AppFooterCopyRight = styled('div')(({ theme }) => ({
  position: 'relative',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(4, 0, 2),
  flexDirection: 'column-reverse',
  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    textAlign: 'right',
  },
}))

const AppFooterCitation = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: theme.spacing(8, 0, 4),
  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    margin: 0,
    alignItems: 'flex-end',
  },
}))

function AppFooter(props) {
  const { menus, siteSocialLinks, siteCopyRight, citationText, citationImages } = useRemoteConfig()

  const { t } = useI18n()

  let menu = menus?.footer || []
  const menuHalfIdx = Math.ceil(menu.length / 4)
  menu = [menu.slice(0, menuHalfIdx), menu.slice(menuHalfIdx)]

  return (
    <AppFooterRoot id={SITE_FOOTER_ID} {...props}>
      <AppFooterContainer>
        <AppFooterGroups>
          <AppFooterAside>
            <AppFooterBrandLink href="/" aria-label={t('aria').translate(`go-to-home`)}>
              <BrandIcon sx={{ fontSize: '200px' }} />
            </AppFooterBrandLink>
          </AppFooterAside>

          {menus?.footer?.map((menuItem, idx) => (
            <AppFooterGroup key={idx}>
              <AppFooterGroupHeader>
                {menuItem?.url ? (
                  <AppFooterNavListItemText href={menuItem?.url}>
                    {menuItem.label}
                  </AppFooterNavListItemText>
                ) : (
                  <Typography component="span">{menuItem.label}</Typography>
                )}
              </AppFooterGroupHeader>

              <AppFooterGroupBody>
                <AppFooterNavList>
                  {menuItem?.menuItems?.map((menuItem2, idx2) => {
                    return (
                      <AppFooterNavListItem key={idx2}>
                        <AppFooterNavListItemText href={menuItem2?.url}>
                          {menuItem2.label}
                        </AppFooterNavListItemText>
                      </AppFooterNavListItem>
                    )
                  })}
                </AppFooterNavList>
              </AppFooterGroupBody>
            </AppFooterGroup>
          ))}

          <AppFooterGroup>
            <AppFooterGroupHeader>
              <Typography component="span">Social</Typography>
            </AppFooterGroupHeader>

            <AppFooterGroupBody>
              {siteSocialLinks?.length > 0 && (
                <React.Fragment>
                  {siteSocialLinks.map((social, idx) => {
                    const Icon = iconVariants[social.icon]
                    if (!Icon || !social.url) {
                      return null
                    }

                    return (
                      <IconButton
                        key={idx}
                        component={RouterLink}
                        href={social.url}
                        title={t('aria').translate(`visit-us`, { value: social.icon })}
                        aria-label={t('aria').translate(`visit-us`, { value: social.icon })}
                        style={{
                          padding: 4,
                        }}
                      >
                        <Icon />
                      </IconButton>
                    )
                  })}
                </React.Fragment>
              )}
            </AppFooterGroupBody>
          </AppFooterGroup>
        </AppFooterGroups>

        <AppFooterCopyRight>
          <Typography variant="body2" dangerouslySetInnerHTML={{ __html: siteCopyRight }} />
          <AppFooterCitation>
            {citationImages?.length > 0 && (
              <Box display="flex" justifyContent="flex-end">
                {citationImages.map((citationImage, idx) => (
                  <Media src={citationImage.url} sx={{ height: '57px', width: '147px' }} />
                ))}
              </Box>
            )}
            <SanityHtml
              blocks={citationText}
              sx={(theme) => ({
                mt: 1,
                p: {
                  ...theme.typography.body2,
                },
              })}
            />
          </AppFooterCitation>
        </AppFooterCopyRight>
      </AppFooterContainer>
    </AppFooterRoot>
  )
}

export default AppFooter
