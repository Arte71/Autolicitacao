/// src/app/services/licitacoes.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Licitacao, TabelaItem } from '../model/licitacoes.model';

@Injectable({
  providedIn: 'root',
})
export class LicitacoesService  {
  
  private readonly http = inject(HttpClient); 
  
  private apiUrl = 'http://localhost:27071/api/licitacoes'; //


  getAll(): Observable<Licitacao[]> {
    return this.http.get<Licitacao[]>(this.apiUrl);
  }
  
  getItensByTableName(tableName: string): Observable<TabelaItem[]> {

    const urlBuscaItens = `http://localhost:27071/api/tabelaitens/${tableName}`; 
    return this.http.get<TabelaItem[]>(urlBuscaItens);
  }

  saveChanges(updatedLicitacao: Licitacao): Observable<Licitacao> {
    return this.http.put<Licitacao>(`${this.apiUrl}/${updatedLicitacao._id}`, updatedLicitacao);
  }

  addItemToLicitacao(id: string, newItem: TabelaItem): Observable<Licitacao> {
   
    return this.http.post<Licitacao>(`${this.apiUrl}/tabelaitens/${id}`, newItem);
  }
}