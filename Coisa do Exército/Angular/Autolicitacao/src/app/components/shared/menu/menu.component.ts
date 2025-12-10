import { Component } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { Auth } from '../../../services/auth';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-menu',

  imports: [MenuItemComponent, NgIf], 
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  
  constructor(readonly _auth: Auth) {}

}