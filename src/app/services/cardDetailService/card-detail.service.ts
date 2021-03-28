import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardModel } from 'src/app/models/cardModel';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CardDetailService {
  apiUrl:string="https://localhost:44373/api/";

  constructor(
    private httpClient:HttpClient
  ) { }

  
  saveCard(cardModel:CardModel):Observable<ResponseModel>{
    let newPath = this.apiUrl + "carddetails/addcard";
    return this.httpClient.post<ResponseModel>(newPath,cardModel);
  }

  getCardsByUserId(userId:number):Observable<ListResponseModel<CardModel>>{
    let newPath = this.apiUrl + "carddetails/getcardsbyuserid?userId=" + userId;
    return this.httpClient.get<ListResponseModel<CardModel>>(newPath);
  }
}
