import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native-paper';

import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingState } from '@/components/feedback/LoadingState';
import { SearchField } from '@/components/forms/SearchField';
import { SelectField } from '@/components/forms/SelectField';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { useAppTheme } from '@/constants/theme';
import { MovimentacaoCard } from '@/features/acompanhamento/components/MovimentacaoCard';
import { useHistorico } from '@/features/acompanhamento/queries/useHistorico';
import {
  FiltrosHistorico,
  OPCOES_PERIODO,
  OPCOES_TIPO,
  PeriodoHistorico,
} from '@/features/acompanhamento/types/acompanhamento';
import { mensagemDeErro } from '@/types/api';

export function HistoricoScreen() {
  const { cores } = useAppTheme();
  const params = useLocalSearchParams<{
    tipo?: FiltrosHistorico['tipo'];
    periodo?: PeriodoHistorico;
  }>();
  const [tipo, setTipo] = useState<FiltrosHistorico['tipo']>(params.tipo ?? 'TODOS');
  const [periodo, setPeriodo] = useState<PeriodoHistorico>(params.periodo ?? 'todos');
  const [busca, setBusca] = useState('');

  const historico = useHistorico({ tipo, periodo, busca });

  return (
    <ScreenContainer>
      <PageHeader titulo="Histórico" subtitulo="Consulte os registros de entradas e vendas." />
      <SearchField valor={busca} aoAlterar={setBusca} placeholder="Buscar pelo nome do produto" />
      <SelectField
        rotulo="Tipo de registro"
        opcoes={OPCOES_TIPO}
        valor={tipo}
        aoSelecionar={setTipo}
        icone="filter-outline"
      />
      <SelectField
        rotulo="Período"
        opcoes={OPCOES_PERIODO}
        valor={periodo}
        aoSelecionar={setPeriodo}
        icone="calendar"
      />

      {historico.isLoading ? <LoadingState mensagem="Carregando histórico..." /> : null}
      {historico.isError ? (
        <ErrorState
          mensagem={mensagemDeErro(historico.error)}
          aoTentarNovamente={() => historico.refetch()}
        />
      ) : null}
      {historico.data && historico.data.length === 0 ? (
        <EmptyState
          titulo="Nenhum registro encontrado"
          mensagem="Tente mudar o tipo ou o período."
          icone="clock-outline"
        />
      ) : null}
      {historico.data && historico.data.length > 0 ? (
        <Text variant="bodyMedium" style={{ color: cores.textSecondary }}>
          Mostrando {historico.data.length} registro(s)
        </Text>
      ) : null}
      {historico.data?.map((registro) => (
        <MovimentacaoCard
          key={registro.id}
          registro={registro}
          aoVer={() => router.push(`/historico/${registro.id}`)}
        />
      ))}
    </ScreenContainer>
  );
}
