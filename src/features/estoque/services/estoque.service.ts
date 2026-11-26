import type { ItemEstoque } from '@/features/estoque/types/estoque';
import { api } from '@/services/api';

export const estoqueService = {
  async listar(): Promise<ItemEstoque[]> {
    const { data } = await api.get<ItemEstoque[]>('/estoque');
    return data;
  },

  async listarBaixo(): Promise<ItemEstoque[]> {
    const { data } = await api.get<ItemEstoque[]>('/estoque/baixo');
    return data;
  },
};