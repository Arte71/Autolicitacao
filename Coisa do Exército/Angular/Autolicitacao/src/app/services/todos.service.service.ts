// src/app/services/todos.service.ts
import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Licitacao, Usuario } from '../model/todo.entity';
import { Auth } from './auth';
@Injectable({
  providedIn: 'root',
})
export class TodosService {
  
  // -- Configuração do Backend --
  private readonly http = inject(HttpClient);
  // 🚨 ATENÇÃO: SUBSTITUA ESTE ENDEREÇO PELO URL REAL DO SEU BACKEND
  private readonly apiBaseUrl = 'http://localhost:27071/api'; 
  
  // -- Signals de Estado e Dados --
  private readonly _items = signal<Array<Licitacao>>([]);
  private readonly _users = signal<Array<Usuario>>([]);
  
  loadingItems = signal(false);
  loadingUsers = signal(false);
  
  constructor(private _auth: Auth) {}

readonly currentUser = computed(() => {
  const token = this._auth.token(); // signal reativo
  if (!token) return { _id: null, username: null, roles: [], orgao: null };

  return {
    _id: this._auth.currentUserId(),
    username: this._auth.getUserNameFromToken(),
    roles: this._auth.getRolesFromToken(),
    orgao: this._auth.getOrgaoFromToken() ?? null
  };
});


  // Exposição dos dados e filtro
  readonly items = this._items.asReadonly();
  
  // Computed: Filtra utilizadores automaticamente baseado no órgão do utilizador atual
  readonly usersDoMesmoOrgao = computed(() => 
    this._users().filter(u => u.orgao === this.currentUser().orgao)
  );

  // -------------------------------------------------------------------
  // MÉTODOS DE BACKEND (Comunicação Assíncrona)
  // -------------------------------------------------------------------

  // Carrega as duas listas em paralelo
  async loadAllData(): Promise<void> {
    await Promise.all([this.fetchLicitacoes(), this.fetchUsers()]);
  }

  // GET: Obter Licitações - FILTRA PELO ID DO UTILIZADOR
  async fetchLicitacoes(): Promise<void> {
    this.loadingItems.set(true);
    
    const userId = this.currentUser()._id;

    if (!userId) {
      console.error('ID do utilizador não disponível.');
      this.loadingItems.set(false);
      return;
    }
 
    // Envia o ID para o backend como um parâmetro de consulta
    let params = new HttpParams();
    params = params.set('userId', userId);
    
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

  // GET: Obter Utilizadores
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
  
  // POST: Adicionar Licitação
  async add(titulo: string, mensagem: string | null, responsavelId: string): Promise<void> {
    const dataToSend = { titulo, mensagem: mensagem || '', responsavelId, completed: false };
    
    try {
        const newLicitacao = await firstValueFrom(
            this.http.post<Licitacao>(`${this.apiBaseUrl}/licitacoes`, dataToSend)
        );
        
        this._items.update(items => [...items, newLicitacao]);
    } catch (error) {
        console.error('Erro ao adicionar licitação:', error);
    }
  }

  // PATCH/PUT: Alternar Estado
  async toggle(id: string): Promise<void> {
    const currentItem = this._items().find(i => i._id === id);
    if (!currentItem) return;
    
    const newState = !currentItem.completed;
    
    try {
        await firstValueFrom(
            this.http.patch(`${this.apiBaseUrl}/licitacoes/${id}`, { completed: newState })
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

  // DELETE: Remover Licitação
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