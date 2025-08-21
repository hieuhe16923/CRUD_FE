import { createReducer, on } from '@ngrx/store';
import * as PetActions from './pet.actions';
import { PetType } from '../../../core/models/interface/pet.interface';

export interface PetState {
    pets: PetType[];
    loading: boolean;
    error: string | null;
}

export const initialState: PetState = {
    pets: [],
    loading: false,
    error: null,
};

export const petReducer = createReducer(
    initialState,

    on(PetActions.fetchPetsByStatus, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(PetActions.fetchPetsByStatusSuccess, (state, { pets }) => ({
        ...state,
        loading: false,
        pets
    })),

    on(PetActions.fetchPetsByStatusFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
