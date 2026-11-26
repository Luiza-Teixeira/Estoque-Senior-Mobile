import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { create } from 'zustand';

import { authService } from '@/features/conta/services/auth.service';
import type {
  CadastroInput,
  LoginInput,
  Usuario,
} from '@/features/conta/types/conta';
import {
  configurarSessaoExpirada,
  configurarToken,
} from '@/services/api';

const CHAVE_SESSAO = 'estoque-senior-sessao';

const armazenamento = {
  salvar: (valor: string) =>
    Platform.OS === 'web'
      ? AsyncStorage.setItem(CHAVE_SESSAO, valor)
      : SecureStore.setItemAsync(CHAVE_SESSAO, valor),

  ler: () =>
    Platform.OS === 'web'
      ? AsyncStorage.getItem(CHAVE_SESSAO)
      : SecureStore.getItemAsync(CHAVE_SESSAO),

  apagar: () =>
    Platform.OS === 'web'
      ? AsyncStorage.removeItem(CHAVE_SESSAO)
      : SecureStore.deleteItemAsync(CHAVE_SESSAO),
};

interface AuthState {
  usuario: Usuario | null;
  token: string | null;
  isAuthenticated: boolean;
  carregando: boolean;
  login: (dados: LoginInput, lembrar: boolean) => Promise<void>;
  cadastrar: (dados: CadastroInput) => Promise<void>;
  logout: () => Promise<void>;
  limparSessao: () => Promise<void>;
  restaurarSessao: () => Promise<void>;
  atualizarUsuario: (usuario: Usuario) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  usuario: null,
  token: null,
  isAuthenticated: false,
  carregando: true,

  login: async (dados, lembrar) => {
    const sessao = await authService.login(dados);

    if (lembrar) {
      await armazenamento.salvar(JSON.stringify(sessao));
    }

    set({
      usuario: sessao.usuario,
      token: sessao.token,
      isAuthenticated: true,
    });
  },

  cadastrar: async (dados) => {
    const sessao = await authService.cadastrar(dados);

    await armazenamento.salvar(JSON.stringify(sessao));

    set({
      usuario: sessao.usuario,
      token: sessao.token,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    try {
      await authService.logout();
    } finally {
      await armazenamento.apagar();

      set({
        usuario: null,
        token: null,
        isAuthenticated: false,
      });
    }
  },

  limparSessao: async () => {
    await armazenamento.apagar();

    set({
      usuario: null,
      token: null,
      isAuthenticated: false,
    });
  },

  restaurarSessao: async () => {
    try {
      const salva = await armazenamento.ler();

      if (salva) {
        const sessao = JSON.parse(salva) as {
          usuario: Usuario;
          token: string;
        };

        set({
          usuario: sessao.usuario,
          token: sessao.token,
          isAuthenticated: true,
        });
      }
    } finally {
      set({ carregando: false });
    }
  },

  atualizarUsuario: (usuario) => {
    set({ usuario });

    const token = get().token;

    if (token) {
      armazenamento.salvar(
        JSON.stringify({
          usuario,
          token,
        })
      );
    }
  },
}));

configurarToken(() => useAuthStore.getState().token);

configurarSessaoExpirada(() => {
  useAuthStore.getState().limparSessao();
});
