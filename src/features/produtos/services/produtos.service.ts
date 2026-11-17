import type {
  Produto,
  ProdutoAtualizacao,
  ProdutoInput,
} from '@/features/produtos/types/produto';
import { api } from '@/services/api';

export const produtosService = {
  async listar(): Promise<Produto[]> {
    const { data } = await api.get<Produto[]>('/produtos');
    return data;
  },

  async buscarPorId(id: number): Promise<Produto> {
    const { data } = await api.get<Produto>(`/produtos/${id}`);
    return data;
  },

  async criar(dados: ProdutoInput): Promise<Produto> {
    const { data } = await api.post<Produto>('/produtos', dados);
    return data;
  },

  async atualizar(
    id: number,
    dados: ProdutoAtualizacao
  ): Promise<Produto> {
    const { data } = await api.put<Produto>(`/produtos/${id}`, dados);
    return data;
  },

  async excluir(id: number): Promise<void> {
    await api.delete(`/produtos/${id}`);
  },
};