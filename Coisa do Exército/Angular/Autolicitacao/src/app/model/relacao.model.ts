

export interface RelacaoResponse {
  itemId?: any[];
  descricao?: any[];
  catmat?: any[];
  quantidade_total?: any[];

  [key: string]: any[] | undefined; 
}


export interface ItemRelacao {
  itemId: string;
  descricao: string;
  catmat: string;
}