import * as React from 'react'
import { styled } from '@mui/system'
import { debounce, IconButton, Typography } from '@mui/material'
import { useGlobalHandlers, useI18n, useRemoteConfig } from '~/contexts'
import { CloseIcon } from '~/components'

export const AppStoreMessageRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: 'var(--cia-header-toolbar-secondary-height)',
  backgroundColor: theme.palette.common.white,
  color: theme.palette.text.pirmary,
}))

const AppStoreMessageContainer = styled('div')({
  display: 'flex',
  width: 'calc(100% - var(--cia-container-spacing) - 28px)',
  overflow: 'hidden',
})

const AppStoreMessageMarquee = styled('div')({
  display: 'flex',
  flexShrink: 0,
  paddingLeft: 'var(--cia-container-spacing)',
})

const AppStoreMessageIconButton = styled(IconButton)({
  position: 'absolute',
  top: '50%',
  right: 'var(--cia-container-spacing)',
  transform: 'translateY(-50%)',
  padding: 0,
})

const ANIMATION_DELAY = 1000
const ANIMATION_SPEED = 20

const AppStoreMessage = React.memo(function AppStoreMessage(props) {
  const { t } = useI18n()
  const { onStoreMessageClose } = useGlobalHandlers()
  const { storeMessage, storeMessageBackgroundColor, storeMessageTextColor } = useRemoteConfig()

  const animationRef = React.useRef(null)
  const containerRef = React.useRef(null)
  const marqueeRef = React.useRef(null)

  const handleAnimate = React.useCallback(() => {
    animationRef.current?.cancel()

    const containerWidth = containerRef.current.clientWidth
    const marqueeWidth = marqueeRef.current.clientWidth
    const deltaX = marqueeWidth - containerWidth

    if (deltaX > 0) {
      animationRef.current = marqueeRef.current.animate(
        { transform: ['translate3d(0, 0, 0)', `translate3d(-${deltaX}px, 0, 0)`] },
        {
          duration: deltaX * ANIMATION_SPEED,
          delay: ANIMATION_DELAY,
          fill: 'forwards',
        },
      )
      animationRef.current.onfinish = () => {
        setTimeout(() => {
          animationRef.current.reverse()
        }, ANIMATION_DELAY)
      }
    }
  }, [])

  React.useEffect(() => {
    handleAnimate()
    const handleResize = debounce(() => {
      handleAnimate()
    })

    window.addEventListener('resize', handleResize)
    return () => {
      handleResize.clear()
      window.removeEventListener('resize', handleResize)
    }
  }, [handleAnimate])

  return (
    <AppStoreMessageRoot
      sx={{
        backgroundColor: storeMessageBackgroundColor?.hex,
        color: storeMessageTextColor?.hex,
      }}
      {...props}
    >
      <AppStoreMessageContainer ref={containerRef}>
        <AppStoreMessageMarquee ref={marqueeRef}>
          <Typography dangerouslySetInnerHTML={{ __html: storeMessage }} variant="body2" />
        </AppStoreMessageMarquee>
      </AppStoreMessageContainer>

      <AppStoreMessageIconButton
        onClick={onStoreMessageClose}
        color="inherit"
        edge="end"
        size="small"
        aria-label={t(__translationGroup)`Dismiss store message`}
      >
        <CloseIcon fontSize="small" />
      </AppStoreMessageIconButton>
    </AppStoreMessageRoot>
  )
})

export default AppStoreMessage
