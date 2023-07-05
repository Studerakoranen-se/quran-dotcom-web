import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
  },
  reducers: {
    createUser: (state, data) => {
      state.user = data.payload;
    },
    removeUser: (state) => {
      state.user = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { createUser, removeUser } = userSlice.actions;

export default userSlice;
