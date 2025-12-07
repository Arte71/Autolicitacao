export interface TabelaItem {
  itemId: string; // Identificador único do item
  descricao: string; // Descrição do item
  catmat?: string; // Código do material (catmat)
  quantidade_total?: number; // Quantidade inserida pelo usuário
}

// Modelo para a licitação
// Modelo para a licitação
export interface Licitacao {
  _id: string;
  titulo: string;  // Adicionando o campo 'titulo' de volta
  status: 'rascunho' | 'aberta' | 'encerrada';
  data_criacao: string; // ISO
  items: TabelaItem[]; // Lista de itens que fazem parte da licitação
}

