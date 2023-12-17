
// navbar.js
import { createSlice } from '@reduxjs/toolkit';

export const navSlice = createSlice({
  name: 'navbar',
  initialState: { value: { collapse: false } },
  reducers: {
    info: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { info } = navSlice.actions;
export default navSlice.reducer;
