import type { Usuario } from '@/features/conta/types/conta';

export interface UsuarioRegistro extends Usuario {
  senha: string;
}

export const db = {
  usuarios: [] as UsuarioRegistro[],
};

export const proximoId = (lista: { id: number }[]): number =>
  lista.length > 0 ? Math.max(...lista.map((item) => item.id)) + 1 : 1;

export const erroMock = (status: number, message: string) =>
  Object.assign(new Error(message), { status });

export const simularRede = <T>(fn: () => T, atrasoMs = 300): Promise<T> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(fn());
      } catch (erro) {
        reject(erro);
      }
    }, atrasoMs);
  });