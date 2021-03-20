import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from 'src/app/models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl:string="https://localhost:44373/api/";

  constructor(private httpClient:HttpClient) { }

  addPayment(payment:Payment){
    let newPath = this.apiUrl + "payments/add";
    this.httpClient.post(newPath,payment).subscribe();
  }
}
