
// navbar.js
import { createSlice } from '@reduxjs/toolkit';

export const candidateSlice = createSlice({
  name: 'candidate',
  initialState: { value: {} },
  reducers: {
    info: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { info } = candidateSlice.actions;
export default candidateSlice.reducer;
