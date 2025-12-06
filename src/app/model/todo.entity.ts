export interface Licitacao {
  _id: string; // ID vindo do Mongo (ex: "65a...")
  titulo: string;
  mensagem?: string;
  responsavelId: string;
  completed: boolean; // Mantive para compatibilidade com o seu CSS
}

export interface Usuario {
  _id: string;
  nomeUsuario: string;
  orgao: string;
}