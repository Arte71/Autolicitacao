// src/app/screens/generetes/relacao-itens/relacao-itens.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LicitacoesService } from '../../services/licitacoes.service';
import { TabelaItem } from '../../model/licitacoes.model';

@Component({
  selector: 'app-relacao-itens',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './relacao-itens.html',
  styleUrl: './relacao-itens.scss',
})
export class RelacaoItens implements OnInit {

  private route = inject(ActivatedRoute);
  private licitacoesService = inject(LicitacoesService);

  nomeTabela!: string; 
  
  
  readonly itensRelacao = new Array<TabelaItem>();

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      
      this.nomeTabela = params.get('nomeTabela') as string;
      
      if (this.nomeTabela) {
        this.fetchItens();
      }
    });
  }
  
  fetchItens(): void {
    
    this.licitacoesService.getItensByTableName(this.nomeTabela).subscribe({
      next: (itens) => {
        this.itensRelacao.splice(0, this.itensRelacao.length, ...itens); // Limpa e adiciona novos itens
      },
      error: (err) => console.error(`Erro ao buscar itens da tabela ${this.nomeTabela}:`, err)
    });
  }
}