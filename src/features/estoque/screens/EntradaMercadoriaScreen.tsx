import { router } from 'expo-router';

import { ErrorState } from '@/components/feedback/ErrorState';
import { useFeedback } from '@/components/feedback/feedbackStore';
import { LoadingState } from '@/components/feedback/LoadingState';
import { AppButton } from '@/components/ui/AppButton';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { EntradaForm } from '@/features/estoque/components/EntradaForm';
import {
  EntradaFormValores,
  useEntradaForm,
  valoresParaEntrada,
} from '@/features/estoque/hooks/useEntradaForm';
import { useRegistrarEntrada } from '@/features/estoque/mutations/useRegistrarEntrada';
import { useProdutos } from '@/features/produtos';
import { useModo } from '@/hooks/useModo';
import { mensagemDeErro } from '@/types/api';

export function EntradaMercadoriaScreen({ produtoIdInicial }: { produtoIdInicial?: number }) {
  const { simplificado } = useModo();
  const feedback = useFeedback();
  const produtos = useProdutos({ busca: '', ordenacao: 'nome-asc' });
  const registrar = useRegistrarEntrada();
  const { control, handleSubmit } = useEntradaForm(produtoIdInicial);

  function salvar(valores: EntradaFormValores) {
    const dados = valoresParaEntrada(valores);
    registrar.mutate(dados, {
      onSuccess: (entrada) => {
        feedback.sucesso(`Entrada registrada: +${entrada.quantidade} de ${entrada.produto.nome}.`);
        router.back();
      },
      onError: (erro) => feedback.erro(mensagemDeErro(erro)),
    });
  }

  return (
    <ScreenContainer
      rodape={
        <>
          <AppButton titulo="Cancelar" variante="secundario" onPress={() => router.back()} />
          <AppButton
            titulo="Registrar entrada"
            icone="content-save-outline"
            onPress={() => handleSubmit(salvar)()}
            loading={registrar.isPending}
            disabled={registrar.isPending || !produtos.data}
          />
        </>
      }
    >
      <PageHeader
        titulo="Entrada de mercadoria"
        subtitulo={
          simplificado
            ? 'Preencha as informações da entrada.'
            : 'Registre a entrada de novos produtos no estoque.'
        }
        voltar
      />
      {produtos.isLoading ? <LoadingState mensagem="Carregando produtos..." /> : null}
      {produtos.isError ? (
        <ErrorState
          mensagem={mensagemDeErro(produtos.error)}
          aoTentarNovamente={() => produtos.refetch()}
        />
      ) : null}
      {produtos.data ? (
        <EntradaForm control={control} produtos={produtos.data} simplificado={simplificado} />
      ) : null}
    </ScreenContainer>
  );
}
