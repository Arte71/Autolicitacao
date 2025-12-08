import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private platformId = inject(PLATFORM_ID);

  private safeLocalStorageGet(key: string): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem(key) : null;
  }

  private readonly _token = signal<string | null>(this.safeLocalStorageGet('token'));
  readonly token = this._token.asReadonly();

  private _registerUrl = "http://localhost:27071/api/register";
  private _loginUrl = "http://localhost:27071/api/login";

  constructor(private http: HttpClient) {}

  registerUser(user: any) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user);
  }

  loggedIn() {
    return this._token() !== null;
  }

  setToken(token: string) {
    this._token.set(token);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  logOut() {
    this._token.set(null);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  getToken() {
    return this._token();
  }

  private decodeToken(): any | null {
    const token = this._token();
    if (!token) return null;

    try {
      const payload = window.atob(token.split('.')[1]);
      return JSON.parse(payload);
    } catch {
      return null;
    }
  }

  getUserNameFromToken() {
    return this.decodeToken()?.username ?? null;
  }

  getRolesFromToken() {
    return this.decodeToken()?.roles ?? null;
  }

  currentUserId() {
    return this.decodeToken()?.subject ?? null;
  }

  getOrgaoFromToken() {
    return this.decodeToken()?.orgao ?? null;
  }
}
