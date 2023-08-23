import { createSlice } from '@reduxjs/toolkit';

const fileSlice = createSlice({
  name: 'files',
  initialState: { 
    fileObjs: [],
    fileObjsMap: {}
  },

  reducers: {
    setFiles: (state, action) => {
      return { ...state, fileObjs: action.payload };
    },
    setFilesMap: (state, action) => {
        var new_map = {}
        action.payload.map((file) => {
          if (file.textBoxes) {
            new_map[file._id] = {
              "fileName": file.fileName,
              'user': file.user,
              "lastOpened": file.lastOpened,
              "file": file.file,
              'textBoxes': file.textBoxes
            }
          } else {
            new_map[file._id] = {
              "fileName": file.fileName,
              'user': file.user,
              "lastOpened": file.lastOpened,
              "file": file.file
            }
          }
        })
        return { ...state, fileObjsMap: new_map };
        
      }
    }
  },
);


export const { setFiles, setFilesMap } = fileSlice.actions;
export default fileSlice.reducer;
export const selectFiles = (state) => state.files.files;