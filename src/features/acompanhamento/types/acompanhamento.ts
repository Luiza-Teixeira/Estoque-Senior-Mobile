export interface ResumoDashboard {
  totalProdutosCadastrados: number;
  quantidadeProdutosEstoqueBaixo: number;
  quantidadeProdutosSemEstoque: number;
  quantidadeVendasDia: number;
  valorTotalVendidoDia: number;
}

export type TipoMovimentacao = 'ENTRADA' | 'SAIDA';

export interface Movimentacao {
  id: string;
  tipo: TipoMovimentacao;
  referenciaId: number;
  produtoId: number;
  nomeProduto: string;
  quantidade: number;
  valorUnitario: number;
  dataHora: string;
}

export type PeriodoHistorico = 'hoje' | '7dias' | '30dias' | 'todos';

export interface FiltrosHistorico {
  tipo: TipoMovimentacao | 'TODOS';
  periodo: PeriodoHistorico;
  busca: string;
}

export const OPCOES_TIPO: { valor: FiltrosHistorico['tipo']; rotulo: string }[] = [
  { valor: 'TODOS', rotulo: 'Todos os registros' },
  { valor: 'ENTRADA', rotulo: 'Entradas de mercadoria' },
  { valor: 'SAIDA', rotulo: 'Vendas (saídas)' },
];

export const OPCOES_PERIODO: { valor: PeriodoHistorico; rotulo: string }[] = [
  { valor: 'hoje', rotulo: 'Hoje' },
  { valor: '7dias', rotulo: 'Últimos 7 dias' },
  { valor: '30dias', rotulo: 'Últimos 30 dias' },
  { valor: 'todos', rotulo: 'Todo o período' },
];
