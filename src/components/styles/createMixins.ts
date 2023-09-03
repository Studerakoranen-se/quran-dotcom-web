import { Breakpoints, colors } from '@mui/material'
import { MixinsOptions } from '@mui/material/styles/createMixins'
import { Spacing } from '@mui/system'

export default function createMixins(breakpoints: Breakpoints, spacing: Spacing, mixins: MixinsOptions) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  function position(position, ...args) {
    const keys = ['top', 'right', 'bottom', 'left']
    const map = [
      [0, 0, 0, 0],
      [0, 1, 0, 1],
      [0, 1, 2, 1],
      [0, 1, 2, 3],
    ]

    if (args.length === 0) {
      args = [0, 0, 0, 0]
    }

    const styles = { position }
    keys.forEach((key, idx) => {
      styles[key] = args[map[args.length - 1][idx]]
    })

    return styles
  }

  return {
    // Mui overrides
    toolbar: {
      minHeight: 'var(--cia-toolbar-height)',
      // Breakpoint is needed to override internal MUI styles.
      [breakpoints.up('sm')]: {
        minHeight: 'var(--cia-toolbar-height)',
      },
    },
    // Custom mixins
    contain: (breakpoint = 'lg') => ({
      maxWidth: breakpoints.values[breakpoint] || breakpoint,
      marginInline: 'auto',
    }),
    // Higher CSS specificity is needed, hence the `:not(style)` selector is needed.
    // https://github.com/mui-org/material-ui/issues/26384#issuecomment-844890584
    horizontalRhythm: (amount = 1, selector = ':not(style)') => ({
      [`& > ${selector} + ${selector}`]: {
        marginLeft: spacing(amount),
      },
    }),
    // Higher CSS specificity is needed, hence the `:not(style)` selector is needed.
    // https://github.com/mui-org/material-ui/issues/26384#issuecomment-844890584
    verticalRhythm: (amount = 1, selector = ':not(style)') => ({
      [`& > ${selector} + ${selector}`]: {
        marginTop: spacing(amount),
      },
    }),
    absolute: (...args) => {
      return position('absolute', ...args)
    },
    fixed: (...args) => {
      return position('fixed', ...args)
    },
    sticky: (...args) => {
      return position('sticky', ...args)
    },
    lineClamp: (lines) => ({
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: lines,
      overflow: 'hidden',
    }),
    scrollable: {
      overscrollBehaviorY: 'contain',
      overflowX: 'hidden',
      overflowY: 'auto',
      // Add iOS momentum scrolling.
      WebkitOverflowScrolling: 'touch',
    },
    scrollbars: {
      '&::-webkit-scrollbar': {
        width: 5,
        backgroundColor: colors.grey[200],
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: colors.grey[800],
      },
    },
    ...mixins,
  }
}
