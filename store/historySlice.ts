import { createSlice } from "@reduxjs/toolkit";

export const historySlice = createSlice({
  name: "history",
  initialState: {
    recentSurahs: <any>[],
  },
  reducers: {
    addToHistory: (state, action) => {
      if (state.recentSurahs.length == 0) {
        state.recentSurahs.push(action.payload);
      }
      let exist = false;
      state.recentSurahs.forEach((rs: any) => {
        if (rs.id == action.payload.id) {
          exist = true;
        }
      });
      if (!exist) {
        state.recentSurahs.push(action.payload);
      }
      if (state.recentSurahs.length > 6) {
        state.recentSurahs.shift();
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToHistory } = historySlice.actions;

export default historySlice;
