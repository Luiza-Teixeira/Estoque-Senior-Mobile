export type StatusEstoque = 'ok' | 'baixo' | 'sem';

export function obterStatusEstoque(quantidade: number, minimo: number): StatusEstoque {
  if (quantidade <= 0) return 'sem';
  if (quantidade <= minimo) return 'baixo';
  return 'ok';
}

export const TEXTO_STATUS_ESTOQUE: Record<StatusEstoque, string> = {
  ok: 'Em estoque',
  baixo: 'Estoque baixo',
  sem: 'Sem estoque',
};
