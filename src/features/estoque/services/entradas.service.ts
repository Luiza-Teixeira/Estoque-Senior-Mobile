import type {
  EntradaInput,
  EntradaMercadoria,
} from '@/features/estoque/types/estoque';
import { api } from '@/services/api';

export const entradasService = {
  async listar(): Promise<EntradaMercadoria[]> {
    const { data } = await api.get<EntradaMercadoria[]>('/entradas-mercadoria');
    return data;
  },

  async buscarPorId(id: number): Promise<EntradaMercadoria> {
    const { data } = await api.get<EntradaMercadoria>(
      `/entradas-mercadoria/${id}`
    );
    return data;
  },

  async registrar(dados: EntradaInput): Promise<EntradaMercadoria> {
    const { data } = await api.post<EntradaMercadoria>(
      '/entradas-mercadoria',
      dados
    );
    return data;
  },
};