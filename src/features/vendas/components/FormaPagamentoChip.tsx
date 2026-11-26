import { StatusChip, TipoStatus } from '@/components/ui/StatusChip';
import { FORMAS_PAGAMENTO, FormaPagamento } from '@/features/vendas/types/venda';

const VISUAL: Record<FormaPagamento, { tipo: TipoStatus; icone: string }> = {
  CARTAO: { tipo: 'info', icone: 'credit-card-outline' },
  PIX: { tipo: 'sucesso', icone: 'qrcode' },
  DINHEIRO: { tipo: 'alerta', icone: 'cash' },
};

export function FormaPagamentoChip({ forma }: { forma: FormaPagamento }) {
  const rotulo = FORMAS_PAGAMENTO.find((f) => f.valor === forma)?.rotulo ?? forma;
  return <StatusChip texto={rotulo} tipo={VISUAL[forma].tipo} icone={VISUAL[forma].icone} />;
}
