import { useMutation, useQueryClient } from '@tanstack/react-query';

import { produtosService } from '@/features/produtos/services/produtos.service';
import type { ProdutoAtualizacao } from '@/features/produtos/types/produto';
import { queryKeys } from '@/services/queryKeys';

export function useAtualizarProduto(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dados: ProdutoAtualizacao) => produtosService.atualizar(id, dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.produtos });
      queryClient.invalidateQueries({ queryKey: queryKeys.estoque });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });
}
