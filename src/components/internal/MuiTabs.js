const overrides = {
  styleOverrides: {
    root: ({ theme }) => ({
      minHeight: 28,
      textTransform: 'none',
      '& [class*="-indicator"]': {
        backgroundColor: theme.palette.text.primary,
      },
    }),
  },
}

export default overrides
