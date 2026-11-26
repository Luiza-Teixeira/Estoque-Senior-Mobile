import { useQuery } from '@tanstack/react-query';

import { vendasService } from '@/features/vendas/services/vendas.service';
import type { Venda } from '@/features/vendas/types/venda';
import { queryKeys } from '@/services/queryKeys';
import { formatarCodigo, normalizar } from '@/utils/formatadores';

function filtrar(lista: Venda[], busca: string): Venda[] {
  const termo = normalizar(busca);
  if (!termo) return lista;
  return lista.filter(
    (v) =>
      normalizar(v.cliente ?? '').includes(termo) ||
      normalizar(formatarCodigo('V', v.id)).includes(termo) ||
      String(v.id) === termo,
  );
}

export function useVendas(busca = '') {
  return useQuery({
    queryKey: queryKeys.vendas,
    queryFn: vendasService.listar,
    select: (lista) => filtrar(lista, busca),
  });
}
