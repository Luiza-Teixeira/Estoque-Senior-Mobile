import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native-paper';

import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingState } from '@/components/feedback/LoadingState';
import { SearchField } from '@/components/forms/SearchField';
import { AppButton } from '@/components/ui/AppButton';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { useAppTheme } from '@/constants/theme';
import { VendaCard } from '@/features/vendas/components/VendaCard';
import { useVendas } from '@/features/vendas/queries/useVendas';
import { mensagemDeErro } from '@/types/api';

export function VendasScreen() {
  const { cores } = useAppTheme();
  const { buscar } = useLocalSearchParams<{ buscar?: string }>();
  const [busca, setBusca] = useState('');
  const vendas = useVendas(busca);

  return (
    <ScreenContainer>
      <PageHeader
        titulo="Vendas"
        subtitulo="Gerencie as vendas realizadas e registre novas."
        acao={
          <AppButton
            titulo="Nova venda"
            icone="cart-plus"
            variante="sucesso"
            onPress={() => router.push('/vendas/nova')}
          />
        }
      />
      <SearchField
        valor={busca}
        aoAlterar={setBusca}
        placeholder="Buscar por cliente ou nº (ex.: V00003)"
        autoFocus={buscar === '1'}
      />

      {vendas.isLoading ? <LoadingState mensagem="Carregando vendas..." /> : null}
      {vendas.isError ? (
        <ErrorState
          mensagem={mensagemDeErro(vendas.error)}
          aoTentarNovamente={() => vendas.refetch()}
        />
      ) : null}
      {vendas.data && vendas.data.length === 0 ? (
        <EmptyState
          titulo={busca ? 'Nenhuma venda encontrada' : 'Nenhuma venda registrada'}
          icone="cart-outline"
          acao={
            busca
              ? undefined
              : {
                  titulo: 'Realizar venda',
                  icone: 'cart-plus',
                  aoPressionar: () => router.push('/vendas/nova'),
                }
          }
        />
      ) : null}
      {vendas.data && vendas.data.length > 0 ? (
        <Text variant="bodyMedium" style={{ color: cores.textSecondary }}>
          Mostrando {vendas.data.length} venda(s)
        </Text>
      ) : null}
      {vendas.data?.map((venda) => (
        <VendaCard key={venda.id} venda={venda} aoVer={() => router.push(`/vendas/${venda.id}`)} />
      ))}
    </ScreenContainer>
  );
}
