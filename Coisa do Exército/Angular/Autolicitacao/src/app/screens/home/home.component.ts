import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { TitleComponent } from '../../components/shared/title/title.component';

@Component({
  selector: 'app-home',
  imports: [TitleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

}
