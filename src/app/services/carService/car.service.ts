import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { CarResponseModel } from 'src/app/models/carResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl:string="https://localhost:44373/api/cars/getcarsdetails";

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<CarResponseModel>{
    return this.httpClient.get<CarResponseModel>(this.apiUrl);
  }
}
