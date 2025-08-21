import { createAction, props } from '@ngrx/store';
import { PetType } from '../../../core/models/interface/pet.interface';

// Async actions (like createAsyncThunk)
export const fetchPetsByStatus = createAction(
    '[Pet] Fetch Pets By Status',
    props<{ status: string }>()
);

export const fetchPetsByStatusSuccess = createAction(
    '[Pet] Fetch Pets By Status Success',
    props<{ pets: PetType[] }>()
);

export const fetchPetsByStatusFailure = createAction(
    '[Pet] Fetch Pets By Status Failure',
    props<{ error: string }>()
);
