import { createSlice } from '@reduxjs/toolkit';

const fileSlice = createSlice({
  name: 'files',
  initialState: { fileObjs: [] },
  reducers: {
    setFiles: (state, action) => {
      state.fileObjs = action.payload;
    },
  },
});

export const { setFiles } = fileSlice.actions;
export default fileSlice.reducer;
export const selectFiles = (state) => state.files.files;