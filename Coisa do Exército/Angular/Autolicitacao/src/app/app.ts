import { Component, signal, inject, computed } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth } from './services/auth';
import { PageComponent } from './components/shared/page/page.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { filter, map } from 'rxjs/operators'; // 🌟 NOVO: Necessário para pipe

@Component({
  selector: 'app-root',
  standalone: true, // 🌟 GARANTINDO que standalone esteja presente, necessário para o inject
  imports: [RouterOutlet, PageComponent, MenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
  protected readonly title = signal('projeto-novo');

  // 🌟 NOVO: Injeção do Router para lógica reativa
  private readonly router = inject(Router);

  // 🌟 NOVO: Converte o Observable de eventos do Router para um Signal
  private url = toSignal(
    this.router.events.pipe(
      // Filtra para garantir que só navegamos após a conclusão da navegação
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      // Mapeia o evento para a URL atual
      map(event => event.urlAfterRedirects) 
    ), 
    // Inicializa com a URL atual (necessário para o primeiro carregamento)
    { initialValue: this.router.url }
  );

  // 🌟 NOVO: Computed Signal: Reage à mudança de URL
  readonly showMenu = computed(() => {
    const currentUrl = this.url();
    
    // Retorna true se a URL não for login ou register
    return !currentUrl.includes('/login');
  });

  constructor(protected _auth: Auth) {
  }
}