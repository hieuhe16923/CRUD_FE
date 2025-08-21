import { Routes } from '@angular/router';
import { PetList } from './pages/pet/pet-list/pet-list';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "pet-list",
        pathMatch: "full"
    },
    {
        path: "pet-list",
        component: PetList
    }
];
