// src/app/services/licitacoes.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Licitacao, TabelaItem } from '../model/licitacoes.model';

@Injectable({
  providedIn: 'root',
})
export class LicitacoesService  {
  
  private readonly http = inject(HttpClient); 
  
  private apiUrl = 'http://localhost:3000/api/licitacoes'; 


  getAll(): Observable<Licitacao[]> {
    return this.http.get<Licitacao[]>(this.apiUrl);
  }
  
  getItensByTableName(tableName: string): Observable<TabelaItem[]> {

    const urlBuscaItens = `http://localhost:3000/api/itens-por-tabela/${tableName}`; 
    return this.http.get<TabelaItem[]>(urlBuscaItens);
  }

  saveChanges(updatedLicitacao: Licitacao): Observable<Licitacao> {
    return this.http.put<Licitacao>(`${this.apiUrl}/${updatedLicitacao._id}`, updatedLicitacao);
  }

  addItemToLicitacao(id: string, newItem: TabelaItem): Observable<Licitacao> {
   
    return this.http.post<Licitacao>(`${this.apiUrl}/${id}/items`, newItem);
  }
}