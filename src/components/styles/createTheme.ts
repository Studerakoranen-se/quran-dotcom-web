import { experimental_extendTheme, SupportedColorScheme } from '@mui/material'
import { ThemeOptions as SystemThemeOptions } from '@mui/system'
import { ColorSystemOptions } from '@mui/material/styles/experimental_extendTheme'
import { MixinsOptions } from '@mui/material/styles/createMixins'

import * as components from '../internal'
import breakpoints from './breakpoints'
import createMixins from './createMixins'
import createPalette from './createPalette'
import createTypography from './createTypography'
import shape from './shape'
import spacing from './spacing'

/**
 * `createTheme` wrapper function enables the following
 * - Custom light/dark pallete.
 * - Custom mixins with `breakpoints` and `spacing` access.
 *
 * @param {object} options
 */

interface ThemeExtendOption extends SystemThemeOptions {
  colorSchemes?: Partial<Record<SupportedColorScheme, ColorSystemOptions>>
  mixins?: MixinsOptions
}

export default function createTheme(options: ThemeExtendOption = {}) {
  const {
    colorSchemes: colorSchemesInput = {},
    mixins: mixinsInput = {},
    typography: typographyInput = {},
    ...other
  } = options


  const theme = experimental_extendTheme(
    {
      colorSchemes: {
        ...colorSchemesInput,
        light: {
          ...colorSchemesInput.light,
          // @ts-ignore
          palette: createPalette({ mode: 'light', ...colorSchemesInput.light?.palette }),
        },
        dark: {
          ...colorSchemesInput.dark,
          // @ts-ignore
          palette: createPalette({ mode: 'dark', ...colorSchemesInput.dark?.palette }),
        },
      },
      breakpoints,
      // @ts-ignore
      components,
      shape,
      spacing,
      // @ts-ignore
      typography: createTypography(typographyInput),
    },
    other,
  )

  // Patch the theme object with mixins once `createMixins` arguments are defined.
  // @ts-ignore
  theme.mixins = createMixins(theme.breakpoints, theme.spacing, mixinsInput)

  return theme
}
