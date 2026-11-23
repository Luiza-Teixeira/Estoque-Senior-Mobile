import { StatusChip } from '@/components/ui/StatusChip';
import type { TipoMovimentacao } from '@/features/acompanhamento/types/acompanhamento';

export function TipoMovimentacaoChip({ tipo }: { tipo: TipoMovimentacao }) {
  return tipo === 'ENTRADA' ? (
    <StatusChip texto="Entrada" tipo="sucesso" icone="arrow-up" />
  ) : (
    <StatusChip texto="Venda" tipo="info" icone="cart-outline" />
  );
}
