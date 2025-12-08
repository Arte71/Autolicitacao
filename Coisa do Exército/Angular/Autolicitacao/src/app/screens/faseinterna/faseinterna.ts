// src/app/screens/faseinterna/faseinterna.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TodosService } from '../../services/todos.service.service';
import { Licitacao } from '../../model/licitacoes.model';
import { MenuComponent } from '../../components/shared/menu/menu.component'; 

@Component({
  selector: 'app-faseinterna',
  standalone: true,
  imports: [CommonModule, RouterLink, MenuComponent], 
  templateUrl: './faseinterna.html',
  styleUrl: './faseinterna.scss',
})
export class Faseinterna implements OnInit {

  // Injeção do serviço centralizado de estado
  private readonly todosService = inject(TodosService);
  private readonly router = inject(Router);

  // Exposição direta das licitações filtradas (read-only signal)
  // O filtro é feito INTERNAMENTE no TodosService (fetchLicitacoes)
  readonly licitacoes = this.todosService.items;
  readonly loading = this.todosService.loadingItems;

  ngOnInit(): void {
    // Dispara o carregamento dos dados, o filtro de ID é feito dentro do service
    this.todosService.loadAllData();
  }

 
  formatarNomeTabela(licitacao: Licitacao): string {

    
    const tituloLimpo = licitacao.TituloLicitacao 
      .toLowerCase()
      .replace(/\s+/g, '_')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    
    const idLicitacao = licitacao._id;
    const idUgg = licitacao.IdUgg || '00'; 

    return `${idLicitacao}_${tituloLimpo}_${idUgg}`;
  }

  selectLicitacao(licitacao: Licitacao): void {
    const nomeTabela = this.formatarNomeTabela(licitacao);
    console.log('Licitação Interna Selecionada (Payload para a rota):', nomeTabela);
  }
}