import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  get(value:string){
    var result = localStorage.getItem(value);
    if (result) {
      return result
    }else{
      return undefined
    }
  }

  add(key:string,value:string){
    localStorage.setItem(key,value);
  }

  delete(key:string){
    localStorage.removeItem(key);
  }

  clear(){
    localStorage.clear();
  }
}
