import { Box } from '@mui/material'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const TafsirMessage: React.FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        padding: '1rem',
        marginBlockEnd: '1rem',
        backgroundColor: 'background.dark',
        borderRadius: '0.25rem',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'divider',
        fontSize: '1rem',
      }}
    >
      {children}
    </Box>
  )
}

export default TafsirMessage
