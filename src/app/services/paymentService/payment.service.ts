import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/models/payment';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl:string="https://localhost:44373/api/";

  constructor(private httpClient:HttpClient) { }

  addPayment(payment:Payment):Observable<ResponseModel>{
    let newPath = this.apiUrl + "payments/add";
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }

  checkPayment(payment:Payment):Observable<ResponseModel>{
    let newPath = this.apiUrl + "payments/checkpayment";
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }
}
