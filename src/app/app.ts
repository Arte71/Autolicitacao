import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageComponent } from './components/shared/page/page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PageComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('projeto-novo');
}
