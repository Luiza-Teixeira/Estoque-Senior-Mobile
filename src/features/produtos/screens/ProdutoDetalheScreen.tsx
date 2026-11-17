import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ConfirmDialog } from '@/components/feedback/ConfirmDialog';
import { ErrorState } from '@/components/feedback/ErrorState';
import { useFeedback } from '@/components/feedback/feedbackStore';
import { LoadingState } from '@/components/feedback/LoadingState';
import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { InfoRow } from '@/components/ui/InfoRow';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { StatusEstoqueChip } from '@/components/ui/StatusEstoqueChip';
import { espaco } from '@/constants/spacing';
import { useExcluirProduto } from '@/features/produtos/mutations/useExcluirProduto';
import { useProduto } from '@/features/produtos/queries/useProduto';
import { mensagemDeErro } from '@/types/api';
import { formatarCodigo, formatarMoeda } from '@/utils/formatadores';

export function ProdutoDetalheScreen({ id }: { id: number }) {
  const feedback = useFeedback();
  const produto = useProduto(id);
  const excluir = useExcluirProduto();
  const [confirmando, setConfirmando] = useState(false);

  function confirmarExclusao() {
    excluir.mutate(id, {
      onSuccess: () => {
        setConfirmando(false);
        feedback.sucesso('Produto excluído.');
        router.back();
      },
      onError: (erro) => {
        setConfirmando(false);
        feedback.erro(mensagemDeErro(erro));
      },
    });
  }

  if (produto.isLoading) return <LoadingState mensagem="Carregando produto..." />;

  const p = produto.data;
  return (
    <ScreenContainer>
      <PageHeader
        titulo="Detalhes do produto"
        subtitulo="Informações completas do produto."
        voltar
      />

      {produto.isError ? (
        <ErrorState
          mensagem={mensagemDeErro(produto.error)}
          aoTentarNovamente={() => produto.refetch()}
        />
      ) : null}

      {p ? (
        <>
          <AppCard>
            <InfoRow rotulo="Código" valor={formatarCodigo('P', p.id)} icone="barcode" />
            <InfoRow rotulo="Nome" valor={p.nome} icone="cube-outline" />
            <InfoRow
              rotulo="Categoria"
              valor={p.categoria ?? 'Não informada'}
              icone="tag-outline"
            />
            <InfoRow rotulo="Preço" valor={formatarMoeda(p.precoVenda)} icone="currency-usd" />
            <InfoRow
              rotulo="Em estoque"
              icone="package-variant"
              valor={
                <View style={styles.estoque}>
                  <Text variant="bodyLarge">{p.quantidadeEstoque} unidades</Text>
                  <StatusEstoqueChip quantidade={p.quantidadeEstoque} minimo={p.estoqueMinimo} />
                </View>
              }
            />
            <InfoRow rotulo="Mínimo" valor={`${p.estoqueMinimo} unidades`} icone="alert-outline" />
            {p.descricao ? <InfoRow rotulo="Descrição" valor={p.descricao} icone="text" /> : null}
          </AppCard>

          <AppButton
            titulo="Editar produto"
            icone="pencil"
            onPress={() => router.push(`/produtos/${id}/editar`)}
          />
          <AppButton
            titulo="Registrar entrada deste produto"
            icone="truck-delivery-outline"
            variante="secundario"
            onPress={() => router.push(`/estoque/entrada?produtoId=${id}`)}
          />
          <AppButton
            titulo="Excluir produto"
            icone="trash-can-outline"
            variante="perigo"
            onPress={() => setConfirmando(true)}
          />
        </>
      ) : null}

      <ConfirmDialog
        visivel={confirmando}
        titulo="Excluir produto?"
        mensagem={`Tem certeza que deseja excluir "${p?.nome}"? Essa ação não pode ser desfeita.`}
        textoConfirmar="Sim, excluir"
        perigo
        carregando={excluir.isPending}
        aoConfirmar={confirmarExclusao}
        aoCancelar={() => setConfirmando(false)}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  estoque: { gap: espaco.xs },
});
