import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';

const Store = configureStore({
  reducer: {
    user: userSlice,
    // Add other reducers if needed
  },
});

export default Store;