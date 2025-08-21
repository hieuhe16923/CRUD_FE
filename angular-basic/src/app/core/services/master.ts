import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Constant } from '../constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class Master {

  constructor(private http: HttpClient) { }

  getPetByStatus(status: string) {
    return this.http.get(`${environment.apiUrl}${Constant.API_METHODS.PET.GET_PET_BY_STATUS}?status=${status}`);
  }

}
