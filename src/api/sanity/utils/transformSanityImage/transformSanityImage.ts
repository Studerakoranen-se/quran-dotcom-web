import createImageUrlBuilder from '@sanity/image-url'
import type { ImageUrlBuilderOptions, SanityImageRect } from '@sanity/image-url/lib/types/types'
import sanityClient from '../..'
import { SanityImageQueryResult } from '../../queries'

const imageUrlBuilder = createImageUrlBuilder(sanityClient)

type AllowedImageBuilderOptions =
  | 'dpr'
  | 'width'
  | 'height'
  | 'focalPoint'
  | 'rect'
  | 'format'
  | 'orientation'
  | 'quality'
  | 'fit'
  | 'crop'
  | 'auto'
  | 'pad'

type ImageBuilderOptionKeys = keyof Pick<ImageUrlBuilderOptions, AllowedImageBuilderOptions>

type ImageBuilderOptions = Pick<ImageUrlBuilderOptions, AllowedImageBuilderOptions>

type ImageBuilderOptionValues = ImageBuilderOptions[ImageBuilderOptionKeys]

export default function transformSanityImage(
  sanityImage: SanityImageQueryResult | Record<string, unknown> | string,
  options?: ImageBuilderOptions,
) {
  if (!sanityImage?.hasOwnProperty('_type')) {
    return sanityImage as string
  }

  let imageBuilder = imageUrlBuilder.image(sanityImage)

  if (options) {
    imageBuilder = (
      Object.entries(options) as [ImageBuilderOptionKeys, ImageBuilderOptionValues][]
    ).reduce((acc, [key, value]) => {
      if (value) {
        if (key === 'rect') {
          const rectValue = value as SanityImageRect

          acc = acc[key]?.(rectValue.left, rectValue.top, rectValue.width, rectValue.height)
        } else if (key === 'focalPoint') {
          const focalValue = value as NonNullable<ImageBuilderOptions['focalPoint']>

          acc = acc[key]?.(focalValue.x, focalValue.y)
        } else {
          // sorry, I don't understand why acc[key] parameter resolves to type `never`
          acc = acc[key](value as never)
        }
      }

      return acc
    }, imageBuilder)
  }

  return imageBuilder.url()
}
