// pet.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PetService } from '../../../core/services/pet.services';
import * as PetActions from './pet.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class PetEffects {
    private actions$ = inject(Actions);
    private petService = inject(PetService);

    loadPets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PetActions.fetchPetsByStatus),
            mergeMap(({ status }) =>
                this.petService.getPetsByStatus(status).pipe(
                    map(pets => PetActions.fetchPetsByStatusSuccess({ pets })),
                    catchError(error =>
                        of(PetActions.fetchPetsByStatusFailure({ error: error.message }))
                    )
                )
            )
        )
    );
}
