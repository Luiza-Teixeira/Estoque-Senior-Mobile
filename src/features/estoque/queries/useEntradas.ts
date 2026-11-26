import { useQuery } from '@tanstack/react-query';

import { entradasService } from '@/features/estoque/services/entradas.service';
import { queryKeys } from '@/services/queryKeys';

export function useEntradas() {
  return useQuery({
    queryKey: queryKeys.entradas,
    queryFn: entradasService.listar,
  });
}
