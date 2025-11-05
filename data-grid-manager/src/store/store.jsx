import { configureStore } from '@reduxjs/toolkit';
import dataGridReducer from '../features/dataGridSlice';

export const store = configureStore({
  reducer: {
    dataGrid: dataGridReducer, 
  },
});