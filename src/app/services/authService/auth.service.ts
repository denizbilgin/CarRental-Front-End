import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/models/loginModel';
import { RegisterModel } from 'src/app/models/registerModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl:string="https://localhost:44373/api/";

  constructor(
    private httpClient:HttpClient,
    private localStorageService:LocalStorageService
  ) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl + "auth/login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel);
  }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl + "auth/register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel);
  }

  isAuthenticated(){
    if (this.localStorageService.get("token")) {
      return true;
    } else {
      return false;
    }
  }
}
