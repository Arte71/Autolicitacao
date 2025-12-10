import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor(private _auth: Auth, private _router: Router) { }

  canActivate(): boolean {
    const token = this._auth.getToken();
    if (!token || token === 'null' || token === '') {
      this._router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }}
