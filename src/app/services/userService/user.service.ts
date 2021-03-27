import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { UserModel } from 'src/app/models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl:string="https://localhost:44373/api/";

  constructor(
    private httpClient:HttpClient
  ) { }

  update(userModel:UserModel):Observable<ResponseModel>{
    let newPath = this.apiUrl + "users/updateinfo" 
    return this.httpClient.post<ResponseModel>(newPath,userModel);
  }

  getByUserId(id:number):Observable<SingleResponseModel<UserModel>>{
    let newPath = this.apiUrl + "users/getbyid?id=" + id;
    return this.httpClient.get<SingleResponseModel<UserModel>>(newPath);
  }
}
