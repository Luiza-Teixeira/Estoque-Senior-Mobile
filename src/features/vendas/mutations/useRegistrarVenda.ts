import { useMutation, useQueryClient } from '@tanstack/react-query';

import { vendasService } from '@/features/vendas/services/vendas.service';
import type { VendaInput } from '@/features/vendas/types/venda';
import { queryKeys } from '@/services/queryKeys';

export function useRegistrarVenda() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dados: VendaInput) => vendasService.registrar(dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.vendas });
      queryClient.invalidateQueries({ queryKey: queryKeys.produtos });
      queryClient.invalidateQueries({ queryKey: queryKeys.estoque });
      queryClient.invalidateQueries({ queryKey: queryKeys.historico });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });
}
