import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../auth';

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
    password: ''
  };
  constructor(private _auth: Auth) { }
  ngOnInit(): void {

}
  registerUser() {
    this._auth.registerUser(this.registerUserData).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }}
