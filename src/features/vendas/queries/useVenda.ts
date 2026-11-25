import { useQuery } from '@tanstack/react-query';

import { vendasService } from '@/features/vendas/services/vendas.service';
import { queryKeys } from '@/services/queryKeys';

export function useVenda(id: number) {
  return useQuery({
    queryKey: queryKeys.venda(id),
    queryFn: () => vendasService.buscarPorId(id),
    enabled: Number.isFinite(id) && id > 0,
  });
}
