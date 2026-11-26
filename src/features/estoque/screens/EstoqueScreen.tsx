import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native-paper';

import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingState } from '@/components/feedback/LoadingState';
import { CheckboxField } from '@/components/forms/CheckboxField';
import { SearchField } from '@/components/forms/SearchField';
import { SelectField } from '@/components/forms/SelectField';
import { AppButton } from '@/components/ui/AppButton';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { useAppTheme } from '@/constants/theme';
import { ItemEstoqueCard } from '@/features/estoque/components/ItemEstoqueCard';
import { useEstoque } from '@/features/estoque/queries/useEstoque';
import type { OrdenacaoEstoque } from '@/features/estoque/types/estoque';
import { mensagemDeErro } from '@/types/api';

const ORDENACOES: { valor: OrdenacaoEstoque; rotulo: string }[] = [
  { valor: 'estoque-asc', rotulo: 'Menor estoque primeiro' },
  { valor: 'nome-asc', rotulo: 'Nome (A–Z)' },
];

export function EstoqueScreen() {
  const { cores } = useAppTheme();
  const { baixo } = useLocalSearchParams<{ baixo?: string }>();
  const [busca, setBusca] = useState('');
  const [somenteBaixo, setSomenteBaixo] = useState(baixo === '1');
  const [ordenacao, setOrdenacao] = useState<OrdenacaoEstoque>('estoque-asc');

  const estoque = useEstoque({ busca, somenteBaixo, ordenacao });

  return (
    <ScreenContainer>
      <PageHeader
        titulo="Estoque"
        subtitulo="Acompanhe e controle as quantidades dos produtos."
        acao={
          <AppButton
            titulo="Entrada de mercadoria"
            icone="plus"
            onPress={() => router.push('/estoque/entrada')}
          />
        }
      />
      <AppButton
        titulo="Ver entradas registradas"
        icone="history"
        variante="secundario"
        onPress={() => router.push('/estoque/entradas')}
      />

      <SearchField valor={busca} aoAlterar={setBusca} placeholder="Buscar produto pelo nome" />
      <CheckboxField
        rotulo="Mostrar só produtos com estoque baixo"
        marcado={somenteBaixo}
        aoAlterar={setSomenteBaixo}
      />
      <SelectField
        rotulo="Ordenar por"
        opcoes={ORDENACOES}
        valor={ordenacao}
        aoSelecionar={setOrdenacao}
        icone="sort"
      />

      {estoque.isLoading ? <LoadingState mensagem="Carregando estoque..." /> : null}
      {estoque.isError ? (
        <ErrorState
          mensagem={mensagemDeErro(estoque.error)}
          aoTentarNovamente={() => estoque.refetch()}
        />
      ) : null}
      {estoque.data && estoque.data.length === 0 ? (
        <EmptyState
          titulo={somenteBaixo ? 'Nenhum produto com estoque baixo' : 'Nenhum produto encontrado'}
          mensagem={
            somenteBaixo ? 'Ótimo! Todos os produtos estão com estoque suficiente.' : undefined
          }
          icone="package-variant"
        />
      ) : null}
      {estoque.data && estoque.data.length > 0 ? (
        <Text variant="bodyMedium" style={{ color: cores.textSecondary }}>
          Mostrando {estoque.data.length} produto(s)
        </Text>
      ) : null}

      {estoque.data?.map((item) => (
        <ItemEstoqueCard
          key={item.produtoId}
          item={item}
          aoRegistrarEntrada={() => router.push(`/estoque/entrada?produtoId=${item.produtoId}`)}
        />
      ))}
    </ScreenContainer>
  );
}
