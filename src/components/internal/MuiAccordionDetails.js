import { accordionClasses } from '@mui/material'

const overrides = {
  styleOverrides: {
    root: ({ theme }) => ({
      paddingLeft: 0,
      paddingRight: 0,
      [`.${accordionClasses.gutters} &`]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    }),
  },
}

export default overrides
