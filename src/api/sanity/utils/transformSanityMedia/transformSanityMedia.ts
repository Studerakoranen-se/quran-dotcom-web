// @ts-nocheck
// TODO: This function could be refactored to use Set and Map instead of arrays and objects. That way there is no need to filter out duplicates
import muiBreakpoints from '~/components/styles/breakpoints'
import {
  MediaQueryResult,
  SanityImageQueryResult,
  SanityVideoQueryResult,
} from '~/api/sanity/queries'
import transformSanityImage from '../transformSanityImage'

const ALLOWED_MEDIA_ATTRIBUTES = ['alt', 'height', 'width']
const MAX_IMAGE_WIDTH = 2560

interface Breakpoints<T> {
  xs: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  xxl?: T
}

interface ImageBuilderOptions {
  img?: Record<string, unknown>
  picture?: Breakpoints<Record<string, unknown>>
}

export default function transformSanityMedia(
  sanityMedia?: MediaQueryResult,
  imageBuilderOptions?: ImageBuilderOptions,
) {
  if (!sanityMedia) {
    return null
  }

  const { auto, component, ...other } = sanityMedia

  if (!component) {
    return null
  }

  const mediaProps = Object.fromEntries(
    Object.entries(other).filter(([key]) => ALLOWED_MEDIA_ATTRIBUTES.includes(key)),
  )

  /* "fill in" imageBuilderOptions for picture components so that users only need to specify changes between breakpoints, e.g xs settings
    will be applied upwards until a larger breakpoint setting is specified
  */
  let filledInImageBuilderOptions: Breakpoints<Record<string, unknown>> | undefined

  if (imageBuilderOptions?.picture) {
    let previousAvailableOptionValue: Record<string, unknown>

    filledInImageBuilderOptions = (
      Object.entries(muiBreakpoints.values) as Array<[keyof Breakpoints<number>, number]>
    ).reduce((acc, [breakpointKey]) => {
      const currentOptionValue = imageBuilderOptions?.picture?.[breakpointKey]

      if (currentOptionValue) {
        previousAvailableOptionValue = currentOptionValue

        acc[breakpointKey] = currentOptionValue
      } else {
        acc[breakpointKey] = previousAvailableOptionValue
      }

      return acc
    }, {} as NonNullable<ImageBuilderOptions['picture']>)
  }

  if (component === 'img' && sanityMedia.src) {
    if (auto) {
      // "auto" indicates that the admin wants the image to be automatically turned
      // into a responsive picture component with sources for all breakpoints
      const breakpoints = {} as Breakpoints<SanityImageQueryResult>
      const autoImageBuilderOptions = {} as NonNullable<ImageBuilderOptions['picture']>

      ;(
        Object.entries(muiBreakpoints.values) as Array<[keyof typeof muiBreakpoints.values, number]>
      ).forEach(([breakpointKey], i, array) => {
        // generate breakpoints object with sanity video objects for each breakpoint
        if (sanityMedia.src) {
          breakpoints[breakpointKey] = sanityMedia.src
        }

        // generate default image builder options for each breakpoint
        autoImageBuilderOptions[breakpointKey] = {
          width: array[i + 1]?.[1] ?? MAX_IMAGE_WIDTH,
          ...filledInImageBuilderOptions?.[breakpointKey],
        }
      })

      return {
        ...mediaProps,
        component: 'picture',
        breakpoints: transformImageBreakpoints(breakpoints, autoImageBuilderOptions),
      }
    }

    // not an auto responsiveness image, just return a transformed 'img' object
    return {
      ...mediaProps,
      component: 'img',
      src: transformSanityImage(sanityMedia.src, imageBuilderOptions?.img),
    }
  }

  if (component === 'video' && sanityMedia.src) {
    if (auto) {
      // "auto" indicates that the admin wants the image to be automatically turned
      // into a responsive picture component with sources for all breakpoints
      const breakpoints = {} as Breakpoints<SanityVideoQueryResult>

      ;(
        Object.entries(muiBreakpoints.values) as Array<[keyof typeof muiBreakpoints.values, number]>
      ).forEach(([breakpointKey], _i, _array) => {
        // generate breakpoints object with sanity image objects for each breakpoint
        if (sanityMedia.src) {
          breakpoints[breakpointKey] = sanityMedia.src
        }
      })

      return {
        ...mediaProps,
        component: 'video',
        breakpoints: transformVideoBreakpoints(breakpoints),
      }
    }
  }

  let breakpoints: Breakpoints<string> | undefined

  if (component === 'picture' && sanityMedia.breakpoints?.xs) {
    breakpoints = transformImageBreakpoints(sanityMedia.breakpoints, imageBuilderOptions?.picture)
  }

  if (component === 'video' && sanityMedia.breakpoints?.xs) {
    breakpoints = (
      Object.entries(sanityMedia.breakpoints) as Array<
        [keyof typeof breakpoints, SanityVideoQueryResult]
      >
    )

      .map(([key, value]): [keyof Breakpoints<string>, string] => [key, value])
      .reduce((acc, [key, value]) => {
        // add to final breakpoints object and remove duplicates
        if (!Object.values(acc).includes(value)) {
          acc[key] = value
        }

        return acc
      }, {} as Breakpoints<string>)
  }

  if (breakpoints) {
    return {
      ...mediaProps,
      component,
      breakpoints,
    }
  }

  return null
}

// this function is responsible for transforming a breakpoints object of sanity images into a final breakpoints object with urls
function transformImageBreakpoints(
  breakpoints: Partial<Breakpoints<SanityImageQueryResult>>,
  imageBuilderOptions?: ImageBuilderOptions['picture'],
) {
  return (
    (Object.entries(breakpoints) as Array<[keyof typeof breakpoints, SanityImageQueryResult]>)
      // map sanity image objects to image urls
      .map(([key, value]): [keyof Breakpoints<string>, string] => [
        key,
        transformSanityImage(value, imageBuilderOptions?.[key]),
      ])
      .reduce((acc, [key, value]) => {
        // add to final breakpoints object and remove duplicates
        if (!Object.values(acc).includes(value)) {
          acc[key] = {
            src: value,
          }
        }

        return acc
      }, {} as Breakpoints<string>)
  )
}

function transformVideoBreakpoints(breakpoints: Partial<Breakpoints<SanityVideoQueryResult>>) {
  return (Object.entries(breakpoints) as Array<[keyof typeof breakpoints, SanityVideoQueryResult]>)

    .map(([key, value]): [keyof Breakpoints<string>, string] => [key, value])
    .reduce((acc, [key, value]) => {
      // add to final breakpoints object and remove duplicates
      if (!Object.values(acc).includes(value)) {
        acc[key] = value
      }

      return acc
    }, {} as Breakpoints<string>)
}
