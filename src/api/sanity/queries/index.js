/*
Queries should be exported excluding their brackets, only containing whatever keys make up that query. This way, they can be easily composed to make larger queries:

Do:

export const pageQuery `
  title,
  description,
  blocks
`

Don't:

export const pageQuery `{
  title,
  description,
  blocks
}`
*/

export * from './partials/blocks'

export { default as frontpageQuery } from './frontpageQuery'
export * from './frontpageQuery'

export { default as pageTypeQuery } from './pageTypeQuery'
export * from './pageTypeQuery'

export { default as siteSettingsQuery } from './siteSettingsQuery'
export * from './siteSettingsQuery'

export { default as mediaQuery } from './partials/mediaQuery'
export * from './partials/mediaQuery'

export { default as blocksQuery } from './partials/blocksQuery'
export * from './partials/blocksQuery'
