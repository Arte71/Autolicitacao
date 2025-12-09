// src/app/model/licitacoes.model.ts


export interface TabelaItem {
  itemId: string;
  descricao: string;
  catmat?: string;
  quantidade_total?: number;
  // Permite campos extras dinâmicos que possam vir da importação
  [key: string]: any; 
}


export interface Orgao {
  _id: string;
  nomeOrgao: string;
  qtd: number[]; // Array de quantidades que mapeiam para a ordem dos itens
  createdAt: string;
}

export interface Licitacao {
  _id: string; // ID interno do MongoDB (usado como nome da tabela/identificador)
  IdLicitacao: string; // ID da licitação (mantido para referências externas, se necessário)
  TituloLicitacao: string;
  DataCriacao: string; 
  DataConclusao: string; 
  IdUgg: string; // ID da UGG/Órgão (se vier populado)
  NomeOrgao: string; // Nome do Órgão principal (se vier populado)
  IdResponsavel: string; 
  IdUsuario: string; 
  status: 'rascunho' | 'aberta' | 'encerrada';
  items: TabelaItem[]; // Lista de itens (geralmente usada em listagens)
}


export interface ItemComOrgao extends TabelaItem {
  quantidadesPorOrgao: { [nomeOrgao: string]: number };
}