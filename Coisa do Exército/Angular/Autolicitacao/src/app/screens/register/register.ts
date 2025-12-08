import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register implements OnInit {

  registerUserData = {
    username: '',
    email: '',
    password: '',
    roles: '',
    orgao: ''
  }
  constructor(private _auth: Auth,
              private _router: Router
  ) { }
  ngOnInit(): void {

}
  registerUser() {
    this._auth.registerUser(this.registerUserData).subscribe(
      (res: any) =>{
        console.log(res)
        this._router.navigate(['/']);
      },
      (err: any) => console.log(err)
    )
  }}
