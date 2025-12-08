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
  
  // 🌟 Sintaxe de injeção moderna para todos os serviços
  private readonly _auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly licitacoesService = inject(LicitacoesService); // 🌟 Injeção atualizada

  licitacoes: Licitacao[] = [];

  // ❌ O constructor foi removido, pois a injeção é feita acima.

  ngOnInit(): void {
    this.loadAll();
  }
  
  loadAll(): void {
    const currentOrgao = this._auth.getOrgaoFromToken(); 
    
    if (!currentOrgao) {
      console.error('Órgão do usuário não encontrado.');
      return;
    }

    // Usa o serviço injetado na propriedade
    this.licitacoesService.getAll().subscribe((allLicitacoes) => {
      this.licitacoes = allLicitacoes.filter(licitacao => 
        licitacao.NomeOrgao !== currentOrgao
      );
    });
  }

  /**
   * Formata a string para o nome da tabela de itens.
   * Formato: IdLicitacao_titulo_da_licitacoa_IdUgg
   */
  formatarNomeTabela(licitacao: Licitacao): string {
    // Remove espaços e caracteres especiais e converte para minúsculas
    const tituloLimpo = licitacao.TituloLicitacao
      .toLowerCase()
      .replace(/\s+/g, '_') // Substitui espaços por underscores
      .normalize('NFD').replace(/[\u0300-\u036f]/g, ""); // Remove acentos

    return `${licitacao.IdLicitacao}_${tituloLimpo}_${licitacao.IdUgg}`;
  }

  // Método de navegação (Chamado pelo HTML)
  selectLicitacao(licitacao: Licitacao): void {
    const nomeTabela = this.formatarNomeTabela(licitacao);
    
    console.log('Nome da Tabela de Itens (Payload para a rota):', nomeTabela);
  }
}