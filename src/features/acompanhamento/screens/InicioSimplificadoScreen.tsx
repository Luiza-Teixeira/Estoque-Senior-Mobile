import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ActionCard } from '@/components/ui/ActionCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { espaco } from '@/constants/spacing';
import { IndicadorCard } from '@/features/acompanhamento/components/IndicadorCard';
import { TrocarModoBotao } from '@/features/acompanhamento/components/TrocarModoBotao';
import { useResumoDashboard } from '@/features/acompanhamento/queries/useResumoDashboard';
import { formatarMoeda } from '@/utils/formatadores';

export function InicioSimplificadoScreen() {
  const resumo = useResumoDashboard();
  const r = resumo.data;

  return (
    <ScreenContainer>
      <PageHeader
        titulo="O que você deseja fazer?"
        subtitulo="Escolha uma ação principal para continuar."
      />
      <ActionCard
        titulo="Registrar venda"
        descricao="Fazer uma nova venda."
        icone="cart-outline"
        cor="verde"
        aoPressionar={() => router.push('/vendas/nova')}
      />
      <ActionCard
        titulo="Adicionar mercadoria"
        descricao="Registrar produtos que chegaram."
        icone="cube-outline"
        aoPressionar={() => router.push('/estoque/entrada')}
      />
      <ActionCard
        titulo="Consultar estoque"
        descricao="Ver a quantidade disponível."
        icone="layers-outline"
        cor="laranja"
        aoPressionar={() => router.push('/estoque?ver=lista')}
      />
      <ActionCard
        titulo="Ver histórico"
        descricao="Consultar vendas e movimentações."
        icone="clock-outline"
        aoPressionar={() => router.push('/historico?ver=lista')}
      />
      {r ? (
        <View style={styles.grade}>
          <IndicadorCard
            rotulo="Estoque baixo"
            valor={`${r.quantidadeProdutosEstoqueBaixo} produtos`}
            icone="alert-outline"
            cor="laranja"
            aoPressionar={() => router.push('/estoque?ver=lista&baixo=1')}
          />
          <IndicadorCard
            rotulo="Vendas de hoje"
            valor={formatarMoeda(r.valorTotalVendidoDia)}
            icone="cart-outline"
            cor="verde"
          />
        </View>
      ) : null}
      <TrocarModoBotao />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  grade: { flexDirection: 'row', flexWrap: 'wrap', gap: espaco.sm },
});
