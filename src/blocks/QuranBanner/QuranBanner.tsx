import { styled } from '@mui/material'
import { Media, MediaReveal } from '@noaignite/oui'

const HeroRoot = styled('section')(({ theme }) => ({
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

const HeroMediaReveal = styled(MediaReveal)(({ theme }) => ({
  position: 'absolute',
  zIndex: -1,
  inset: 0,
  display: 'flex',
  backgroundColor: theme.palette.primary.main,
}))

function QuranBanner(props) {
  const { mediaProps, renderIndex } = props

  return (
    <HeroRoot>
      {mediaProps && (
        <HeroMediaReveal>
          <Media
            sx={{
              width: 880,
              height: 300,
              margin: 'auto',
            }}
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
        </HeroMediaReveal>
      )}
    </HeroRoot>
  )
}

export default QuranBanner
