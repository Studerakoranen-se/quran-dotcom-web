import * as React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Typography, styled } from '@mui/material'
import { SanityHtml } from '~/containers'
import { ExpandMoreIcon } from '~/components'
import { AccordionsBlockQueryResult } from '~/api'

const BREAKPOINT_KEY = 'md'

const AccordionsRoot = styled('section')(({ theme }) => ({
  padding: 'calc(var(--cia-section-spacing) * 2) var(--cia-container-spacing)',
}))

const AccordionsContainer = styled('div')(({ theme }) => ({
  ...theme.mixins.contain('sm'),
}))

const AccordionsHeading = styled('h1')(({ theme }) => ({
  ...theme.typography.h5,
  margin: '0 0 var(--cia-section-spacing)',
  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    fontSize: theme.typography.h4.fontSize,
  },
}))

const AccordionsGroup = styled('div')({
  '& + &': {
    marginTop: 'var(--cia-section-spacing)',
  },
})

const AccordionsEntryHeading = styled('h2')(({ theme }) => ({
  ...theme.typography.h6,
  margin: theme.spacing(0, 0, 4),
  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    fontSize: theme.typography.h5.fontSize,
  },
}))

function Accordions(props: AccordionsBlockQueryResult & { renderIndex: number }) {
  const { entries, id, renderIndex } = props

  return (
    <AccordionsRoot id={id}>
      <AccordionsContainer>
        {/* {heading && <AccordionsHeading>{heading}</AccordionsHeading>} */}

        {entries?.map((entry, idx) => (
          <AccordionsGroup key={idx}>
            {entry.heading && <AccordionsEntryHeading>{entry.heading}</AccordionsEntryHeading>}

            {entry.entries?.map((entry2, idx2) => (
              <Accordion
                key={idx2}
                disableGutters
                sx={(theme) => ({
                  ...(theme.palette.mode === 'dark' && {
                    '&.MuiAccordion-root': {
                      backgroundColor: `white`,
                      // @ts-ignore
                      color: theme.palette.textInverted.primary,
                    },

                    '& .MuiAccordionSummary-expandIconWrapper ': {
                      // @ts-ignore
                      color: theme.palette.textInverted.primary,
                    },
                  }),
                })}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`accordions-${renderIndex}-${idx}-${idx2}-content`}
                  id={`accordions-${renderIndex}-${idx}-${idx2}-header`}
                >
                  <Typography component="h3" variant="subtitle1">
                    {entry2.heading}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <SanityHtml blocks={entry2.text} />
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionsGroup>
        ))}
      </AccordionsContainer>
    </AccordionsRoot>
  )
}

// const subEntryType = PropTypes.shape({
//   heading: PropTypes.string.isRequired,
//   text: PropTypes.array.isRequired,
// })

// const entryType = PropTypes.shape({
//   heading: PropTypes.string,
//   entries: PropTypes.arrayOf(subEntryType).isRequired,
// })

// Accordions.propTypes = {
//   contentScrollerBreakpoint: PropTypes.string,
//   entries: PropTypes.arrayOf(entryType).isRequired,
//   heading: PropTypes.string,
//   id: PropTypes.string,
//   renderIndex: PropTypes.number,
// }

export default Accordions
