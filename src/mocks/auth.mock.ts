import type {
  CadastroInput,
  LoginInput,
  PerfilInput,
  Sessao,
  Usuario,
} from '@/features/conta/types/conta';
import { db, erroMock, proximoId, simularRede, type UsuarioRegistro } from './db';

const semSenha = ({ senha: _senha, ...usuario }: UsuarioRegistro): Usuario => usuario;
const tokenFalso = (id: number) => `token-mock-${id}-${Date.now()}`;

export const authMock = {
  login: ({ email, senha }: LoginInput) =>
    simularRede<Sessao>(() => {
      const usuario = db.usuarios.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
      if (!usuario || usuario.senha !== senha) throw erroMock(401, 'E-mail ou senha incorretos.');
      return { usuario: semSenha(usuario), token: tokenFalso(usuario.id) };
    }),

  cadastrar: ({ nome, email, senha }: CadastroInput) =>
    simularRede<Sessao>(() => {
      if (db.usuarios.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
        throw erroMock(409, 'Já existe uma conta com esse e-mail.');
      }
      const novo = { id: proximoId(db.usuarios), nome: nome.trim(), email: email.trim(), senha };
      db.usuarios.push(novo);
      return { usuario: semSenha(novo), token: tokenFalso(novo.id) };
    }),

  atualizarPerfil: (id: number, dados: PerfilInput) =>
    simularRede<Usuario>(() => {
      const usuario = db.usuarios.find((u) => u.id === id);
      if (!usuario) throw erroMock(404, 'Usuário não encontrado.');
      usuario.nome = dados.nome.trim();
      usuario.email = dados.email.trim();
      if (dados.novaSenha) usuario.senha = dados.novaSenha;
      return semSenha(usuario);
    }),
};
