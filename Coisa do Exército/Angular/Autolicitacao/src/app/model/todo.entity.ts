export interface Licitacao {
  _id: string; // ID vindo do Mongo (ex: "65a...")
  titulo: string;
  mensagem?: string;
  responsavel: string;
  completed: boolean; // Mantive para compatibilidade com o seu CSS
}

export interface Usuario {
  _id: string;
  username: string;
  orgao: string;
}