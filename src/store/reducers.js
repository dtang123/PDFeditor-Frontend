import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import filesSlice from './filesSlice';

const Store = configureStore({
  reducer: {
    user: userSlice,
    files: filesSlice,
    // Add other reducers if needed
  },
});

export default Store;