// src/app/services/todos.service.ts
import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Usuario } from '../model/todo.entity';
import { Licitacao } from '../model/licitacoes.model';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = 'http://localhost:27071/api'; 
  
  private readonly _items = signal<Array<Licitacao>>([]);
  private readonly _users = signal<Array<Usuario>>([]);
  
  loadingItems = signal(false);
  loadingUsers = signal(false);
   
  constructor(private _auth: Auth) {}

readonly currentUser = computed(() => {
  const token = this._auth.token(); 
  if (!token) return { _id: null, username: null, roles: [], orgao: null };

  return {
    _id: this._auth.currentUserId(),
    username: this._auth.getUserNameFromToken(),
    roles: this._auth.getRolesFromToken(),
    orgao: this._auth.getOrgaoFromToken() ?? null
  };
});

  readonly items = this._items.asReadonly();
  
  readonly usersDoMesmoOrgao = computed(() => 
    this._users().filter(u => u.orgao === this.currentUser().orgao && u._id !== this.currentUser()._id)
  );

  async loadAllData(): Promise<void> {
    await Promise.all([this.fetchLicitacoes(), this.fetchUsers()]);
  }
  async fetchLicitacoes(): Promise<void> {
    this.loadingItems.set(true);
    
    const userId = this.currentUser()._id;

    if (!userId) {
      console.error('ID do utilizador não disponível.');
      this.loadingItems.set(false);
      return;
    }
 
    let params = new HttpParams();
    params = params.set('idResponsavel', userId);
    
    try {//
        const backendData = await firstValueFrom(
            this.http.get<Licitacao[]>(`${this.apiBaseUrl}/licitacoes`, { params: params })
        );

        this._items.set(backendData);
    } catch (error) {
        console.error('Erro ao buscar licitações filtradas:', error);
    } finally {
        this.loadingItems.set(false);
    }
  }

  async fetchUsers(): Promise<void> {
    this.loadingUsers.set(true);
    
    try {
        const allUsers = await firstValueFrom(
            this.http.get<Usuario[]>(`${this.apiBaseUrl}/users`) 
        );
        this._users.set(allUsers);
    } catch (error) {
        console.error('Erro ao buscar utilizadores:', error);
    } finally {
        this.loadingUsers.set(false);
    }
  }
  
  async add(tituloLicitacao: string, descricao: string | null, idResponsavel: string): Promise<void> {//
    const dataToSend = { tituloLicitacao, descricao: descricao, idResponsavel, completed: false };

    try {
        const newLicitacao = await firstValueFrom(
            this.http.post<Licitacao>(`${this.apiBaseUrl}/licitacoes`, dataToSend)
        );
        
        this._items.update(items => [...items, newLicitacao]);
    } catch (error) {
        console.error('Erro ao adicionar licitação:', error);
    }
  }

  async toggle(id: string): Promise<void> {
    const currentItem = this._items().find(i => i._id === id);
    if (!currentItem) return;
    
    const newState = !currentItem.completed;
    
    try {
        await firstValueFrom(
            this.http.put(`${this.apiBaseUrl}/licitacoes/${id}`, { completed: newState })
        );
        
        this._items.update((items) =>
            items.map((item) =>
                item._id === id ? { ...item, completed: newState } : item
            )
        );
    } catch (error) {
        console.error('Erro ao atualizar estado:', error);
    }
  }

  async remove(id: string): Promise<void> {
    try {
        await firstValueFrom(
            this.http.delete(`${this.apiBaseUrl}/licitacoes/${id}`)
        );
        
        this._items.update((items) => items.filter((item) => item._id !== id));
    } catch (error) {
        console.error('Erro ao remover licitação:', error);
    }
  }
}