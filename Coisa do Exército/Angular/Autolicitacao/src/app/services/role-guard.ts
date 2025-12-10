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
  const permissao = route.data['roles'].includes(userRole);
  if (!permissao) {
    alert('Acesso negado. Você não tem permissão para acessar esta página.');
  }
  return permissao;
}}
