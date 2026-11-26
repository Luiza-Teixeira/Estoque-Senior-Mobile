import { useMutation, useQueryClient } from '@tanstack/react-query';

import { entradasService } from '@/features/estoque/services/entradas.service';
import type { EntradaInput } from '@/features/estoque/types/estoque';
import { queryKeys } from '@/services/queryKeys';

export function useRegistrarEntrada() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dados: EntradaInput) => entradasService.registrar(dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.entradas });
      queryClient.invalidateQueries({ queryKey: queryKeys.estoque });
      queryClient.invalidateQueries({ queryKey: queryKeys.produtos });
      queryClient.invalidateQueries({ queryKey: queryKeys.historico });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });
}
