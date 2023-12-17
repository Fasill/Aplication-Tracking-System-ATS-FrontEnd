import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {value:{}},
  reducers: {
    info: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { info } = userSlice.actions; // Update to 'info' here
export default userSlice.reducer;