const overrides = {
  defaultProps: {
    color: 'default',
    elevation: 0,
  },
  styleOverrides: {
    colorDefault: ({ theme }) => ({
      backgroundColor: theme.vars.palette.primary.main,
      color: theme.vars.palette.text.primary,
    }),
  },
}

export default overrides
