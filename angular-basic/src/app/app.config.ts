import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { petReducer } from './redux/state/pet/pet.reducer';
import { PetEffects } from './redux/state/pet/pet.effects';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ pet: petReducer }),
    provideEffects([PetEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
};
