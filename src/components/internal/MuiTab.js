const overrides = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(1.2, 0),
      minHeight: theme.spacing(5),
      marginRight: theme.spacing(5),
      minWidth: `60px !important`,
      color: theme.vars.palette.text.primary,
      opacity: 0.5,
      textTransform: 'none',

      '&:hover': {
        color: theme.vars.palette.text.primary,
        opacity: 1,
      },
      '&.Mui-selected': {
        color: theme.vars.palette.text.main,
        opacity: 1,
      },
      '&:focus': {
        color: theme.vars.palette.text.primary,
      },
    }),
  },
}

export default overrides
