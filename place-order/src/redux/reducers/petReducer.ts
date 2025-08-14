// src/redux/reducers/petReducer.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAvailablePets } from '../services/petService';

export interface Pet {
  id: number;
  name: string;
  status: string;
  photoUrls?: string[];
  category?: {
    id: number;
    name: string;
  };
}

interface PetState {
  pets: Pet[];
  loading: boolean;
  error: string | null;
}

const initialState: PetState = {
  pets: [],
  loading: false,
  error: null,
};

export const getPets = createAsyncThunk('pets/getPets', async () => {
  const data = await fetchAvailablePets();
  return data;
});

const petSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPets.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = action.payload;
      })
      .addCase(getPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch pets';
      });
  },
});

export default petSlice.reducer;
