import { useQuery } from '@tanstack/react-query';

import { estoqueService } from '@/features/estoque/services/estoque.service';
import { queryKeys } from '@/services/queryKeys';

export function useEstoqueBaixo() {
  return useQuery({
    queryKey: queryKeys.estoqueBaixo,
    queryFn: estoqueService.listarBaixo,
  });
}
