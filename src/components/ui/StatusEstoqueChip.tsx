import { StatusChip, TipoStatus } from '@/components/ui/StatusChip';
import { obterStatusEstoque, StatusEstoque, TEXTO_STATUS_ESTOQUE } from '@/utils/estoque';

const TIPO: Record<StatusEstoque, TipoStatus> = { ok: 'sucesso', baixo: 'alerta', sem: 'perigo' };
const ICONE: Record<StatusEstoque, string> = {
  ok: 'check-circle-outline',
  baixo: 'alert-outline',
  sem: 'close-circle-outline',
};

export function StatusEstoqueChip({ quantidade, minimo }: { quantidade: number; minimo: number }) {
  const status = obterStatusEstoque(quantidade, minimo);
  return (
    <StatusChip texto={TEXTO_STATUS_ESTOQUE[status]} tipo={TIPO[status]} icone={ICONE[status]} />
  );
}
