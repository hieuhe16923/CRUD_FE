// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import petReducer from './reducers/petReducer';
import { saveCartToSession } from '../utils/sessionStorage';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    pets: petReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveCartToSession(state.cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
