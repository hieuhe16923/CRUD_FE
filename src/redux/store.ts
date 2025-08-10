// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/ordersSlice';
import petReducer from './slices/petsSlice';

export const store = configureStore({
  reducer: {
    order: orderReducer,
    pets: petReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
