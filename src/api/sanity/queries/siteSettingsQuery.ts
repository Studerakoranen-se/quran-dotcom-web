import settingsQuery, { SettingsQueryResult } from './partials/settingsQuery'

export type SiteSettingsQueryResult = SettingsQueryResult

export default `
  coalesce(
    *[_type == 'generalSettings' && _id in path("drafts.**")][0],
    *[_type == 'generalSettings'][0]
  ) {
    ${settingsQuery},
  }
`
