import { tooltipClasses } from '@mui/material'

const overrides = {
  styleOverrides: {
    popper: ({ theme }) => ({
      [`& .${tooltipClasses.arrow}`]: {
        color: theme.vars.palette.common.black,
      },
      [`& .${tooltipClasses.tooltip}`]: {
        ...theme.typography.body2,
        backgroundColor: theme.vars.palette.common.black,
        padding: theme.spacing(1, 1),
      },
    }),
  },
}

export default overrides
