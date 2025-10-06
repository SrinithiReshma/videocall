import { configureStore } from '@reduxjs/toolkit';
import callReducer from './callSlice';

export const store = configureStore({
  reducer: {
    calls: callReducer
  }
});
