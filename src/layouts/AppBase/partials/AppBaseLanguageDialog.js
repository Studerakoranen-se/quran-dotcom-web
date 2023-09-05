import * as React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useGlobalHandlers, useGlobalState, useI18n } from '~/contexts'
import { CloseIcon } from '~/components'

const TransitionComponent = React.forwardRef(function TransitionComponent(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const AppBaseLanguageDialog = React.memo(function AppBaseLanguageDialog(props) {
  const { isLanguageMenuOpen, ...other } = props

  const { onLanguageMenuClose } = useGlobalHandlers()
  const { t } = useI18n()

  const isBreakpointUp = useMediaQuery((theme) => theme.breakpoints.up('sm'))

  // const handleCountryChange = React.useCallback((event) => {
  //   updateCountry(event.target.value)
  // }, [])

  // const handleLanguageChange = React.useCallback((event) => {
  //   updateLanguage(event.target.value)
  // }, [])

  return (
    <Dialog
      TransitionComponent={!isBreakpointUp ? TransitionComponent : undefined}
      fullScreen={!isBreakpointUp}
      onClose={onLanguageMenuClose}
      open={isLanguageMenuOpen}
      maxWidth="xs"
      fullWidth
      aria-labelledby="cia-language-menu-title"
      {...other}
    >
      <DialogTitle variant="subtitle1" id="cia-language-menu-title">
        {t(__translationGroup)`Choose country and shipping`}

        {onLanguageMenuClose && (
          <IconButton
            sx={{
              position: 'absolute',
              right: (theme) => theme.spacing(1),
              top: 5,
            }}
            onClick={onLanguageMenuClose}
            color="inherit"
            aria-label={t(__translationGroup)`Close language menu`}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" paragraph>
          {t(
            __translationGroup,
          )`Please select the country to which your order will be sent. This will give you accurate pricing, delivery times and shipping costs for your destination.`}
        </Typography>

        {/* <TextField
          onChange={handleCountryChange}
          value={location.country}
          label={t(__translationGroup)`Choose country`}
          margin="normal"
          fullWidth
          select
          id="cia-language-menu-country" // Makes `label` and `helperText` accessible for screen readers.
        >
          {countries.map((country) => (
            <MenuItem key={country.country} value={country.country}>
              {country.name}
            </MenuItem>
          ))}
        </TextField> */}

        {/* <TextField
          onChange={handleLanguageChange}
          value={location?.language?.language}
          label={t(__translationGroup)`Choose language`}
          margin="normal"
          fullWidth
          select
          id="cia-language-menu-language" // Makes `label` and `helperText` accessible for screen readers.
        >
          {languages.map((language) => (
            <MenuItem key={language} value={language.language}>
              {language.name}
            </MenuItem>
          ))}
        </TextField> */}
      </DialogContent>
    </Dialog>
  )
})

AppBaseLanguageDialog.propTypes = {
  isLanguageMenuOpen: PropTypes.bool,
}

function AppBaseLanguageDialogContainer(props) {
  const { isLanguageMenuOpen } = useGlobalState()

  return <AppBaseLanguageDialog isLanguageMenuOpen={isLanguageMenuOpen} {...props} />
}

export default AppBaseLanguageDialogContainer
