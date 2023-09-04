const BORDER_WIDTH = 1
const PADDING_X = 16
const PADDING_TOP = 7
const PADDING_BOTTOM = 7

const overrides = {
  defaultProps: {
    color: 'text',
    disableElevation: true,
    disableRipple: true,
    size: 'large',
  },
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: theme.shape.borderRadius,
    }),
    sizeSmall: ({ theme }) => ({
      padding: `${PADDING_TOP}px ${PADDING_X - 6}px ${PADDING_BOTTOM}px ${PADDING_X - 6}px`,
      fontSize: theme.typography.pxToRem(11),
    }),
    sizeMedium: {
      padding: `${PADDING_TOP + 8}px ${PADDING_X + 2}px ${PADDING_BOTTOM + 6}px ${PADDING_X}px`,
    },
    sizeLarge: {
      padding: `${PADDING_TOP * 2}px ${PADDING_X + 6}px ${PADDING_BOTTOM + 9}px ${PADDING_X + 6}px`,
    },
    outlinedSizeSmall: {
      padding: `${PADDING_TOP - BORDER_WIDTH}px ${PADDING_X - 6 - BORDER_WIDTH}px ${
        PADDING_BOTTOM - BORDER_WIDTH
      }px ${PADDING_X - 6 - BORDER_WIDTH}px`,
    },
    outlinedSizeMedium: {
      padding: `${PADDING_TOP - BORDER_WIDTH}px ${PADDING_X - BORDER_WIDTH}px ${
        PADDING_BOTTOM - BORDER_WIDTH
      }px ${PADDING_X - BORDER_WIDTH}px`,
    },
    outlinedSizeLarge: {
      padding: `${PADDING_TOP * 2 - BORDER_WIDTH}px ${PADDING_X + 6 - BORDER_WIDTH}px ${
        PADDING_BOTTOM + 9 - BORDER_WIDTH
      }px ${PADDING_X + 6 - BORDER_WIDTH}px`,
    },
  },
}

export default overrides
