// src/app/model/licitacoes.model.ts

export interface TabelaItem {
  _id?: string
  itemId: string;
  tableName?: string;
  descricao: string;//
  catmat?: string;
  quantidade_total?: number;
  unidadeMedida: string;
}

export interface Licitacao {
titulo: any;
  _id: string; 
  idLicitacao: string 
  tituloLicitacao: string;
  dataCriacao: string; // Novo campo
  dataConclusao: string;
  descricao: string;
  idUgg: string;
  idResponsavel: | {
    _id: string;
    username: string;
    nome: string;
    orgao: string;
  };
  orgao: | {
    _id: string;
    NomeOrgao: string;
  } 
  idUsuario: | {
    _id: string;
    username: string;
    nome: string;
    orgao: string;
  };
  tabelaItem: [TabelaItem];
  status: 'rascunho' | 'aberta' | 'encerrada';
  completed?: boolean;    
  items: TabelaItem[];
}