import { TypographyOptions } from '@mui/material/styles/createTypography'

import { deepmerge } from '@mui/utils'

const caseAllCaps = {
  textTransform: 'uppercase',
}

const caseNoCaps = {
  textTransform: 'none',
}

export default function createTypography(typography: TypographyOptions) {
  const {
    fontFamilyPrimary = '"El Messiri", "Arial", sans-serif',
    fontFamilySecondary = '"Manrope", "Arial", sans-serif',
    // The default font size of the Material Specification.
    fontSize = 14, // px
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightSemibold = 600,
    fontWeightBold = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize = 16,
    // Apply the CSS properties to all the variants.
    allVariants,
    ...other
  } = typography

  const coef = fontSize / 14
  const pxToRem = (size) => `${(size / htmlFontSize) * coef}rem`
  const buildVariant = (
    typeFace: string,
    fontWeight: number | string,
    size: number,
    lineHeight: number,
    letterSpacing: number,
    casing?: Record<string, any>,
  ) => ({
    fontFamily: typeFace,
    fontWeight,
    fontSize: pxToRem(size),
    // Unitless following http://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight,
    letterSpacing: `${letterSpacing}em`,
    ...casing,
    ...allVariants,
  })

  const variants = {
    h1: buildVariant(fontFamilyPrimary, fontWeightBold, 64, 1, -0.01, caseAllCaps),
    h2: buildVariant(fontFamilyPrimary, fontWeightBold, 24, 1, 0),
    h3: buildVariant(fontFamilyPrimary, fontWeightSemibold, 32, 1, -0.01, caseAllCaps),
    h4: buildVariant(fontFamilyPrimary, fontWeightSemibold, 20, 1, -0.01, caseAllCaps),
    h5: buildVariant(fontFamilyPrimary, fontWeightMedium, 20, 1, 0, caseAllCaps),
    h6: buildVariant(fontFamilyPrimary, fontWeightMedium, 18, 1, 0, caseAllCaps),
    subtitle1: buildVariant(fontFamilySecondary, fontWeightSemibold, 18, 1, 0, caseNoCaps),
    subtitle2: buildVariant(fontFamilySecondary, fontWeightSemibold, 11, 1, 0, caseAllCaps),
    body1: buildVariant(fontFamilySecondary, fontWeightRegular, 16, 1.5, 0, caseNoCaps),
    body2: buildVariant(fontFamilySecondary, fontWeightRegular, 14, 1, 0, caseNoCaps),
    button: buildVariant(fontFamilySecondary, fontWeightMedium, 16, 1, 0, caseNoCaps),
    caption: buildVariant(fontFamilySecondary, fontWeightLight, 14, 1, 0, caseNoCaps),
    overline: buildVariant(fontFamilyPrimary, fontWeightRegular, 12, 1, 0.055, caseAllCaps),
    // Custom variants
    caption2: buildVariant(fontFamilySecondary, fontWeightRegular, 11, 1, 0, caseNoCaps), // Custom variant
    preamble: buildVariant(fontFamilyPrimary, fontWeightLight, 22, 1, 0, caseNoCaps),
    preamble2: buildVariant(fontFamilyPrimary, fontWeightRegular, 18, 1, 0),
    inputText: buildVariant(fontFamilyPrimary, fontWeightRegular, 13, 1, 0), // Should at least be 16px fontSize for iOS Safari not to zoom in on focus.
  }

  const typographyOutput = deepmerge(
    {
      htmlFontSize,
      pxToRem,
      fontFamilyPrimary,
      fontFamilySecondary,
      fontSize,
      fontWeightLight,
      fontWeightRegular,
      fontWeightMedium,
      fontWeightSemibold,
      fontWeightBold,
      // Mui uses standalone `fontFamily` internally.
      fontFamily: fontFamilyPrimary,
      ...variants,
    },
    other,
  )

  return typographyOutput
}
