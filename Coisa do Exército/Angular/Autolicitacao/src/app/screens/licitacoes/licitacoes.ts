// src/app/screens/licitacoes/licitacoes.ts

import { Component, OnInit, inject } from '@angular/core';
import { LicitacoesService } from '../../services/licitacoes.service';
import { Licitacao } from '../../model/licitacoes.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { MenuComponent } from '../../components/shared/menu/menu.component';

@Component({
  selector: 'app-licitacoes',
  standalone: true,
  imports: [CommonModule, RouterLink, MenuComponent], 
  templateUrl: './licitacoes.html',
  styleUrls: ['./licitacoes.scss'],
})
export class Licitacoes implements OnInit {
  
  private readonly _auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly licitacoesService = inject(LicitacoesService);

  licitacoes: Licitacao[] = [];


  ngOnInit(): void {
    this.loadAll();
  }
  
  loadAll(): void {
    const currentOrgao = this._auth.getOrgaoFromToken(); 
    
    if (!currentOrgao) {
      console.error('Órgão do usuário não encontrado.');
      return;
    }

    this.licitacoesService.getAll().subscribe((allLicitacoes) => {
      this.licitacoes = allLicitacoes.filter(licitacao => 
  licitacao.idResponsavel.orgao !== currentOrgao);
    });
  }

  
  formatarNomeTabela(licitacao: Licitacao): string {
    const tituloLimpo = licitacao.tituloLicitacao
      .toLowerCase()
      .replace(/\s+/g, '_') 
      .normalize('NFD').replace(/[\u0300-\u036f]/g, ""); 

    return `${licitacao.idLicitacao}_${tituloLimpo}_${licitacao.idResponsavel._id}`;
  }

  selectLicitacao(licitacao: Licitacao): void {
    const nomeTabela = this.formatarNomeTabela(licitacao);
    
    console.log('Nome da Tabela de Itens (Payload para a rota):', nomeTabela);
  }
}