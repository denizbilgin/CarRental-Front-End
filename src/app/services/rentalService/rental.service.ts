import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl:string="https://localhost:44373/api/";

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getrentalsdetails";
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  addRental(rental:Rental){
    let newPath = this.apiUrl + "rentals/add";
    this.httpClient.post(newPath,rental).subscribe();
  }

  getRentalsByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
}
