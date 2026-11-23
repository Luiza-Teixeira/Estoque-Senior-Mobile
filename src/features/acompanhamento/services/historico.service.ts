import type { Movimentacao } from '@/features/acompanhamento/types/acompanhamento';
import { api } from '@/services/api';

export const historicoService = {
  async listar(): Promise<Movimentacao[]> {
    const { data } = await api.get<Movimentacao[]>('/historico');
    return data;
  },

  async buscarPorId(id: string): Promise<Movimentacao> {
    const { data } = await api.get<Movimentacao>(`/historico/${id}`);
    return data;
  },
};