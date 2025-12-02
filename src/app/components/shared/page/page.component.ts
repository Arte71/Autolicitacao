import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-page',
  imports: [MenuComponent, RouterOutlet],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {

}
