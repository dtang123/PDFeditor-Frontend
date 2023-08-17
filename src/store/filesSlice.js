import { createSlice } from '@reduxjs/toolkit';

const fileSlice = createSlice({
  name: 'files',
  initialState: { 
    fileObjs: [],
    fileObjsMap: {}
  },

  reducers: {
    setFiles: (state, action) => {
      state.fileObjs = action.payload;
    },
    setFilesMap: (state, action) => {
        var new_map = {}
        action.payload.map((file) => {
          new_map[file._id] = {
            "fileName": file.fileName,
            "lastOpened": file.lastOpened,
            "file": file.file
          }
        })
        state.fileObjsMap = new_map
        
      }
    }
  },
);


export const { setFiles, setFilesMap } = fileSlice.actions;
export default fileSlice.reducer;
export const selectFiles = (state) => state.files.files;