import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private _auth: Auth, private _router: Router) { }

  canActivate(): boolean {
    if (this._auth.loggedIn()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }}
