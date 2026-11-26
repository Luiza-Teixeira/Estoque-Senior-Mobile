import { useQuery } from '@tanstack/react-query';

import { entradasService } from '@/features/estoque/services/entradas.service';
import { queryKeys } from '@/services/queryKeys';

export function useEntrada(id: number) {
  return useQuery({
    queryKey: queryKeys.entrada(id),
    queryFn: () => entradasService.buscarPorId(id),
    enabled: Number.isFinite(id) && id > 0,
  });
}
