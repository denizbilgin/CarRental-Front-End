import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  get(value:string){
    return localStorage.getItem(value);
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
