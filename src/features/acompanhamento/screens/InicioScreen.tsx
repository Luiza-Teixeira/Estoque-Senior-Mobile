import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingState } from '@/components/feedback/LoadingState';
import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { espaco } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';
import { EstoqueBaixoList } from '@/features/acompanhamento/components/EstoqueBaixoList';
import { IndicadorCard } from '@/features/acompanhamento/components/IndicadorCard';
import { TrocarModoBotao } from '@/features/acompanhamento/components/TrocarModoBotao';
import { UltimasVendasList } from '@/features/acompanhamento/components/UltimasVendasList';
import { useResumoDashboard } from '@/features/acompanhamento/queries/useResumoDashboard';
import { useEstoqueBaixo } from '@/features/estoque';
import { useVendas } from '@/features/vendas';
import { useAuthStore } from '@/stores/authStore';
import { mensagemDeErro } from '@/types/api';
import { formatarMoeda } from '@/utils/formatadores';

export function InicioScreen() {
  const { cores } = useAppTheme();
  const usuario = useAuthStore((s) => s.usuario);
  const resumo = useResumoDashboard();
  const vendas = useVendas();
  const estoqueBaixo = useEstoqueBaixo();
  const r = resumo.data;

  return (
    <ScreenContainer>
      <PageHeader
        titulo="Visão geral"
        subtitulo={`Olá${usuario ? `, ${usuario.nome.split(' ')[0]}` : ''}! Acompanhe as vendas, o estoque e os alertas da sua loja.`}
      />
      <View style={styles.botoes}>
        <AppButton
          titulo="Nova venda"
          icone="cart-plus"
          variante="sucesso"
          onPress={() => router.push('/vendas/nova')}
        />
        <AppButton
          titulo="Adicionar mercadoria"
          icone="truck-delivery-outline"
          onPress={() => router.push('/estoque/entrada')}
        />
      </View>

      {resumo.isLoading ? <LoadingState mensagem="Carregando resumo..." /> : null}
      {resumo.isError ? (
        <ErrorState
          mensagem={mensagemDeErro(resumo.error)}
          aoTentarNovamente={() => resumo.refetch()}
        />
      ) : null}
      {r ? (
        <View style={styles.grade}>
          <IndicadorCard
            rotulo="Vendas do dia"
            valor={formatarMoeda(r.valorTotalVendidoDia)}
            detalhe={`${r.quantidadeVendasDia} venda(s) hoje`}
            icone="cart-outline"
            cor="verde"
            aoPressionar={() => router.push('/vendas?ver=lista')}
          />
          <IndicadorCard
            rotulo="Produtos cadastrados"
            valor={String(r.totalProdutosCadastrados)}
            icone="cube-outline"
            aoPressionar={() => router.push('/produtos?ver=lista')}
          />
          <IndicadorCard
            rotulo="Estoque baixo"
            valor={String(r.quantidadeProdutosEstoqueBaixo)}
            icone="alert-outline"
            cor="laranja"
            aoPressionar={() => router.push('/estoque?ver=lista&baixo=1')}
          />
          <IndicadorCard
            rotulo="Sem estoque"
            valor={String(r.quantidadeProdutosSemEstoque)}
            icone="close-circle-outline"
            cor="vermelho"
            aoPressionar={() => router.push('/estoque?ver=lista&baixo=1')}
          />
        </View>
      ) : null}

      <AppCard>
        <View style={styles.tituloSecao}>
          <Text variant="titleLarge" style={[styles.flex, { color: cores.navy }]}>
            Últimas vendas
          </Text>
          <AppButton
            titulo="Ver histórico"
            variante="texto"
            icone="chevron-right"
            contentStyle={styles.reverso}
            onPress={() => router.push('/historico?ver=lista')}
          />
        </View>
        {vendas.isLoading ? <LoadingState /> : null}
        {vendas.data ? <UltimasVendasList vendas={vendas.data} /> : null}
      </AppCard>

      <AppCard>
        <Text variant="titleLarge" style={{ color: cores.navy }}>
          Produtos com estoque baixo
        </Text>
        <Text variant="bodyMedium" style={{ color: cores.textSecondary }}>
          Reponha em breve para evitar a falta de produtos.
        </Text>
        {estoqueBaixo.isLoading ? <LoadingState /> : null}
        {estoqueBaixo.data ? <EstoqueBaixoList itens={estoqueBaixo.data} /> : null}
      </AppCard>

      <TrocarModoBotao />
      <AppButton
        titulo="Sobre o aplicativo"
        icone="information-outline"
        variante="texto"
        onPress={() => router.push('/sobre')}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  botoes: { gap: espaco.sm },
  flex: { flex: 1 },
  grade: { flexDirection: 'row', flexWrap: 'wrap', gap: espaco.sm },
  tituloSecao: { flexDirection: 'row', alignItems: 'center' },
  reverso: { flexDirection: 'row-reverse' },
});
