import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Constant } from '../constant/Constant';
import { PetType } from '../models/interface/pet.interface';

@Injectable({
    providedIn: 'root'
})
export class PetService {

    constructor(private http: HttpClient) {
        console.log('PetService initialized'); // Debug log
    }

    getPetsByStatus(status: string) {
        return this.http.get<PetType[]>(`${environment.apiUrl}${Constant.MODULE_NAME.PET}/${Constant.API_METHODS.PET.GET_PET_BY_STATUS}?status=${status}`);
    }

}
