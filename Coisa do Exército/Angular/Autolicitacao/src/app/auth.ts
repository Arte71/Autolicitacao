import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private _registerUrl = "http://localhost:27071/api/register"
  private _loginUrl = "http://localhost:27071/api/login"

  constructor(private http: HttpClient) { }

  registerUser(user: any) {
    return this.http.post<any>(this._registerUrl, user)
}
  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user)
}
  loggedIn() {
    return !!localStorage.getItem('token') //verificar se o token existe no localStorage (valor booleano)
  }
}
