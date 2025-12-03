  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Licitacao, TabelaItem } from '../model/licitacoes.model';

  @Injectable({
    providedIn: 'root',
  })
  export class LicitacoesService  {
    private apiUrl = 'http://localhost:3000/api/licitacoes'; // Substitua com o seu endpoint Flask

    constructor(private http: HttpClient) {}

    getAll(): Observable<Licitacao[]> {
      return this.http.get<Licitacao[]>(this.apiUrl);
    }

    saveChanges(updatedLicitacao: Licitacao): Observable<Licitacao> {
      return this.http.put<Licitacao>(`${this.apiUrl}/${updatedLicitacao._id}`, updatedLicitacao);
    }

    addItemToLicitacao(id: string, newItem: TabelaItem): Observable<Licitacao> {
      return this.http.post<Licitacao>(`${this.apiUrl}/${id}/items`, newItem);
    }
  }
