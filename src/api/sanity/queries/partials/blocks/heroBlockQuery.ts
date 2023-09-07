import createLinkQuery, { LinkQueryResult } from '../createLinkQuery'

export interface HeroBlockQueryResult {
  id?: string
  heading?: string
  subheading?: string
  ctaLabel?: string
  ctaUrl?: string
  ctaLabel2?: LinkQueryResult
  ctaUrl2?: LinkQueryResult
  text?: string
  fullHeight?: boolean
  textColor?: 'light' | 'dark'
}

export default `
  heading,
  subheading,
  text,
  ctaLabel,
  ctaLabel2,
  fullHeight,
  textColor,
  'ctaUrl': ${createLinkQuery('ctaUrl')},
  'ctaUrl2': ${createLinkQuery('ctaUrl2')}
`
