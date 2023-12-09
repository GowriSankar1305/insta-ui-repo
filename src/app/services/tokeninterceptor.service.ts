import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { TOKEN, BEARER, INTERCEPT, TRUE, LOGIN_TKN, UNAME, USR_ACC_ID, USR_PROFILE_ID } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get(INTERCEPT) !== null && req.headers.get(INTERCEPT) === TRUE) {
      console.log('========== intercepting request ============');
      let authToken = this.tokenService.fetchToken(TOKEN);
      req = req.clone({
        setHeaders: {
          'Authorization': BEARER + authToken,
          'loginToken': this.tokenService.fetchToken(LOGIN_TKN),
          'userName': this.tokenService.fetchToken(UNAME),
          'userAccountId': this.tokenService.fetchToken(USR_ACC_ID),
          'userProfileId': this.tokenService.fetchToken(USR_PROFILE_ID)
        }
      });
      if (authToken === null || authToken.trim() === "") {
        this.tokenService.clearLocalStorage();
        this.router.navigate(['/user/login']);
      }
    }
    return next.handle(req).pipe(
      catchError((error : HttpErrorResponse) => {
        if(error.status === 401)  {
          this.tokenService.clearLocalStorage();
          this.router.navigate(['/user/login']);
        }
        return throwError(error);
      })
    );
  }
}
