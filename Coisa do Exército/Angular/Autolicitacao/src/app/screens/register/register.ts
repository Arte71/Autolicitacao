import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

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
    roles: ''
  }
  constructor(private _auth: Auth) { }
  ngOnInit(): void {

}
  registerUser() {
    this._auth.registerUser(this.registerUserData).subscribe(
      (res: any) => console.log(res),
      (err: any) => console.log(err)
    )
  }}
