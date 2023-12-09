import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../types/login';
import { INTERCEPT, TRUE } from '../constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   
   constructor(private httpClient : HttpClient) {
   }

   loginUser(req : LoginRequest)  {
      return this.httpClient.post(environment.host + 'auth/login',req,{headers : {'userName':req.userName} });
   }

   logOutUser() {
      return this.httpClient.post(environment.host + 'auth/logout',{},{ headers : {INTERCEPT:TRUE} });
   }
}
