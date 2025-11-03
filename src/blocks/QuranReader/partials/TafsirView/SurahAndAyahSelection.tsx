import { Box, MenuItem, TextField } from '@mui/material'
import { useContext, useMemo } from 'react'
import DataContext from '~/contexts/DataContext'
import { toLocalizedNumber } from '~/utils/locale'
import { generateChapterVersesKeys, getVerseNumberFromKey } from '~/utils/verse'

type SurahAndAyahSelectionProps = {
  selectedChapterId: string
  selectedVerseNumber: string
  onChapterIdChange: (event: React.ChangeEvent<{ value: unknown }>) => void
  onVerseNumberChange: (event: React.ChangeEvent<{ value: unknown }>) => void
  locale: string
}

const SurahAndAyahSelection = ({
  selectedChapterId,
  selectedVerseNumber,
  onChapterIdChange,
  onVerseNumberChange,
  locale,
}: SurahAndAyahSelectionProps) => {
  const chaptersData = useContext(DataContext)

  const verses = generateChapterVersesKeys(chaptersData, selectedChapterId)
  const surahOptions = useMemo(
    () =>
      Object.entries(chaptersData).map(([id, chapter]) => ({
        label: chapter?.transliteratedName,
        value: id,
      })),
    [chaptersData],
  )
  const ayahOptions = useMemo(
    () =>
      verses.map((verseKey) => {
        const verseNumber = getVerseNumberFromKey(verseKey).toString()
        return {
          label: toLocalizedNumber(Number(verseNumber), locale),
          value: verseNumber,
        }
      }),
    [locale, verses],
  )

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
      <TextField
        id="surah-selection"
        name="surah-selection"
        fullWidth
        select
        onChange={onChapterIdChange}
        value={selectedChapterId}
      >
        {surahOptions?.map((surah, idx2) => (
          <MenuItem key={idx2} value={surah.value}>
            {surah.label}
          </MenuItem>
        ))}
      </TextField>

      <Box sx={{ width: 16 }}>
        <TextField
          id="ayah-selection"
          name="ayah-selection"
          onChange={onVerseNumberChange}
          value={selectedVerseNumber}
          select
        >
          {ayahOptions?.map((surah, idx2) => (
            <MenuItem key={idx2} value={surah.value}>
              {surah.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  )
}

export default SurahAndAyahSelection
