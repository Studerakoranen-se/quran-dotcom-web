import * as React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
  styled,
  useMediaQuery,
} from '@mui/material'
import { useGlobalState, useGlobalHandlers, useI18n } from '~/contexts'
import { CloseIcon } from '~/components'
import { toLocalizedNumber } from '~/utils'
import ChapterInfo from '~/types/ChapterInfo'
import { getBlurDataUrl } from '~/utils/image'

const ImageContainer = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '0.25rem',
  height: 200,
  width: 200,
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    marginInlineEnd: '1.1875rem',
  },
}))

const TransitionComponent = React.forwardRef(function TransitionComponent(props, ref) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />
})

type QuranReaderInfoDrawerProps = {
  locale: string
  chapter?: Chapter
  chapterInfo?: ChapterInfo
}

const QuranReaderInfoDrawer = React.memo(function QuranReaderInfoDrawer(
  props: QuranReaderInfoDrawerProps,
) {
  const { locale, chapter, chapterInfo, ...other } = props

  // @ts-ignore
  const { onSurahInfoDialogClose } = useGlobalHandlers()
  // @ts-ignore
  const { isSurahInfoDialogOpen } = useGlobalState()
  const router = useRouter()
  const { t } = useI18n()

  // @ts-ignore
  const isBreakpointUp = useMediaQuery((theme) => theme.breakpoints.up('sm'))

  return (
    <Dialog
      // @ts-ignore
      TransitionComponent={!isBreakpointUp ? TransitionComponent : undefined}
      fullScreen={!isBreakpointUp}
      onClose={onSurahInfoDialogClose}
      open={isSurahInfoDialogOpen}
      maxWidth="md"
      fullWidth
      aria-labelledby="cia-market-menu-title"
      {...other}
    >
      <Box sx={{ display: 'flex', width: '100%', padding: '20px 24px' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            width: '100%',
          }}
        >
          <Box>
            <Typography variant="subtitle1">Surah {chapter?.transliteratedName}</Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="subtitle1">Ayahs</Typography>
            <span>{toLocalizedNumber(chapter?.versesCount as number, locale as string)}</span>
          </Box>

          <Box display="flex" flexDirection="column">
            <Typography variant="subtitle1">Revelation Place</Typography>
            <span>{chapter?.revelationPlace}</span>
          </Box>
        </Box>
        {onSurahInfoDialogClose && (
          <IconButton
            sx={{
              position: 'absolute',
              right: (theme) => theme.spacing(1),
              top: 5,
            }}
            onClick={onSurahInfoDialogClose}
            color="inherit"
            aria-label={t(__translationGroup)`Close market menu`}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <DialogContent>
        <ImageContainer>
          <Image
            src={`/assets/${chapter?.revelationPlace}.jpg`}
            layout="fill"
            placeholder="blur"
            blurDataURL={getBlurDataUrl(200, 200)}
            alt={chapter?.revelationPlace as string}
            // alt={t(`surah-info:${chapter?.revelationPlace}`)}
          />
        </ImageContainer>

        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: chapterInfo?.text as string }} />
      </DialogContent>
    </Dialog>
  )
})

export default QuranReaderInfoDrawer
