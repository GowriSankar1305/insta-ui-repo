import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TRUE } from '../constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient : HttpClient) { }

  fetchUserAccount()  {
    return this.httpClient.post(environment.host + 'account/getDetails',{},{headers : {INTERCEPT:TRUE}})
  }
}
