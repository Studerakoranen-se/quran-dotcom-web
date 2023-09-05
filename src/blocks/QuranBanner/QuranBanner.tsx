import { styled } from '@mui/material'
import { Media, MediaReveal } from '@noaignite/oui'

const QuranBannerRoot = styled('section')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 550,
  color: theme.vars.palette.common.white, // Use `common.white` as color is based on image not theme mode.
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    minHeight: 650,
  },
  background: "url('/assets/quran-transparent-bg.png')",
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
}))

const QuranBannerMediaReveal = styled(MediaReveal)(({ theme }) => ({
  position: 'absolute',
  zIndex: -1,
  inset: 0,
  display: 'flex',
  backgroundColor: theme.palette.primary.main,
}))

const QuranBannerMedia = styled(Media)(({ theme }) => ({
  width: 880,
  height: 300,
  margin: 'auto',
  [theme.breakpoints.up('md')]: {
    width: 880,
    height: 300,
  },
}))

type QuranBannerProps = {
  mediaProps: any
  renderIndex: number
}

function QuranBanner(props: QuranBannerProps) {
  const { mediaProps, renderIndex } = props

  return (
    <QuranBannerRoot>
      {mediaProps && (
        <QuranBannerMediaReveal>
          <QuranBannerMedia
            {...(mediaProps?.component === 'video'
              ? {
                  autoPlay: true,
                  muted: true,
                  loop: true,
                  playsInline: true,
                }
              : { alt: '' })}
            {...mediaProps}
            priority={renderIndex === 0}
          />
        </QuranBannerMediaReveal>
      )}
    </QuranBannerRoot>
  )
}

export default QuranBanner
