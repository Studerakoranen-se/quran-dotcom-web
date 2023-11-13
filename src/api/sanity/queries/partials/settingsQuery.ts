// @ts-nocheck
import menuQuery, { MenuQueryResult } from './menuQuery'

export interface SettingsQueryResult {
  menus?: {
    primary?: MenuQueryResult[]
    footer?: MenuQueryResult[]
  }
  siteTitle?: string
  siteAddress?: string
  siteCopyRight?: string
  siteDescription?: string
  // termsAndConditionsPageUrl?: string
  // privacyPolicyPageUrl?: string
  // supportPageUrl?: string
  seo?: Sanity.ProductionWorkspace.Schema.SeoSettings
}

export default `
  menus {
    'primary': coalesce(
      primary->__i18n_refs[$locale match _key][0]->menuItems[]{${menuQuery}},
      primary->menuItems[]{${menuQuery}}
    ),
    'footer': coalesce(
      footer->__i18n_refs[$locale match _key][0]->menuItems[]{${menuQuery}},
      footer->menuItems[]{${menuQuery}}
    )
  },
  "seo": *[_type == 'seoSettings'][0] {
    "metaTitle": coalesce(
      metaTitle[$locale],
      metaTitle[$defaultLocale]
    ),
    "metaDesc": coalesce(
      metaDesc[$locale],
      metaDesc[$defaultLocale]
    ),
    "shareTitle": coalesce(
      shareTitle[$locale],
      shareTitle[$defaultLocale]
    ),
    "shareDesc": coalesce(
      shareDesc[$locale],
      shareDesc[$defaultLocale]
    ),
    shareGraphic,
  },
  ...coalesce(
    *[_type == 'cookieSettings'][0]
    ) {
      enabledCookieConsent == true => {
        enabledCookieConsent,
        "cookieConsentText": coalesce(
          cookieConsentText[$locale],
          cookieConsentText[$defaultLocale]
        ),
      },
    },
  ...coalesce(
    *[_type == 'siteContent'][0]
    ) {
      siteEmail,
      siteSocialLinks,
      supportPhoneNumber,
      "siteTitle": coalesce(
        siteTitle[$locale],
        siteTitle[$defaultLocale]
      ),
      "siteAddress": coalesce(
        siteAddress[$locale],
        siteAddress[$defaultLocale]
      ),
      "siteCopyRight": coalesce(
        siteCopyRight[$locale],
        siteCopyRight[$defaultLocale]
      ),
      "siteDescription": coalesce(
        siteDescription[$locale],
        siteDescription[$defaultLocale]
      ),
      enabledStoreMessage == true => {
        enabledStoreMessage,
        storeMessageTextColor,
        "storeMessage": coalesce(
          storeMessage[$locale],
          storeMessage[$defaultLocale]
        ),
      },
    }
`
