// src/app/services/relacao.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RelacaoResponse, ItemRelacao } from '../model/relacao.model';

@Injectable({
  providedIn: 'root' 
})
export class RelacaoService {

  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:27071/api/itens-por-tabela';

 
  getItensFormatados(idTabela: string): Observable<ItemRelacao[]> {
    
    return this.http.get<RelacaoResponse>(`${this.apiUrl}/${idTabela}`).pipe(
     
      map(response => this.converterParaTabela(response)),
      
      
      catchError(err => {
        console.error('Erro no RelacaoService:', err);
        return of([]); 
      })
    );
  }

  
  private converterParaTabela(data: RelacaoResponse): ItemRelacao[] {
   
    if (!data) return [];
    
    
    if (Array.isArray(data)) return data;

    
    const totalLinhas = data.itemId?.length || data.descricao?.length || data.catmat?.length || 0;

    if (totalLinhas === 0) return [];

    const itensLimpos: ItemRelacao[] = [];

    
    for (let i = 0; i < totalLinhas; i++) {
      itensLimpos.push({
        
        itemId: String(data.itemId?.[i] || 'Sem ID'),
        descricao: String(data.descricao?.[i] || 'Sem descrição'),
        catmat: data.catmat?.[i] ? String(data.catmat[i]) : 'N/A'
      });
    }

    return itensLimpos;
  }
}