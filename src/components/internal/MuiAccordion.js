import { accordionClasses } from '@mui/material'

const overrides = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderTop: `1px solid ${theme.palette.divider}`,
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: 'transparent',
      '&:first-of-type, &:last-of-type': {
        borderRadius: 0, // Cancel `theme.shape.borderRadius`.
      },
      '& + &': {
        borderTop: 'none', // Do not stack borders.
      },
      '&:before': {
        display: 'none', // Disable & style using borders instead.
      },
      [`&.${accordionClasses.expanded}`]: {
        margin: 0,
      },
    }),
  },
}

export default overrides
