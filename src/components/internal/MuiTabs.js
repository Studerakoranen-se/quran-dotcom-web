const overrides = {
  styleOverrides: {
    root: ({ theme }) => ({
      minHeight: 28,
      textTransform: 'none',
      '& [class*="-indicator"]': {
        backgroundColor: theme.palette.inverted.text.primary,
      },
    }),
  },
}

export default overrides
