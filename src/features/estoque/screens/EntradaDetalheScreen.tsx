import { router } from 'expo-router';

import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingState } from '@/components/feedback/LoadingState';
import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { InfoRow } from '@/components/ui/InfoRow';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { useEntrada } from '@/features/estoque/queries/useEntrada';
import { mensagemDeErro } from '@/types/api';
import { formatarCodigo, formatarDataHora, formatarMoeda } from '@/utils/formatadores';

export function EntradaDetalheScreen({ id }: { id: number }) {
  const entrada = useEntrada(id);

  if (entrada.isLoading) return <LoadingState mensagem="Carregando entrada..." />;
  const e = entrada.data;

  return (
    <ScreenContainer>
      <PageHeader
        titulo="Detalhe da entrada"
        subtitulo="Informações da mercadoria que chegou."
        voltar
      />
      {entrada.isError ? (
        <ErrorState
          mensagem={mensagemDeErro(entrada.error)}
          aoTentarNovamente={() => entrada.refetch()}
        />
      ) : null}
      {e ? (
        <>
          <AppCard>
            <InfoRow rotulo="Código" valor={formatarCodigo('E', e.id)} icone="barcode" />
            <InfoRow rotulo="Produto" valor={e.produto.nome} icone="cube-outline" />
            <InfoRow
              rotulo="Quantidade"
              valor={`${e.quantidade} unidades`}
              icone="package-variant"
            />
            <InfoRow
              rotulo="Custo/un"
              valor={formatarMoeda(e.custoUnitario)}
              icone="currency-usd"
            />
            <InfoRow
              rotulo="Total"
              valor={formatarMoeda(e.custoUnitario * e.quantidade)}
              icone="cash-multiple"
            />
            <InfoRow rotulo="Data e hora" valor={formatarDataHora(e.dataHora)} icone="calendar" />
            {e.fornecedor ? (
              <InfoRow rotulo="Fornecedor" valor={e.fornecedor} icone="truck-outline" />
            ) : null}
            {e.observacao ? (
              <InfoRow rotulo="Observação" valor={e.observacao} icone="text" />
            ) : null}
          </AppCard>
          <AppButton
            titulo="Ver produto"
            icone="cube-outline"
            variante="secundario"
            onPress={() => router.push(`/produtos/${e.produto.id}`)}
          />
        </>
      ) : null}
    </ScreenContainer>
  );
}
