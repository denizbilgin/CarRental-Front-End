import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Customer } from 'src/app/models/customer';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { CustomerAddModel } from 'src/app/models/customerAddModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl:string="https://localhost:44373/api/";

  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl + "customers/getall";
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerByUserId(userId:number):Observable<SingleResponseModel<Customer>>{
    let newPath = this.apiUrl + "customers/getbyuserid?id=" + userId;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath)
  }

  update(customer:Customer):Observable<ResponseModel>{
    let newPath = this.apiUrl + "customers/update";
    return this.httpClient.post<ResponseModel>(newPath,customer);
  }

  add(customer:CustomerAddModel):Observable<SingleResponseModel<Customer>>{
    let newPath = this.apiUrl + "customers/add";
    return this.httpClient.post<SingleResponseModel<Customer>>(newPath,customer);
  }
}
