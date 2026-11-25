import type { Venda, VendaInput } from '@/features/vendas/types/venda';
import { vendasMock } from '@/mocks/vendas.mock';
import { api } from '@/services/api';
import { USE_MOCKS } from '@/services/config';

export const vendasService = {
  async listar(): Promise<Venda[]> {
    if (USE_MOCKS) return vendasMock.listar();
    const { data } = await api.get<Venda[]>('/vendas');
    return data;
  },

  async buscarPorId(id: number): Promise<Venda> {
    if (USE_MOCKS) return vendasMock.buscarPorId(id);
    const { data } = await api.get<Venda>(`/vendas/${id}`);
    return data;
  },

  async registrar(dados: VendaInput): Promise<Venda> {
    if (USE_MOCKS) return vendasMock.registrar(dados);
    const { data } = await api.post<Venda>('/vendas', dados);
    return data;
  },
};