import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  addToken(key : string,authToken: string)  {
    localStorage.setItem(key,authToken);
  }

  fetchToken(key : string) : string  {
    if(localStorage.getItem(key) !== null)  {
      return localStorage.getItem(key) as string;
    }
    return '';
  }

  removeToken(key : string) {
    localStorage.removeItem(key);
  }

  clearLocalStorage() {
    localStorage.clear();
  }

}
