import { Box, Dialog, DialogContent, IconButton, Slide, useMediaQuery } from '@mui/material'
import * as React from 'react'
import { CloseIcon } from '~/components'

const TransitionComponent = React.forwardRef(function TransitionComponent(props, ref) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />
})

const QuranReaderAyahTafsir = ({
  isContentModalOpen,
  onModalClose,
  languageAndTafsirSelection,
  body,
  surahAndAyahSelection,
}: {
  isContentModalOpen: boolean
  onModalClose: () => void
  languageAndTafsirSelection: React.ReactNode
  body: React.ReactNode
  surahAndAyahSelection: React.ReactNode
}) => {
  // @ts-ignore
  const isBreakpointUp = useMediaQuery((theme) => theme.breakpoints.up('sm'))

  return (
    <Dialog
      // @ts-ignore
      TransitionComponent={!isBreakpointUp ? TransitionComponent : undefined}
      fullScreen={!isBreakpointUp}
      onClose={onModalClose}
      open={isContentModalOpen}
      maxWidth="md"
      fullWidth
      aria-labelledby="cia-market-menu-title"
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'background.dark',
        },
      }}
    >
      <Box sx={{ display: 'flex', width: '100%', padding: '20px 24px' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            width: '100%',
          }}
        >
          {surahAndAyahSelection}
        </Box>
        {onModalClose && (
          <IconButton
            sx={{
              position: 'absolute',
              right: (theme) => theme.spacing(1),
              top: 5,
            }}
            onClick={onModalClose}
            color="inherit"
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <DialogContent>
        {languageAndTafsirSelection}
        {body}
      </DialogContent>
    </Dialog>
  )
}

export default QuranReaderAyahTafsir
