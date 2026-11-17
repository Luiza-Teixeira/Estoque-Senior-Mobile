import { router } from 'expo-router';

import { ErrorState } from '@/components/feedback/ErrorState';
import { useFeedback } from '@/components/feedback/feedbackStore';
import { LoadingState } from '@/components/feedback/LoadingState';
import { AppButton } from '@/components/ui/AppButton';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ProdutoForm } from '@/features/produtos/components/ProdutoForm';
import {
  ProdutoFormValores,
  useProdutoForm,
  valoresParaInput,
} from '@/features/produtos/hooks/useProdutoForm';
import { useAtualizarProduto } from '@/features/produtos/mutations/useAtualizarProduto';
import { useCriarProduto } from '@/features/produtos/mutations/useCriarProduto';
import { useProduto } from '@/features/produtos/queries/useProduto';
import type { Produto } from '@/features/produtos/types/produto';
import { useModo } from '@/hooks/useModo';
import { mensagemDeErro } from '@/types/api';

export function ProdutoFormScreen({ id }: { id?: number }) {
  const produto = useProduto(id ?? 0);

  if (id && produto.isLoading) return <LoadingState mensagem="Carregando produto..." />;
  if (id && produto.isError) {
    return (
      <ScreenContainer>
        <PageHeader titulo="Editar produto" voltar />
        <ErrorState
          mensagem={mensagemDeErro(produto.error)}
          aoTentarNovamente={() => produto.refetch()}
        />
      </ScreenContainer>
    );
  }
  // "key" recria o formulário quando os dados do produto chegam.
  return <Formulario key={produto.data?.id ?? 'novo'} produto={id ? produto.data : undefined} />;
}

function Formulario({ produto }: { produto?: Produto }) {
  const { simplificado } = useModo();
  const feedback = useFeedback();
  const edicao = !!produto;
  const { control, handleSubmit } = useProdutoForm(produto);
  const criar = useCriarProduto();
  const atualizar = useAtualizarProduto(produto?.id ?? 0);
  const salvando = criar.isPending || atualizar.isPending;

  function salvar(valores: ProdutoFormValores) {
    const dados = valoresParaInput(valores);
    const opcoes = {
      onSuccess: () => {
        feedback.sucesso(
          edicao ? 'Produto atualizado com sucesso.' : 'Produto cadastrado com sucesso.',
        );
        router.back();
      },
      onError: (erro: Error) => feedback.erro(mensagemDeErro(erro)),
    };
    if (edicao) {
      const { quantidadeEstoque: _ignorada, ...atualizacao } = dados;
      atualizar.mutate(atualizacao, opcoes);
    } else {
      criar.mutate(dados, opcoes);
    }
  }

  return (
    <ScreenContainer
      rodape={
        <>
          <AppButton titulo="Cancelar" variante="secundario" onPress={() => router.back()} />
          <AppButton
            titulo="Salvar produto"
            icone="content-save-outline"
            onPress={() => handleSubmit(salvar)()}
            loading={salvando}
            disabled={salvando}
          />
        </>
      }
    >
      <PageHeader
        titulo={edicao ? 'Editar produto' : 'Cadastrar produto'}
        subtitulo={simplificado ? 'Informe os dados principais.' : 'Preencha os dados do produto.'}
        voltar
      />
      <ProdutoForm control={control} edicao={edicao} simplificado={simplificado} />
    </ScreenContainer>
  );
}
