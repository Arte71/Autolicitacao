


export interface TabelaItem {
  itemId: string;
  descricao: string;
  catmat?: string;
  quantidade_total?: number;
 
  [key: string]: any; 
}


export interface Orgao {
  _id: string;
  nomeOrgao: string;
  qtd: number[];
  createdAt: string;
}

export interface Licitacao {
  _id: string; 
  IdLicitacao: string; 
  TituloLicitacao: string;
  DataCriacao: string; 
  DataConclusao: string; 
  IdUgg: string; 
  NomeOrgao: string;
  IdResponsavel: string; 
  IdUsuario: string; 
  status: 'rascunho' | 'aberta' | 'encerrada';
  items: TabelaItem[]; 
completed:  boolean;
}
 

export interface idUsuario {
    _id: string;
    username: string;
    nome: string;
    orgao: string;
  }


export interface ItemComOrgao extends TabelaItem {
  quantidadesPorOrgao: { [nomeOrgao: string]: number };
}