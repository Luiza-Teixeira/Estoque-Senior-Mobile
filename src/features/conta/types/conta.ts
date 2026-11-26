export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export interface Sessao {
  usuario: Usuario;
  token: string;
}

export interface LoginInput {
  email: string;
  senha: string;
}

export interface CadastroInput {
  nome: string;
  email: string;
  senha: string;
}

export interface PerfilInput {
  nome: string;
  email: string;
  novaSenha?: string;
}
