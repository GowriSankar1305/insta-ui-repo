import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { TokenService } from './services/token.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const tokenservice = inject(TokenService);
//  const 
  return false;
};
