// @ts-nocheck
// NOTE: this is not related to css media queries, but rather a sanity query for a Media document
export interface SanityImageQueryResult
  extends Pick<NonNullable<Sanity.ProductionWorkspace.Schema.Media>, 'image'> {
  _type: 'image'
}

export interface SanityVideoQueryResult
  extends Pick<NonNullable<Sanity.ProductionWorkspace.Schema.Media>, 'video'> {
  _type: 'video'
}

export interface PictureMediaQueryResult {
  breakpoints?: {
    xs?: SanityImageQueryResult
    sm?: SanityImageQueryResult
    md?: SanityImageQueryResult
    lg?: SanityImageQueryResult
    xl?: SanityImageQueryResult
  }
  component?: 'picture'
}

export interface VideoBreakpointsMediaQueryResult {
  breakpoints?: {
    xs?: SanityVideoQueryResult | undefined
    sm?: SanityVideoQueryResult | undefined
    md?: SanityVideoQueryResult | undefined
    lg?: SanityVideoQueryResult | undefined
    xl?: SanityVideoQueryResult | undefined
  }
  component?: 'video'
}

export interface ImgMediaQueryResult {
  component?: 'img'
  src?: SanityImageQueryResult
}

export interface VideoMediaQueryResult {
  component?: 'video'
  src?: string
}

export type MediaQueryResult = {
  alt?: string
  auto?: boolean
} & (
    | PictureMediaQueryResult
    | ImgMediaQueryResult
    | VideoBreakpointsMediaQueryResult
    | VideoMediaQueryResult
  )

// these are not imported from the theme because they do not necessarily match it, they are rather dependant on the sanity schema
const BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl']

export default `
  defined(image) && mediaType == 'image' && auto == true => {
    auto,
    'component': 'img',
    'src': image
  },
  defined(video) && mediaType == 'video' && auto == true => {
    auto,
    'component': 'video',
    'src': video.asset->url
  },
  defined(breakpoints) && mediaType == 'image' && auto == false => {
    'component': 'picture',
    breakpoints{
      ${BREAKPOINTS.map(
  (breakpoint) => `
          defined(${breakpoint}.image) => {'${breakpoint}': ${breakpoint}{...image}}
        `,
).join(',')}
    }
  },
  defined(breakpoints) && mediaType == 'video' && auto == false => {
    'component': 'video',
    breakpoints{
      ${BREAKPOINTS.map(
  (breakpoint) => `
          defined(${breakpoint}.video) => {'${breakpoint}': ${breakpoint}{...video.asset->url}}
        `,
).join(',')}
    }
  },
`
