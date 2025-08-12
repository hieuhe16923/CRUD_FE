// src/redux/slices/petSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PetService } from "../../services/PetService";
import { PetType } from "../../types/Pet";

export const fetchPetsByStatus = createAsyncThunk<
    PetType[],
    string,
    { rejectValue: string }
>(
    "pets/fetchByStatus",
    async (status, { rejectWithValue }) => {
        try {
            const res = await PetService.findPetByStatus(status);
            console.log(res)
            return res as unknown as PetType[];
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

interface PetState {
    pets: PetType[];
    loading: boolean;
    error: string | null;
}

const initialState: PetState = {
    pets: [],
    loading: false,
    error: null,
};

const petSlice = createSlice({
    name: "pets",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPetsByStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPetsByStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.pets = action.payload;
            })
            .addCase(fetchPetsByStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default petSlice.reducer;
