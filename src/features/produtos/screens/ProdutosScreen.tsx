import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native-paper';

import { ConfirmDialog } from '@/components/feedback/ConfirmDialog';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { useFeedback } from '@/components/feedback/feedbackStore';
import { LoadingState } from '@/components/feedback/LoadingState';
import { SearchField } from '@/components/forms/SearchField';
import { SelectField } from '@/components/forms/SelectField';
import { AppButton } from '@/components/ui/AppButton';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { useAppTheme } from '@/constants/theme';
import { ProdutoCard } from '@/features/produtos/components/ProdutoCard';
import { useExcluirProduto } from '@/features/produtos/mutations/useExcluirProduto';
import { useProdutos } from '@/features/produtos/queries/useProdutos';
import { OPCOES_ORDENACAO, OrdenacaoProdutos, Produto } from '@/features/produtos/types/produto';
import { mensagemDeErro } from '@/types/api';

export function ProdutosScreen() {
  const { cores } = useAppTheme();
  const { buscar } = useLocalSearchParams<{ buscar?: string }>();
  const feedback = useFeedback();
  const [busca, setBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState<OrdenacaoProdutos>('nome-asc');
  const [paraExcluir, setParaExcluir] = useState<Produto | null>(null);

  const produtos = useProdutos({ busca, ordenacao });
  const excluir = useExcluirProduto();

  function confirmarExclusao() {
    if (!paraExcluir) return;
    excluir.mutate(paraExcluir.id, {
      onSuccess: () => feedback.sucesso(`Produto "${paraExcluir.nome}" excluído.`),
      onError: (erro) => feedback.erro(mensagemDeErro(erro)),
      onSettled: () => setParaExcluir(null),
    });
  }

  return (
    <ScreenContainer>
      <PageHeader
        titulo="Produtos"
        subtitulo="Gerencie os produtos do seu estoque."
        acao={
          <AppButton
            titulo="Novo produto"
            icone="plus"
            onPress={() => router.push('/produtos/novo')}
          />
        }
      />

      <SearchField
        valor={busca}
        aoAlterar={setBusca}
        placeholder="Buscar por nome ou código"
        autoFocus={buscar === '1'}
      />
      <SelectField
        rotulo="Ordenar por"
        opcoes={OPCOES_ORDENACAO}
        valor={ordenacao}
        aoSelecionar={setOrdenacao}
        icone="sort"
      />

      {produtos.isLoading ? <LoadingState mensagem="Carregando produtos..." /> : null}

      {produtos.isError ? (
        <ErrorState
          mensagem={mensagemDeErro(produtos.error)}
          aoTentarNovamente={() => produtos.refetch()}
        />
      ) : null}

      {produtos.data && produtos.data.length === 0 ? (
        <EmptyState
          titulo={busca ? 'Nenhum produto encontrado' : 'Nenhum produto cadastrado'}
          mensagem={busca ? 'Tente buscar com outro nome.' : 'Cadastre o primeiro produto da loja.'}
          icone="cube-outline"
          acao={
            busca
              ? undefined
              : {
                  titulo: 'Cadastrar produto',
                  icone: 'plus',
                  aoPressionar: () => router.push('/produtos/novo'),
                }
          }
        />
      ) : null}

      {produtos.data && produtos.data.length > 0 ? (
        <Text variant="bodyMedium" style={{ color: cores.textSecondary }}>
          Mostrando {produtos.data.length} produto(s)
        </Text>
      ) : null}

      {produtos.data?.map((produto) => (
        <ProdutoCard
          key={produto.id}
          produto={produto}
          aoVer={() => router.push(`/produtos/${produto.id}`)}
          aoEditar={() => router.push(`/produtos/${produto.id}/editar`)}
          aoExcluir={() => setParaExcluir(produto)}
        />
      ))}

      <ConfirmDialog
        visivel={!!paraExcluir}
        titulo="Excluir produto?"
        mensagem={`Tem certeza que deseja excluir "${paraExcluir?.nome}"? Essa ação não pode ser desfeita.`}
        textoConfirmar="Sim, excluir"
        perigo
        carregando={excluir.isPending}
        aoConfirmar={confirmarExclusao}
        aoCancelar={() => setParaExcluir(null)}
      />
    </ScreenContainer>
  );
}
