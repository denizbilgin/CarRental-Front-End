import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/models/loginModel';
import { PasswordChangeModel } from 'src/app/models/passwordChangeModel';
import { RegisterModel } from 'src/app/models/registerModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl:string="https://localhost:44373/api/";
  jwtHelper:JwtHelperService = new JwtHelperService();
  userName:string;
  userId:number;

  constructor(
    private httpClient:HttpClient,
    private localStorageService:LocalStorageService
  ) {
      this.setUserId()
    }

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

  setUserId(){
    if (this.localStorageService.get("token")) {
      var decoded = this.jwtHelper.decodeToken(this.localStorageService.get("token"));
      var propUserId = Object.keys(decoded).filter(x => x.endsWith("/nameidentifier"))[0];
      this.userId = Number(decoded[propUserId]);
    }
  }

  getUserId():number{
    return this.userId;
  }

  changePassword(passwordChangeModel:PasswordChangeModel):Observable<ResponseModel>{
    let newPath = this.apiUrl + "auth/changepassword";
    return this.httpClient.post<ResponseModel>(newPath,passwordChangeModel);
  }
}
