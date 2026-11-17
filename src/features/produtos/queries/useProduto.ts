import { useQuery } from '@tanstack/react-query';

import { produtosService } from '@/features/produtos/services/produtos.service';
import { queryKeys } from '@/services/queryKeys';

export function useProduto(id: number) {
  return useQuery({
    queryKey: queryKeys.produto(id),
    queryFn: () => produtosService.buscarPorId(id),
    enabled: Number.isFinite(id) && id > 0,
  });
}
