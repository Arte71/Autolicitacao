// src/app/screens/faseinterna/faseinterna.ts

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LicitacoesService } from '../../services/licitacoes.service';
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


  private readonly licitacoesService = inject(LicitacoesService);
  
  private readonly router = inject(Router);

 
  licitacoes = signal<Licitacao[]>([]);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loading.set(true);
    
    
    this.licitacoesService.getAll().subscribe({
      next: (data) => {
       
        this.licitacoes.set(data); 
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar licitações:', err);
        this.loading.set(false);
       
      }
    });
  }

  formatarNomeTabela(licitacao: Licitacao): string {
    
    const tituloLimpo = licitacao.TituloLicitacao
      .toLowerCase()
      .replace(/\s+/g, '_')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    const idLicitacao = licitacao.IdLicitacao;
    const idUgg = licitacao.IdUgg || '00'; 

    return `${idLicitacao}_${tituloLimpo}_${idUgg}`;
  }

  selectLicitacao(licitacao: Licitacao): void {
    const nomeTabela = this.formatarNomeTabela(licitacao);
    console.log('Licitação selecionada para preenchimento:', nomeTabela);
  }
}