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

  private readonly todosService = inject(TodosService);
  private readonly router = inject(Router);

  readonly licitacoes = this.todosService.items;
  readonly loading = this.todosService.loadingItems;

  ngOnInit(): void {
    this.todosService.loadAllData();
  }

 
  formatarNomeTabela(licitacao: Licitacao): string {

    
    const tituloLimpo = licitacao.tituloLicitacao 
      .toLowerCase()
      .replace(/\s+/g, '_')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    
    const idLicitacao = licitacao._id;
    const idResponsavel = licitacao.idResponsavel || '00'; 

    return `${idLicitacao}_${tituloLimpo}_${idResponsavel}`;
  }

  selectLicitacao(licitacao: Licitacao): void {
    const nomeTabela = this.formatarNomeTabela(licitacao);
    this.router.navigate(['gerardoc']);
    console.log('Licitação Interna Selecionada (Payload para a rota):', nomeTabela);
  }
}