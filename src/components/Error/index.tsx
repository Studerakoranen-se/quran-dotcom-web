import React from 'react'
import { Box, Button } from '@mui/material'
import { OFFLINE_ERROR } from '~/api'
// import RetryIcon from '@/icons/retry.svg';

interface Props {
  onRetryClicked: () => void
  error: Error
}

const Error: React.FC<Props> = ({ onRetryClicked, error }) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        paddingBlockStart: '0.625rem',
        paddingBlockEnd: '0.625rem',
        paddingInlineStart: '0.625rem',
        paddingInlineEnd: '0.625rem',
        '> button': {
          marginBlockStart: 0,
          marginBlockEnd: 0,
          marginInlineStart: 'auto',
          marginInlineEnd: 'auto',
        },
      }}
    >
      <Box
        component="p"
        sx={{
          textAlign: 'center',
          paddingBlockEnd: '0.625rem',
        }}
      >
        {error.message !== OFFLINE_ERROR ? 'general' : 'offline'}
      </Box>
      <Button
        // startIcon={<RetryIcon />}
        size="small"
        onClick={onRetryClicked}
      >
        Retry
      </Button>
    </Box>
  )
}

export default Error
