import { createSlice } from '@reduxjs/toolkit'

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    recentSurahs: <any>[],
  },
  reducers: {
    addToHistory: (state, action) => {
      if (state.recentSurahs.length == 0) {
        state.recentSurahs.push(action.payload)
      }
      let exist = false
      state.recentSurahs.forEach((rs: any) => {
        if (rs.id === action.payload.id) {
          exist = true
        }
      })
      if (!exist) {
        state.recentSurahs.push(action.payload)
      }
      if (state.recentSurahs.length > 6) {
        state.recentSurahs.shift()
      }
    },
    updateVerseCount: (state, action) => {
      const { id, verse_count } = action.payload
      // Find the surah with the specified id
      const surahToUpdate = state.recentSurahs.find((surah: any) => surah.id === id)
      if (surahToUpdate) {
        // Update the verse_count for the surah
        surahToUpdate.verses_count = verse_count
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToHistory, updateVerseCount } = historySlice.actions

export default historySlice
