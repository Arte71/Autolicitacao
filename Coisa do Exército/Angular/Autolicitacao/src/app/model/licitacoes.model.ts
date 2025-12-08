// src/app/model/licitacoes.model.ts

export interface TabelaItem {
  itemId: string;
  descricao: string;
  catmat?: string;
  quantidade_total?: number;
}

export interface Licitacao {
  _id: string; // ID interno do MongoDB
  IdLicitacao: string; // ID da licitação
  TituloLicitacao: string;
  DataCriacao: string; // Novo campo
  DataConclusao: string; 
  IdUgg: string; // 🌟 NOVO CAMPO: ID da UGG/Órgão
  NomeOrgao: string; 
  IdResponsavel: string; 
  IdUsuario: string; // ID do usuário criador (mantido)
  status: 'rascunho' | 'aberta' | 'encerrada';
  items: TabelaItem[];
}