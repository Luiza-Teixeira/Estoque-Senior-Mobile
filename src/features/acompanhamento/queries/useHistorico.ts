import { useQuery } from '@tanstack/react-query';

import { historicoService } from '@/features/acompanhamento/services/historico.service';
import type {
  FiltrosHistorico,
  Movimentacao,
} from '@/features/acompanhamento/types/acompanhamento';
import { queryKeys } from '@/services/queryKeys';
import { ehHoje, normalizar } from '@/utils/formatadores';

const DIAS = { '7dias': 7, '30dias': 30 } as const;

function dentroDoPeriodo(iso: string, periodo: FiltrosHistorico['periodo']): boolean {
  if (periodo === 'todos') return true;
  if (periodo === 'hoje') return ehHoje(iso);
  const limite = new Date();
  limite.setDate(limite.getDate() - DIAS[periodo]);
  return new Date(iso) >= limite;
}

function filtrar(lista: Movimentacao[], f: FiltrosHistorico): Movimentacao[] {
  const termo = normalizar(f.busca);
  return lista
    .filter((m) => f.tipo === 'TODOS' || m.tipo === f.tipo)
    .filter((m) => dentroDoPeriodo(m.dataHora, f.periodo))
    .filter((m) => !termo || normalizar(m.nomeProduto).includes(termo));
}

export function useHistorico(filtros: FiltrosHistorico) {
  return useQuery({
    queryKey: queryKeys.historico,
    queryFn: historicoService.listar,
    select: (lista) => filtrar(lista, filtros),
  });
}
