import { router } from 'expo-router';

import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingState } from '@/components/feedback/LoadingState';
import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { InfoRow } from '@/components/ui/InfoRow';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { TipoMovimentacaoChip } from '@/features/acompanhamento/components/TipoMovimentacaoChip';
import { useMovimentacao } from '@/features/acompanhamento/queries/useMovimentacao';
import { useModo } from '@/hooks/useModo';
import { mensagemDeErro } from '@/types/api';
import { formatarCodigo, formatarDataHora, formatarMoeda } from '@/utils/formatadores';

export function MovimentacaoDetalheScreen({ id }: { id: string }) {
  const { simplificado } = useModo();
  const registro = useMovimentacao(id);

  if (registro.isLoading) return <LoadingState mensagem="Carregando registro..." />;
  const m = registro.data;
  const ehEntrada = m?.tipo === 'ENTRADA';

  return (
    <ScreenContainer>
      <PageHeader
        titulo="Detalhes do registro"
        subtitulo={
          simplificado
            ? 'Informações principais da movimentação.'
            : 'Veja as informações completas da movimentação.'
        }
        voltar
      />
      {registro.isError ? (
        <ErrorState
          mensagem={mensagemDeErro(registro.error)}
          aoTentarNovamente={() => registro.refetch()}
        />
      ) : null}
      {m ? (
        <>
          <AppCard>
            <InfoRow
              rotulo="Tipo"
              valor={<TipoMovimentacaoChip tipo={m.tipo} />}
              icone={ehEntrada ? 'arrow-up' : 'cart-outline'}
            />
            <InfoRow
              rotulo="Número"
              valor={
                ehEntrada
                  ? formatarCodigo('E', m.referenciaId)
                  : formatarCodigo('V', m.referenciaId)
              }
              icone="barcode"
            />
            <InfoRow rotulo="Data e hora" valor={formatarDataHora(m.dataHora)} icone="calendar" />
            <InfoRow rotulo="Produto" valor={m.nomeProduto} icone="cube-outline" />
            <InfoRow
              rotulo="Quantidade"
              valor={`${m.quantidade} unidades`}
              icone="package-variant"
            />
            {!simplificado ? (
              <InfoRow
                rotulo={ehEntrada ? 'Custo/un' : 'Preço/un'}
                valor={formatarMoeda(m.valorUnitario)}
                icone="currency-usd"
              />
            ) : null}
            <InfoRow
              rotulo="Valor total"
              valor={formatarMoeda(m.quantidade * m.valorUnitario)}
              icone="cash-multiple"
            />
          </AppCard>
          <AppButton
            titulo={ehEntrada ? 'Ver entrada completa' : 'Ver venda completa'}
            icone="eye-outline"
            onPress={() =>
              router.push(
                ehEntrada ? `/estoque/entradas/${m.referenciaId}` : `/vendas/${m.referenciaId}`,
              )
            }
          />
          <AppButton
            titulo="Ver produto"
            icone="cube-outline"
            variante="secundario"
            onPress={() => router.push(`/produtos/${m.produtoId}`)}
          />
        </>
      ) : null}
    </ScreenContainer>
  );
}
