// src/app/screens/licitacoes/licitacoes.ts (CÓDIGO MODERNO E ADAPTADO)

import { Component, inject, signal } from '@angular/core'; // Usando 'signal'
import { LicitacoesService } from '../../services/licitacoes.service';
import { Licitacao } from '../../model/licitacoes.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { MenuComponent } from '../../components/shared/menu/menu.component';
import { toSignal } from '@angular/core/rxjs-interop'; // Importação moderna

@Component({
  selector: 'app-licitacoes',
  standalone: true,
  imports: [CommonModule, RouterLink, MenuComponent], 
  templateUrl: './licitacoes.html',
  styleUrls: ['./licitacoes.scss'],
})
export class Licitacoes {
  
  private readonly _auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly licitacoesService = inject(LicitacoesService); 
  
  
  private readonly currentUggId = this._auth.getOrgaoFromToken();

  
  private allLicitacoesSignal = toSignal(this.licitacoesService.getAll(), { initialValue: [] as Licitacao[] });

 
  licitacoes = signal<Licitacao[]>([]);

  constructor() {
    
    this.applyFilter();
  }

  private applyFilter(): void {
    if (!this.currentUggId) {
      console.error('ID do Órgão do usuário (Ugg) não encontrado.');
      this.licitacoes.set([]);
      return;
    }


    const all = this.allLicitacoesSignal();
    

    const filtered = all.filter(licitacao => 
      licitacao.IdUgg !== this.currentUggId 
    );
    
    this.licitacoes.set(filtered);
  }
  
 
  formatarNomeTabela(licitacao: Licitacao): string {
  
    return licitacao._id;
  }


  selectLicitacao(licitacao: Licitacao): void {
    const nomeTabela = this.formatarNomeTabela(licitacao);
    
    console.log('ID da Licitação (Payload para a rota):', nomeTabela);
  }
}