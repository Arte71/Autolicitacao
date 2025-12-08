// src/app/components/shared/menu/menu.component.ts

import { Component } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { Auth } from '../../../services/auth';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',

  imports: [MenuItemComponent, NgIf, RouterLink], 
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  
  constructor(readonly _auth: Auth) {}

}