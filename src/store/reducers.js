import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const Store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers if needed
  },
});

export default Store;