export interface ItemEstoque {
  produtoId: number;
  nomeProduto: string;
  quantidadeEstoque: number;
  estoqueMinimo: number;
  estoqueBaixo: boolean;
}

export type OrdenacaoEstoque = 'estoque-asc' | 'nome-asc';

export interface FiltrosEstoque {
  busca: string;
  somenteBaixo: boolean;
  ordenacao: OrdenacaoEstoque;
}

export interface EntradaMercadoria {
  id: number;
  produto: { id: number; nome: string };
  quantidade: number;
  custoUnitario: number;
  dataHora: string;
  fornecedor?: string;
  observacao?: string;
}

export interface EntradaInput {
  produtoId: number;
  quantidade: number;
  custoUnitario: number;
  fornecedor?: string;
  observacao?: string;
}
