import { useMutation, useQueryClient } from '@tanstack/react-query';

import { produtosService } from '@/features/produtos/services/produtos.service';
import { queryKeys } from '@/services/queryKeys';

export function useExcluirProduto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => produtosService.excluir(id),
    onSuccess: (_resultado, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.produto(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.produtos });
      queryClient.invalidateQueries({ queryKey: queryKeys.estoque });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });
}
