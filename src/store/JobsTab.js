
// navbar.js
import { createSlice } from '@reduxjs/toolkit';

export const tabSlice = createSlice({
  name: 'tab',
  initialState: { value: {'tab':6} },
  reducers: {
    info: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { info } = tabSlice.actions;
export default tabSlice.reducer;
