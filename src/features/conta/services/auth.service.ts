import type {
  CadastroInput,
  LoginInput,
  PerfilInput,
  Sessao,
  Usuario,
} from '@/features/conta/types/conta';
import { api } from '@/services/api';

export const authService = {
  async login(dados: LoginInput): Promise<Sessao> {
    const { data } = await api.post<Sessao>('/auth/login', dados);
    return data;
  },

  async cadastrar(dados: CadastroInput): Promise<Sessao> {
    const { data } = await api.post<Sessao>('/auth/cadastro', dados);
    return data;
  },

  async atualizarPerfil(dados: PerfilInput): Promise<Usuario> {
    const { data } = await api.put<Usuario>('/usuarios/me', dados);
    return data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },
};
