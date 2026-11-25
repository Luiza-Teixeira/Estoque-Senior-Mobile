import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingState } from '@/components/feedback/LoadingState';
import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { InfoRow } from '@/components/ui/InfoRow';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { espaco } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';
import { FormaPagamentoChip } from '@/features/vendas/components/FormaPagamentoChip';
import { TotalVendaBar } from '@/features/vendas/components/TotalVendaBar';
import { useVenda } from '@/features/vendas/queries/useVenda';
import { mensagemDeErro } from '@/types/api';
import { formatarCodigo, formatarDataHora, formatarMoeda } from '@/utils/formatadores';

export function VendaDetalheScreen({ id }: { id: number }) {
  const { cores } = useAppTheme();
  const venda = useVenda(id);

  if (venda.isLoading) return <LoadingState mensagem="Carregando venda..." />;
  const v = venda.data;

  return (
    <ScreenContainer>
      <PageHeader
        titulo={`Venda ${formatarCodigo('V', id)}`}
        subtitulo="Informações completas da venda."
        voltar
      />
      {venda.isError ? (
        <ErrorState
          mensagem={mensagemDeErro(venda.error)}
          aoTentarNovamente={() => venda.refetch()}
        />
      ) : null}
      {v ? (
        <>
          <AppCard>
            <InfoRow rotulo="Data e hora" valor={formatarDataHora(v.dataHora)} icone="calendar" />
            <InfoRow
              rotulo="Cliente"
              valor={v.cliente ?? 'Não informado'}
              icone="account-outline"
            />
            <InfoRow
              rotulo="Pagamento"
              valor={<FormaPagamentoChip forma={v.formaPagamento} />}
              icone="credit-card-outline"
            />
          </AppCard>
          <AppCard>
            <Text variant="titleLarge" style={{ color: cores.navy }}>
              Itens da venda
            </Text>
            {v.itens.map((item) => (
              <View key={item.produtoId} style={[styles.item, { borderBottomColor: cores.border }]}>
                <Text variant="titleSmall" style={{ color: cores.text }}>
                  {item.nomeProduto}
                </Text>
                <Text variant="bodyLarge" style={{ color: cores.textSecondary }}>
                  {item.quantidade} un × {formatarMoeda(item.valorUnitario)} ={' '}
                  {formatarMoeda(item.quantidade * item.valorUnitario)}
                </Text>
              </View>
            ))}
          </AppCard>
          <TotalVendaBar total={v.total} />
          <AppButton
            titulo="Fazer nova venda"
            icone="cart-plus"
            variante="sucesso"
            onPress={() => router.replace('/vendas/nova')}
          />
        </>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  item: { gap: 2, paddingVertical: espaco.sm, borderBottomWidth: StyleSheet.hairlineWidth },
});
