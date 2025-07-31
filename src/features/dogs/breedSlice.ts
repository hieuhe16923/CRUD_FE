import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Breed {
	id: string;
	attributes: {
		description: string;
		female_weight: {
			min: number;
			max: number;
		};
		hypoallergenic: boolean;
		life: {
			min: number;
			max: number;
		};
		male_weight: {
			min: number;
			max: number;
		};
		name: string;
	};
	type: string;
}

export interface BreedState {
	breeds: Breed[];
	loading: boolean;
	error: string | null;
}

const initialState: BreedState = {
	breeds: [],
	loading: false,
	error: null,
};

export const fetchBreeds = createAsyncThunk(
	"breeds/fetchBreeds",
	async ({ page, size }: { page: number; size: number }) => {
		const res = await fetch(
			`https://dogapi.dog/api/v2/breeds?page[number]=${page}&page[size]=${size}`
		);
		const data = await res.json();
		return data.data as Breed[];
	}
);

const breedSlice = createSlice({
	name: "breeds",
	initialState,
	reducers: {
		filterBreeds: (state, action) => {
			state.breeds.filter((breed) => breed.attributes.name === action.payload);
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchBreeds.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchBreeds.fulfilled, (state, action) => {
				state.loading = false;
				state.breeds = action.payload;
			})
			.addCase(fetchBreeds.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Failed to fetch breeds";
			});
	},
});

export default breedSlice.reducer;
