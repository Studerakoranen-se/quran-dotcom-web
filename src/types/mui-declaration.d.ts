/* eslint-disable @typescript-eslint/no-empty-interface */
import type { Theme as MuiTheme } from '@mui/material'

// mui
import type {} from '@mui/material/themeCssVarsAugmentation'

// import * as createMixins from '@mui/material/styles/createMixins'
// import * as createTypography from '@mui/material/styles/createTypography'
// import * as createPalette from '@mui/material/styles/createPalette'

interface ExtraPalette {
  modes?: Record<string, any>
  yellow?: Record<string, any>
}

interface ExtraMixins {
  gutters: (amount?: number) => CSSObject
  verticalBorders: (color?: string) => CSSObject
  horizontalBorders: (color?: string) => CSSObject
  horizontalRhythm: (amount?: number, selector?: string) => CSSObject
  verticalRhythm: (amount: number, selector?: string) => CSSObject
  lineClamp: (lines: any) => CSSProCSSObjectperties
  toolbar: CSSObject
  toolbarDense: CSSObject
  hideScrollbars: CSSObject
  scrollbars: CSSObject
  scrollable: CSSObject
  contain: (breakpoint?: string | number) => CSSObject
  absolute: (...args: any) => CSSObject
  fixed: (...args: any) => CSSObject
  blurryPaper: (type: string | undefined) => CSSObject
}

interface ExtraTypography {
  fontFamilyPrimary?: React.CSSProperties['fontFamily']
  fontFamilySecondary?: React.CSSProperties['fontFamily']
  fontWeightSemibold?: React.CSSProperties['fontWeight']
}

// interface ExtraTheme {}

/**
 * Adding on extra palette properties
 */
declare module '@mui/material/styles/createPalette' {
  // This controls what appears when you use the theme variable inside sx, styled, etc.
  export interface Palette extends ExtraPalette {}
  // This controls what you are allowed to specify in `createTheme`.
  export interface PaletteOptions extends ExtraPalette {}
  // You need both to get the behavior you want.
}

declare module '@mui/material/styles/createMixins' {
  // This controls what appears when you use the theme variable inside sx, styled, etc.
  export interface Mixins extends ExtraMixins {}
  // This controls what you are allowed to specify in `createTheme`.
  export interface MixinsOptions extends ExtraMixins {}
  // You need both to get the behavior you want.
}

declare module '@mui/material/styles/createTypography' {
  // This controls what appears when you use the theme variable inside sx, styled, etc.
  export interface Typography extends ExtraTypography {}
  // This controls what you are allowed to specify in `createTheme`.
  export interface TypographyOptions extends ExtraTypography {}
  // You need both to get the behavior you want.
}

// emotion
/**
 * Adding on extra theme properties
 */
declare module '@mui/material/styles' {
  export interface Theme extends MuiTheme {}
  //   // This controls what appears when you use the theme variable inside sx, styled, etc.
  //   interface Theme extends ExtraTheme {}
  //   // This controls what you are allowed to specify in `createTheme`.
  //   interface ThemeOptions extends ExtraTheme {}
  //   // You need both to get the behavior you want.

  // allow configuration using `createTheme`
  //   interface TypographyVariantsOptions {
  //     caption2?: React.CSSProperties
  //     preamble?: React.CSSProperties
  //     preamble2?: React.CSSProperties
  //     inputText?: React.CSSProperties
  //   }

  interface TypographyVariants {
    caption2: React.CSSProperties
    preamble: React.CSSProperties
    preamble2: React.CSSProperties
    inputText: React.CSSProperties
  }
  interface TypeBackground {
    toolbar: string
  }

  interface TypeAction {
    textOpacity: string
  }

  interface TypeText {
    contrastText: string
    textInverted?: Record<string, any>
    main: string
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    caption2?: TypographyStyleOptions
    preamble?: TypographyStyleOptions
    preamble2?: TypographyStyleOptions
    inputText?: TypographyStyleOptions
  }
}
