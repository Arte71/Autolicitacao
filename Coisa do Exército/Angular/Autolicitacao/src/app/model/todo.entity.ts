export interface Licitacao {
  _id: string; 
  titulo: string;
  mensagem?: string;
  responsavel: string;
  completed: boolean; 
}

export interface Usuario {
  _id: string;
  nome: string;
  orgao: string;
}