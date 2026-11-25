export type FormaPagamento = 'DINHEIRO' | 'PIX' | 'CARTAO';

export const FORMAS_PAGAMENTO: { valor: FormaPagamento; rotulo: string }[] = [
  { valor: 'DINHEIRO', rotulo: 'Dinheiro' },
  { valor: 'PIX', rotulo: 'Pix' },
  { valor: 'CARTAO', rotulo: 'Cartão' },
];

export interface ItemVenda {
  produtoId: number;
  nomeProduto: string;
  quantidade: number;
  /** Preço do produto no momento da venda (regra do Java). */
  valorUnitario: number;
}

export interface Venda {
  id: number;
  itens: ItemVenda[];
  total: number;
  formaPagamento: FormaPagamento;
  cliente?: string;
  dataHora: string;
}

export interface VendaInput {
  itens: { produtoId: number; quantidade: number }[];
  formaPagamento: FormaPagamento;
  cliente?: string;
}