import { AxiosError, create } from 'axios';

import { API_URL } from '@/services/config';
import { ApiError, MENSAGENS_PADRAO, RespostaDeErro } from '@/types/api';

export const api = create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

let obterToken: () => string | null = () => null;
let aoExpirarSessao: () => void = () => {};

export function configurarToken(fn: () => string | null) {
  obterToken = fn;
}

export function configurarSessaoExpirada(fn: () => void) {
  aoExpirarSessao = fn;
}

api.interceptors.request.use((config) => {
  const token = obterToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (resposta) => resposta,
  (erro: AxiosError<Partial<RespostaDeErro>>) => {
    const status = erro.response?.status ?? 0;

    if (status === 401) {
      aoExpirarSessao();
    }

    const corpo = erro.response?.data;
    const mensagem =
      corpo?.mensagem ??
      MENSAGENS_PADRAO[status] ??
      MENSAGENS_PADRAO[500];

    return Promise.reject(
      new ApiError(status, mensagem, corpo?.detalhes ?? [])
    );
  }
);