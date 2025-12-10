import { Component, signal, inject, computed } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth } from './services/auth';
import { PageComponent } from './components/shared/page/page.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { filter, map } from 'rxjs/operators'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PageComponent, MenuComponent], 
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
  protected readonly title = signal('projeto-novo');

  private readonly router = inject(Router);

  
  private url = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(event => event.urlAfterRedirects) 
    ), 
    { initialValue: this.router.url }
  );

  readonly showMenu = signal(false);

  
  readonly isLoginPage = computed(() => {
    return this.url() === '/login'; 
  });

 
  readonly displayMenu = computed(() => {
    return !this.isLoginPage() && this.showMenu();
  });

  toggleMenu() {
    this.showMenu.update(value => !value);
  }

  constructor(protected _auth: Auth) {
  
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.showMenu()) {
        this.showMenu.set(false);
      }
    });
  }
}