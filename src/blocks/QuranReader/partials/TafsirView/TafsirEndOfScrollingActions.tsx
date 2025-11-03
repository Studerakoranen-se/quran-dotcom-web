import { Box, Button } from '@mui/material'
import { useI18n } from '~/contexts'

type TafsirEndOfScrollingActionsProps = {
  hasNextVerseGroup: boolean
  hasPrevVerseGroup: boolean
  onNextButtonClicked: () => void
  onPreviousButtonClicked: () => void
}

const TafsirEndOfScrollingActions = ({
  hasNextVerseGroup,
  hasPrevVerseGroup,
  onNextButtonClicked,
  onPreviousButtonClicked,
}: TafsirEndOfScrollingActionsProps) => {
  const { t } = useI18n()
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBlockStart: '2rem' }}>
      <div>
        {hasPrevVerseGroup && (
          <Button variant="contained" onClick={onPreviousButtonClicked}>
            {t('player').translate('previous-ayah')}
          </Button>
        )}
      </div>
      <div>
        {hasNextVerseGroup && (
          <Button variant="contained" onClick={onNextButtonClicked}>
            {t('player').translate('next-ayah')}
          </Button>
        )}
      </div>
    </Box>
  )
}

export default TafsirEndOfScrollingActions
