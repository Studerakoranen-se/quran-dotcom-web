import { deepmerge } from '@mui/utils'
import { PaletteOptions, alpha } from '@mui/material'
import blue from '../colors/blue'
import common from '../colors/common'
import green from '../colors/green'
import grey from '../colors/grey'
import orange from '../colors/orange'
import red from '../colors/red'

export const darkText = {
  // The most important text.
  primary: green[500],
  // Secondary text.
  secondary: alpha(common.black, 0.65),
  // Disabled text have even lower visual prominence.
  disabled: alpha(common.black, 0.4),
  // Text hints.
  hint: alpha(common.black, 0.4),
  // Complementing keys used for component color variants.
  main: common.black,
  dark: alpha(common.black, 0.8), // Mui uses `dark` for hover. We want a lighter color.
  contrastText: common.white,
}

export const lightText = {
  primary: common.white,
  secondary: alpha(common.white, 0.5),
  disabled: alpha(common.white, 0.3),
  hint: alpha(common.white, 0.4),
  main: common.white,
  dark: alpha(common.white, 0.9),
  contrastText: common.black,
}

export const light = {
  // The colors used to style the text.
  text: darkText,
  // The colors used to style inverted text.
  textInverted: lightText,
  // The color used to divide different elements.
  divider: alpha(common.black, 0.1),
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    default: '#f1f1f1',
    paper: '#f1f1f1',
    dark: 'rgb(218 218 218 / 80%)',
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: common.black,
    // The background color of an hovered action.
    hover: alpha(common.black, 0.04),
    hoverOpacity: 0.04,
    // The background color of a selected action.
    selected: alpha(common.black, 0.08),
    selectedOpacity: 0.08,
    // The color of a disabled action.
    disabled: alpha(green[200], 0.3),
    // The background color of a disabled action.
    disabledBackground: alpha(common.black, 0.12),
    disabledOpacity: 0.38,
    focus: alpha(common.black, 0.12),
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
}

export const dark = {
  text: lightText,
  textInverted: darkText,
  divider: alpha(common.white, 0.25),
  background: {
    default: green[500],
    paper: '#61717D',
    dark: 'rgba(0, 29, 29, 0.8)',
  },
  action: {
    active: common.white,
    hover: alpha(common.white, 0.08),
    hoverOpacity: 0.08,
    selected: alpha(common.white, 0.16),
    selectedOpacity: 0.16,
    disabled: alpha(green[300], 0.3),
    disabledBackground: alpha(common.white, 0.12),
    disabledOpacity: 0.38,
    focus: alpha(common.white, 0.12),
    focusOpacity: 0.12,
    activatedOpacity: 0.24,
  },
}

export default function createPalette(palette: PaletteOptions) {
  const {
    primary = {
      light: green[300],
      main: green[500],
      dark: green[700],
      contrastText: common.white,
    },
    secondary = {
      light: green[300],
      main: green[500],
      dark: green[700],
      contrastText: common.white,
    },
    error = {
      light: red[300],
      main: red[500],
      dark: red[700],
    },
    warning = {
      light: orange[300],
      main: orange[500],
      dark: orange[700],
    },
    info = {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
    success = {
      light: green[300],
      main: green[500],
      dark: green[700],
      contrastText: common.white,
    },
    modes = { dark, light },
    mode = 'dark',
    contrastThreshold = 3,
    tonalOffset = 0.2,
    ...other
  } = palette

  const paletteOutput = deepmerge(
    {
      // A collection of common colors.
      common,
      // The palette mode, can be light or dark.
      mode,
      // The colors used to represent primary interface elements for a user.
      primary,
      // The colors used to represent secondary interface elements for a user.
      secondary,
      // The colors used to represent interface elements that the user should be made aware of.
      error,
      // The colors used to represent potentially dangerous actions or important messages.
      warning,
      // The colors used to present information to the user that is neutral and not necessarily important.
      info,
      // The colors used to indicate the successful completion of an action that user triggered.
      success,
      // The grey colors.
      grey,
      // The green colors.
      green,
      // Used by `getContrastText()` to maximize the contrast between the background and
      // the text.
      contrastThreshold,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset,
      // The light and dark type object.
      ...modes[mode],
      // Give access to the entire inverted object for styling simplicity as both are theme modes
      // are used within the Cake design.
      inverted: modes[mode === 'dark' ? 'light' : 'dark'],
    },
    other,
  )

  return paletteOutput
}
