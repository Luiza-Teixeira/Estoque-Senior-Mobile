export interface Produto {
  id: number;
  nome: string;
  precoVenda: number;
  quantidadeEstoque: number;
  estoqueMinimo: number;
  categoria?: string;
  descricao?: string;
}

export interface ProdutoInput {
  nome: string;
  precoVenda: number;
  quantidadeEstoque: number;
  estoqueMinimo: number;
  categoria?: string;
  descricao?: string;
}

export type ProdutoAtualizacao = Omit<ProdutoInput, 'quantidadeEstoque'>;

export type OrdenacaoProdutos = 'nome-asc' | 'nome-desc' | 'preco-asc' | 'estoque-asc';

export interface FiltrosProdutos {
  busca: string;
  ordenacao: OrdenacaoProdutos;
}

export const OPCOES_ORDENACAO: { valor: OrdenacaoProdutos; rotulo: string }[] = [
  { valor: 'nome-asc', rotulo: 'Nome (A–Z)' },
  { valor: 'nome-desc', rotulo: 'Nome (Z–A)' },
  { valor: 'preco-asc', rotulo: 'Menor preço' },
  { valor: 'estoque-asc', rotulo: 'Menor estoque' },
];

export const CATEGORIAS = ['Alimentos', 'Bebidas', 'Laticínios', 'Limpeza', 'Higiene', 'Outros'];
