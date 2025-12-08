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
    password: '',
    roles: '',
    orgao: ''
  };
  constructor(private _auth: Auth,
              private _router: Router
  ) { }

  ngOnInit(){
    console.log(this.loginUserData);
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.username);
        localStorage.setItem('roles', res.roles);
        localStorage.setItem('orgao', res.orgao);
        this._router.navigate(['/']).then(() => {window.location.reload();});
      },
      (err: any) => console.log(err)
    )
  }

}
