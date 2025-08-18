import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Pet } from '../../dto/pets.dto';
import { PetService } from '../../services/pet.service';

interface PetsState {
  list: Pet[];
  loading: boolean;
  error: string | null;
}

// ✅ tạo thunk để wrap PetService
export const fetchPets = createAsyncThunk<Pet[], void, { rejectValue: string }>(
  'pets/fetchPets',
  async (_, thunkAPI) => {
    try {
      return await PetService.fetchPets();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || 'Lỗi không xác định');
    }
  }
);

const petSlice = createSlice({
  name: 'pets',
  initialState: {
    list: [] as Pet[],
    loading: false,
    error: null,
  } as PetsState,
  reducers: {
    buyPet: (state, action) => {
      // chỉ giữ lại logic chọn pet thôi
      const pet = action.payload;
      // dispatch sang orderSlice để thêm cart
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPets.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || 'Lỗi không xác định';
      });
  },
});

export const { buyPet } = petSlice.actions;
export default petSlice.reducer;
