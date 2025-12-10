import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginUserData = {
    username: '',
    password: ''
  };
  constructor(private _auth: Auth,
              private _router: Router
  ) { }

  ngOnInit(){
    console.log(this.loginUserData);
  }

  notNullOrUndefined(value: any): boolean {
    return value !== null && value !== undefined;
  }

  validarSenha(senha: string): boolean {
  const regex = /^(?=.*[0-9]).{8,}$/;
  return regex.test(senha);
}

  loginUser() {
    if (!this.validarSenha(this.loginUserData.password)) {
    alert("Senha inválida, deve conter no mínimo 8 caracteres e pelo menos um número.");
    return;
  }
    this._auth.loginUser(this.loginUserData).subscribe(
      (res: any) => {
        this._auth.setToken(res.token);
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.username);
        localStorage.setItem('roles', res.roles);
        localStorage.setItem('orgao', res.orgao);
        this._router.navigate(['/']);
      },
      (err: any) => console.log(err)
    )
  }

}
