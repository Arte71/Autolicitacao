import { Component, signal, inject, computed } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth } from './services/auth'; // Mantido do seu código original
import { MenuComponent } from './components/shared/menu/menu.component';
import { filter, map } from 'rxjs/operators'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent], 
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
  protected readonly title = signal('projeto-novo');

  private readonly router = inject(Router);

  // Armazena a URL atual como um Signal
  private url = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(event => event.urlAfterRedirects) 
    ), 
    { initialValue: this.router.url }
  );

  // Sinal de estado para alternar (abrir/fechar) o menu manualmente
  readonly showMenu = signal(false);

  /**
   * Determina se o usuário está na página de login. 
   * (Ajuste '/login' se a rota for diferente, ex: '/')
   */
  readonly isLoginPage = computed(() => {
    return this.url() === '/login'; 
  });

  /**
   * Determina a exibição real do menu lateral.
   * Só é true se NÃO for a página de login E o estado 'showMenu' estiver ativo.
   */
  readonly displayMenu = computed(() => {
    return !this.isLoginPage() && this.showMenu();
  });

  toggleMenu() {
    this.showMenu.update(value => !value);
  }

  constructor(protected _auth: Auth) {
    // Fecha o menu se ele estiver aberto quando uma navegação ocorre (ótimo para mobile)
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.showMenu()) {
        this.showMenu.set(false);
      }
    });
  }
}