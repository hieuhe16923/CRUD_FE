// src/redux/slices/ordersSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { orderPlace } from '../api/api';

const ordersSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetOrder: state => {
      state.order = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(orderPlace.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderPlace.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(orderPlace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
