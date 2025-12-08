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

  logOut() {
    localStorage.removeItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getUserNameFromToken() {
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    return payload.username;
  }
  
  getUserName() {
  return localStorage.getItem('username');
}

getRolesFromToken() {
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    return payload.roles;
  }
  
 getRoles() {
  return localStorage.getItem('roles');
 }

  currentUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    return payload._id; 
  }
  
  getUserId() {
  return localStorage.getItem('_id');
}
}
 