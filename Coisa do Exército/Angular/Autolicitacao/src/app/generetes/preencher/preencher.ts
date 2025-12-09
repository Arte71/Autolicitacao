// src/app/screens/generetes/relacao-itens/relacao-itens.ts (CÓDIGO CORRIGIDO E SIMPLIFICADO)

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LicitacoesService } from '../../services/licitacoes.service';
// Importa apenas o modelo simples que este componente exibe
import { TabelaItem } from '../../model/licitacoes.model'; 
import { toSignal, toObservable } from '@angular/core/rxjs-interop'; 
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs'; 

@Component({
  selector: 'app-relacao-itens',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './relacao-itens.html',
  styleUrl: './relacao-itens.scss',
})
export class RelacaoItens { 

  private readonly route = inject(ActivatedRoute);
  private readonly licitacoesService = inject(LicitacoesService);

  // 1. Extrai o parâmetro de rota (ID da Licitação) para um Signal
  readonly nomeTabelaSignal = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('nomeTabela') || '') 
    ),
    { initialValue: '' } as { initialValue: string } 
  );

  // 🌟 NomeTabela para uso no template (acessado via nomeTabelaSignal()) 🌟
  public get nomeTabela(): string {
    return this.nomeTabelaSignal();
  }
  
  // 2. Converte o Signal de volta para Observable para usar operadores RxJS.
  readonly nomeTabelaObservable = toObservable(this.nomeTabelaSignal);


  // 3. Dispara a chamada ao serviço e NORMALIZA OS DADOS
  readonly itensRelacao = toSignal(
    this.nomeTabelaObservable.pipe(
      switchMap(tabelaId => {
        if (tabelaId) {
          // Retorna um Observable<any> (pois a estrutura pode ser arrays paralelos)
          return this.licitacoesService.getItensByTableName(tabelaId);
        }
        return of<TabelaItem[]>([]);
      }),
      // Aplica a normalização para garantir que o formato final seja TabelaItem[]
      map(data => this.normalizeItems(data)) 
    ),
    { initialValue: [] as TabelaItem[] }
  );
  
  /**
   * Converte arrays paralelos de propriedades em um array de objetos TabelaItem.
   */
  normalizeItems(data: any): TabelaItem[] {
    
    // Interface interna para lidar com a tipagem do objeto de arrays paralelos.
    interface RawItemArrays { 
        itemId?: any[]; 
        descricao?: any[]; 
        catmat?: any[]; 
        [key: string]: any[]; 
    }

    // Caso 1: Se o backend retornou um array de objetos (TabelaItem[]), apenas retorna.
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' && 'itemId' in data[0]) {
      return data; 
    }

    // Caso 2: Dados vêm como arrays paralelos dentro de um único objeto.
    const rawData = data as RawItemArrays;
    
    const length = rawData.itemId?.length || rawData.descricao?.length || rawData.catmat?.length || 0;
    
    if (length === 0) {
        return [];
    }

    const normalized: TabelaItem[] = [];
    for (let i = 0; i < length; i++) {
        normalized.push({
            itemId: String(rawData.itemId?.[i] || ''), // Garante que itemId é string
            descricao: String(rawData.descricao?.[i] || ''), // Garante que descricao é string
            catmat: rawData.catmat?.[i] ? String(rawData.catmat?.[i]) : undefined,
            // Não incluímos aqui outras propriedades complexas (como quantidadesPorOrgao)
            // pois este componente só precisa dos campos básicos definidos em TabelaItem.
        } as TabelaItem);
    }
    return normalized;
  }
}