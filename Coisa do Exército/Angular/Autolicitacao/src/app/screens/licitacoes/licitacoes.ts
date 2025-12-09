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
    // Assumimos que getOrgaoFromToken() retorna o valor do campo 'orgao' do usuário,
    // que agora deve ser o ID UGG (o código do órgão).
    const currentUggId = this._auth.getOrgaoFromToken(); 
    
    if (!currentUggId) {
      console.error('ID do Órgão do usuário (Ugg) não encontrado.');
      return;
    }

    
    this.licitacoesService.getAll().subscribe((allLicitacoes) => {
      
      // 
      this.licitacoes = allLicitacoes.filter(licitacao => 
        licitacao.IdUgg !== currentUggId 
      );
    });
  }


  formatarNomeTabela(licitacao: Licitacao): string {
    
    const tituloLimpo = licitacao.TituloLicitacao
      .toLowerCase()
      .replace(/\s+/g, '_') 
      .normalize('NFD').replace(/[\u0300-\u036f]/g, ""); 

    return `${licitacao.IdLicitacao}_${tituloLimpo}_${licitacao.IdUgg}`;
  }


  selectLicitacao(licitacao: Licitacao): void {
    const nomeTabela = this.formatarNomeTabela(licitacao);
    
    console.log('Nome da Tabela de Itens (Payload para a rota):', nomeTabela);
  }
}