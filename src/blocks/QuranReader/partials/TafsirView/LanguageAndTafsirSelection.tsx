import { Box, Button, MenuItem, Skeleton, TextField } from '@mui/material'
import classNames from 'classnames'
import SpinnerContainer from '~/components/SpinnerContainer'
import { TafsirsResponse } from '~/types/ApiResponses'
import { getLocaleNameByFullName } from '~/utils/locale'
import styles from './TafsirView.module.scss'

type LanguageAndTafsirSelectionProps = {
  selectedTafsirIdOrSlug: number | string
  onTafsirSelected: (tafsirId: number, tafsirSlug: string) => void
  selectedLanguage: string
  onSelectLanguage: (event: React.ChangeEvent<{ value: unknown }>) => void
  languageOptions: string[]
  data?: TafsirsResponse
  isLoading: boolean
}
const LanguageAndTafsirSelection = ({
  selectedTafsirIdOrSlug,
  onTafsirSelected,
  selectedLanguage,
  onSelectLanguage,
  languageOptions,
  data,
  isLoading,
}: LanguageAndTafsirSelectionProps) => {
  if (!data) {
    return (
      <Skeleton className={classNames(styles.tafsirSkeletonItem, styles.tafsirSelectionSkeleton)} />
    )
  }

  return (
    <SpinnerContainer isLoading={isLoading}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mb: 2,
          gap: 2,
          width: '100%',
        }}
      >
        <Box>
          <TextField
            select
            className={styles.languageSelection}
            id="lang-selection"
            name="lang-selection"
            onChange={onSelectLanguage}
            value={selectedLanguage}
          >
            {languageOptions.map((lng, idx) => (
              <MenuItem key={idx} value={lng}>
                {getLocaleNameByFullName(lng)}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box sx={{}}>
          {data &&
            data.tafsirs
              ?.filter(
                (tafsir) =>
                  tafsir.languageName === selectedLanguage ||
                  selectedTafsirIdOrSlug === tafsir.slug ||
                  Number(selectedTafsirIdOrSlug) === tafsir.id,
              )
              .map((tafsir) => {
                const selected =
                  selectedTafsirIdOrSlug === tafsir.slug ||
                  Number(selectedTafsirIdOrSlug) === tafsir.id
                return (
                  <Button
                    onClick={() => onTafsirSelected(tafsir.id as number, tafsir.slug as string)}
                    // variant="contained"
                    // variant={selected ? 'contained' : 'outlined'}
                    key={tafsir.id}
                    sx={{
                      textTransform: 'capitalize',
                      padding: '0.8rem 1.2rem',
                      ...(selected
                        ? {
                            backgroundColor: (theme) => theme.palette.common.white,
                            color: (theme) => theme.palette.primary.main,
                            '&:hover': {
                              backgroundColor: (theme) => theme.palette.common.white,
                            },
                          }
                        : {
                            backgroundColor: (theme) => theme.palette.primary.light,
                            color: (theme) => theme.palette.text.primary,
                            border: (theme) => `1px solid ${theme.palette.divider}`,
                            '&:hover': {
                              backgroundColor: (theme) => theme.palette.action.hover,
                            },
                          }),
                      marginInlineEnd: '0.5rem',
                      marginBlockEnd: '0.5rem',
                    }}
                  >
                    {tafsir.translatedName.name}
                  </Button>
                )
              })}
        </Box>
      </Box>
    </SpinnerContainer>
  )
}

export default LanguageAndTafsirSelection
