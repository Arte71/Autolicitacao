import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Auth } from './auth';


@Injectable({
  providedIn: 'root',
})
export class RoleGuard {
  constructor(private _auth: Auth) {}
canActivate(route: ActivatedRouteSnapshot): boolean {
  const userRole = this._auth.getRolesFromToken();
  return route.data['roles'].includes(userRole);
}}
