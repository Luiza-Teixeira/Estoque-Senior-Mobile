import { useQuery } from '@tanstack/react-query';

import { estoqueService } from '@/features/estoque/services/estoque.service';
import type { FiltrosEstoque, ItemEstoque } from '@/features/estoque/types/estoque';
import { queryKeys } from '@/services/queryKeys';
import { normalizar } from '@/utils/formatadores';

function aplicarFiltros(lista: ItemEstoque[], filtros: FiltrosEstoque): ItemEstoque[] {
  const busca = normalizar(filtros.busca);
  return lista
    .filter((item) => !filtros.somenteBaixo || item.estoqueBaixo)
    .filter((item) => !busca || normalizar(item.nomeProduto).includes(busca))
    .sort((a, b) =>
      filtros.ordenacao === 'nome-asc'
        ? a.nomeProduto.localeCompare(b.nomeProduto)
        : a.quantidadeEstoque - b.quantidadeEstoque,
    );
}

export function useEstoque(filtros: FiltrosEstoque) {
  return useQuery({
    queryKey: queryKeys.estoque,
    queryFn: estoqueService.listar,
    select: (lista) => aplicarFiltros(lista, filtros),
  });
}
