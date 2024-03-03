import * as React from 'react'
import { useColorScheme } from '@mui/material/styles'
import { IconButton } from '@mui/material'
import { ThemeIcon, ThemeMoonIcon } from '~/components'

// ModeSwitcher is an example interface for toggling between modes.
// Material UI does not provide the toggle interface—you have to build it yourself.
const ModeSwitcher = () => {
  const { mode, setMode } = useColorScheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // for server-side rendering
    // learn more at https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
    return null
  }

  return (
    <IconButton
      size="small"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      {/* 'Turn dark' : 'Turn light' */}
      {mode === 'light' ? <ThemeMoonIcon fontSize="small" /> : <ThemeIcon fontSize="small" />}
    </IconButton>
  )
}

export default ModeSwitcher
