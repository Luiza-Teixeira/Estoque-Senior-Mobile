import type { Venda, VendaInput } from '@/features/vendas/types/venda';
import { api } from '@/services/api';

export const vendasService = {
  async listar(): Promise<Venda[]> {
    const { data } = await api.get<Venda[]>('/vendas');
    return data;
  },

  async buscarPorId(id: number): Promise<Venda> {
    const { data } = await api.get<Venda>(`/vendas/${id}`);
    return data;
  },

  async registrar(dados: VendaInput): Promise<Venda> {
    const { data } = await api.post<Venda>('/vendas', dados);
    return data;
  },
};