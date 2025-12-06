// src/app/model/licitacoes.model.ts

export interface TabelaItem {
  itemId: string;
  descricao: string;
  catmat?: string;
  quantidade_total?: number;
}

// 🚨 NOVO MODELO DE LICITACAO
export interface Licitacao {
  _id: string; // ID interno do MongoDB
  IdLicitacao: string; // ID da licitação usado para rotas
  TituloLicitacao: string;
  DataConclusao: string; // ISO
  NomeOrgao: string;
  IdResponsavel: string; // ID do responsável
  IdUsuario: string; // ID do usuário criador
  status: 'rascunho' | 'aberta' | 'encerrada';
  items: TabelaItem[];
}