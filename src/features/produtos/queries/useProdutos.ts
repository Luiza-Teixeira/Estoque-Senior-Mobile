import { useQuery } from '@tanstack/react-query';

import { produtosService } from '@/features/produtos/services/produtos.service';
import type { FiltrosProdutos, Produto } from '@/features/produtos/types/produto';
import { queryKeys } from '@/services/queryKeys';
import { normalizar } from '@/utils/formatadores';

function aplicarFiltros(lista: Produto[], filtros?: FiltrosProdutos): Produto[] {
  if (!filtros) return lista;
  const busca = normalizar(filtros.busca);
  const filtrada = busca
    ? lista.filter(
        (p) =>
          normalizar(p.nome).includes(busca) || String(p.id).includes(busca.replace(/^p0*/, '')),
      )
    : lista;

  return [...filtrada].sort((a, b) => {
    switch (filtros.ordenacao) {
      case 'nome-desc':
        return b.nome.localeCompare(a.nome);
      case 'preco-asc':
        return a.precoVenda - b.precoVenda;
      case 'estoque-asc':
        return a.quantidadeEstoque - b.quantidadeEstoque;
      default:
        return a.nome.localeCompare(b.nome);
    }
  });
}

export function useProdutos(filtros?: FiltrosProdutos) {
  return useQuery({
    queryKey: queryKeys.produtos,
    queryFn: produtosService.listar,
    select: (lista) => aplicarFiltros(lista, filtros),
  });
}
