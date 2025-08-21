import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PetState } from './pet.reducer';

export const selectPetState = createFeatureSelector<PetState>('pets');

export const selectPets = createSelector(
    selectPetState,
    (state) => state.pets
);

export const selectPetLoading = createSelector(
    selectPetState,
    (state) => state.loading
);

export const selectPetError = createSelector(
    selectPetState,
    (state) => state.error
);
