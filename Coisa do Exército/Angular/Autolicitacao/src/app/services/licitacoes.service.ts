// src/app/services/licitacoes.service.ts

import { Injectable, inject, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Licitacao, TabelaItem, Orgao } from '../model/licitacoes.model'; 
import { Auth } from './auth'; 

@Injectable({
  providedIn: 'root',
})
export class LicitacoesService  {
  
  private readonly http = inject(HttpClient); 
  private readonly auth = inject(Auth); 
  private apiUrl = 'http://localhost:27071/api/licitacoes'; 

  
  readonly currentUserId = computed(() => {
   
    return this.auth.currentUserId(); 
  });

  getAll(): Observable<Licitacao[]> {
    const currentUserId = this.currentUserId(); 

    if (!currentUserId) {
      console.warn('ID de usuário não encontrado. Retornando lista completa (sem filtro).');
      return this.http.get<Licitacao[]>(this.apiUrl);
    }

    let params = new HttpParams();
    params = params.set('userId', currentUserId);
    
    return this.http.get<Licitacao[]>(this.apiUrl, { params: params });
  }
  
  /**
     * Busca os itens da tabela.
     * 🌟 Tipo de Retorno Ajustado para 'any' 🌟
     * Isso é necessário porque o backend pode retornar um objeto com arrays paralelos
     * (e não TabelaItem[]), exigindo a normalização no componente consumidor.
     */
  getItensByTableName(tableName: string): Observable<any> {

    // O tableName aqui é o _id da Licitação
    const urlBuscaItens = `http://localhost:27071/api/itens-por-tabela/${tableName}`; 
    return this.http.get<any>(urlBuscaItens);
  }

  // 🌟 NOVO MÉTODO: Busca os detalhes dos Órgãos associados à Licitação
  getOrgaosByLicitacaoId(licitacaoId: string): Observable<Orgao[]> {
    const urlBuscaOrgaos = `${this.apiUrl}/orgaos-por-licitacao/${licitacaoId}`; 
    return this.http.get<Orgao[]>(urlBuscaOrgaos);
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