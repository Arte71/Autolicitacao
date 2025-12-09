// src/app/services/licitacoes.service.ts

import { Injectable, inject, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Licitacao, TabelaItem } from '../model/licitacoes.model';
import { Auth } from './auth'; 

@Injectable({
  providedIn: 'root',
})
export class LicitacoesService  {
  
  private readonly http = inject(HttpClient); 
  private readonly auth = inject(Auth); 
  // Usando a URL que estava no TodosService para consistência (porta 27071)
  private apiUrl = 'http://localhost:27071/api/licitacoes'; 

  
  readonly currentUserId = computed(() => {
   
    return this.auth.currentUserId(); 
  });

  getAll(): Observable<Licitacao[]> {
    // Acessamos o valor atual do Signal computed
    const currentUserId = this.currentUserId(); 

    if (!currentUserId) {
      console.warn('ID de usuário não encontrado. Retornando lista completa (sem filtro).');
      
      return this.http.get<Licitacao[]>(this.apiUrl);
    }

    
    let params = new HttpParams();
    params = params.set('userId', currentUserId);

    
    return this.http.get<Licitacao[]>(this.apiUrl, { params: params });
  }
  
  getItensByTableName(tableName: string): Observable<TabelaItem[]> {

    
    const urlBuscaItens = `http://localhost:27071/api/itens-por-tabela/${tableName}`; 
    return this.http.get<TabelaItem[]>(urlBuscaItens);
  }

  saveChanges(updatedLicitacao: Licitacao): Observable<Licitacao> {
    return this.http.put<Licitacao>(`${this.apiUrl}/${updatedLicitacao._id}`, updatedLicitacao);
  }

  addItemToLicitacao(id: string, newItem: TabelaItem): Observable<Licitacao> {
    return this.http.post<Licitacao>(`${this.apiUrl}/${id}/items`, newItem);
  }

  uploadFile(url: string, formData: FormData): Observable<any> {
    return this.http.post(url, formData);
  }
}