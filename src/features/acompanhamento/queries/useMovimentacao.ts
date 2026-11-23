import { useQuery } from '@tanstack/react-query';

import { historicoService } from '@/features/acompanhamento/services/historico.service';
import { queryKeys } from '@/services/queryKeys';

export function useMovimentacao(id: string) {
  return useQuery({
    queryKey: queryKeys.movimentacao(id),
    queryFn: () => historicoService.buscarPorId(id),
    enabled: !!id,
  });
}
