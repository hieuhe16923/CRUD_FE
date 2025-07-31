import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBreeds } from '../api/api';

const breedsSlice = createSlice({
  name: 'breeds',
  initialState: {
    breeds: [],
    meta: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBreeds.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchBreeds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.breeds = action.payload.breeds;
        state.meta = action.payload.meta;
      })
      .addCase(fetchBreeds.rejected, state => {
        state.status = 'error';
      });
  },
});

export default breedsSlice.reducer;
