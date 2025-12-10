import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { MenuComponent } from '../../components/shared/menu/menu.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register implements OnInit {

  registerUserData = {
    username: '',
    email: '',
    nome: '',
    password: '',
    roles: '',
    orgao: ''
  }
  constructor(private _auth: Auth,
              private _router: Router
  ) { }
  ngOnInit(): void {
}

notNullOrUndefined(value: any): boolean {
    return value !== null && value !== undefined;
  }

validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

  validarSenha(senha: string): boolean {
  const regex = /^(?=.*[0-9]).{8,}$/;
  return regex.test(senha);
}

  registerUser() {
  if (!this.notNullOrUndefined(this.registerUserData.nome) || this.registerUserData.nome.trim() === '' || this.registerUserData.orgao.trim() === '' || !this.notNullOrUndefined(this.registerUserData.orgao)) {
    alert("Dados vazios ou inválidos.");
    return;
  } else if (!this.validarEmail(this.registerUserData.email)) {
    alert("Email inválido.");
    return;
  } else if (!this.validarSenha(this.registerUserData.password)) {
    alert("A senha deve ter no mínimo 8 caracteres e ao menos um número.");
    return;
  }
    this._auth.registerUser(this.registerUserData).subscribe(
      (res: any) =>{
        console.log(res)
        alert("Usuário registrado com sucesso!");
        this._router.navigate(['/']);
      },
      (err: any) => console.log(err)
    )
  }}
