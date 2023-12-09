import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../types/user';
import { Yrmn } from '../types/years-months';
import { Days } from '../types/days';
import { INTERCEPT,TRUE } from '../constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) {}

  saveOrUpdateUser(user: User) {
     return this.httpClient.post(
      environment.host + 'user/save-or-update',user,{ headers : {INTERCEPT:TRUE}});
   }

   fetchUser(reqData: JSON)  {
     return this.httpClient.post(
      environment.host + 'user/get-user',reqData,{ headers : {INTERCEPT:TRUE}});
   }

   fetchYearsAndMonths()  {
    return this.httpClient.get<Yrmn>(environment.host + 'user/fetch-yrs-mnths');
   }

   fetchDays(reqData: any)  {
    return this.httpClient.post<Days>(environment.host + 'user/fetch-days',reqData);
   }
}
