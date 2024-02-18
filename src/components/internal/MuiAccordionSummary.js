import { accordionClasses, accordionSummaryClasses } from '@mui/material'

const overrides = {
  styleOverrides: {
    root: ({ theme }) => ({
      paddingLeft: 0,
      paddingRight: 0,
      [`.${accordionClasses.gutters} &`]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
      [`&, &.${accordionSummaryClasses.expanded}`]: {
        minHeight: 'var(--cia-toolbar-dense-min-height)',
      },
    }),
    content: {
      [`&.${accordionSummaryClasses.expanded}`]: {
        margin: '12px 0', // Use same margin as collapsed.
      },
    },
  },
}

export default overrides
