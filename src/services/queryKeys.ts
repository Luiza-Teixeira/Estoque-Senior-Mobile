export const queryKeys = {
  produtos: ['produtos'] as const,
  produto: (id: number) => ['produtos', id] as const,

  estoque: ['estoque'] as const,
  estoqueBaixo: ['estoque', 'baixo'] as const,
  entradas: ['entradas'] as const,
  entrada: (id: number) => ['entradas', id] as const,

  vendas: ['vendas'] as const,
  venda: (id: number) => ['vendas', id] as const,

  historico: ['historico'] as const,
  movimentacao: (id: string) => ['historico', id] as const,
  dashboard: ['dashboard'] as const,
};