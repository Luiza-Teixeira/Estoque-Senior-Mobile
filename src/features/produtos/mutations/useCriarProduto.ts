import { useMutation, useQueryClient } from '@tanstack/react-query';

import { produtosService } from '@/features/produtos/services/produtos.service';
import type { ProdutoInput } from '@/features/produtos/types/produto';
import { queryKeys } from '@/services/queryKeys';

export function useCriarProduto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dados: ProdutoInput) => produtosService.criar(dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.produtos });
      queryClient.invalidateQueries({ queryKey: queryKeys.estoque });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });
}
