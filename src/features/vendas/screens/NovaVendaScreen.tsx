import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ErrorState } from '@/components/feedback/ErrorState';
import { useFeedback } from '@/components/feedback/feedbackStore';
import { LoadingState } from '@/components/feedback/LoadingState';
import { QuantityStepper } from '@/components/forms/QuantityStepper';
import { SelectField } from '@/components/forms/SelectField';
import { TextField } from '@/components/forms/TextField';
import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { espaco } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';
import { Produto, useProdutos } from '@/features/produtos';
import { ItemVendaRow } from '@/features/vendas/components/ItemVendaRow';
import { TotalVendaBar } from '@/features/vendas/components/TotalVendaBar';
import { useCarrinho } from '@/features/vendas/hooks/useCarrinho';
import { useRegistrarVenda } from '@/features/vendas/mutations/useRegistrarVenda';
import { FORMAS_PAGAMENTO, FormaPagamento } from '@/features/vendas/types/venda';
import { useModo } from '@/hooks/useModo';
import { mensagemDeErro } from '@/types/api';
import { formatarCodigo, formatarMoeda } from '@/utils/formatadores';

function opcoesDeProduto(produtos: Produto[]) {
  return produtos.map((p) => ({
    valor: p.id,
    rotulo: `${p.nome} — ${formatarMoeda(p.precoVenda)}`,
    descricao: p.quantidadeEstoque > 0 ? `${p.quantidadeEstoque} em estoque` : 'Sem estoque',
    desabilitado: p.quantidadeEstoque <= 0,
  }));
}

export function NovaVendaScreen() {
  const { cores } = useAppTheme();
  const { simplificado } = useModo();
  const feedback = useFeedback();
  const produtos = useProdutos({ busca: '', ordenacao: 'nome-asc' });
  const registrar = useRegistrarVenda();
  const carrinho = useCarrinho();

  const [cliente, setCliente] = useState('');
  const [pagamento, setPagamento] = useState<FormaPagamento | null>(null);
  const [produtoEscolhido, setProdutoEscolhido] = useState<number | null>(null);
  const [quantidadeSimples, setQuantidadeSimples] = useState(1);
  const [erroPagamento, setErroPagamento] = useState<string>();
  const [erroItens, setErroItens] = useState<string>();

  const produtoSelecionado = produtos.data?.find((p) => p.id === produtoEscolhido);

  function adicionarProduto() {
    if (!produtoSelecionado) {
      setErroItens('Escolha um produto para adicionar.');
      return;
    }
    carrinho.adicionar(produtoSelecionado);
    setProdutoEscolhido(null);
    setErroItens(undefined);
  }

  function finalizar() {
    const temProduto = simplificado ? !!produtoSelecionado : carrinho.itens.length > 0;
    setErroItens(
      temProduto
        ? undefined
        : simplificado
          ? 'Escolha o produto.'
          : 'Adicione pelo menos um produto.',
    );
    setErroPagamento(pagamento ? undefined : 'Escolha a forma de pagamento.');
    if (!temProduto || !pagamento) return;

    const dados =
      simplificado && produtoSelecionado
        ? {
            itens: [{ produtoId: produtoSelecionado.id, quantidade: quantidadeSimples }],
            formaPagamento: pagamento,
            cliente: cliente.trim() || undefined,
          }
        : carrinho.paraInput(pagamento, cliente);

    registrar.mutate(dados, {
      onSuccess: (nova) => {
        feedback.sucesso(
          `Venda ${formatarCodigo('V', nova.id)} registrada: ${formatarMoeda(nova.total)}.`,
        );
        router.replace(`/vendas/${nova.id}`);
      },
      onError: (erro) => feedback.erro(mensagemDeErro(erro)),
    });
  }

  const totalSimples = (produtoSelecionado?.precoVenda ?? 0) * quantidadeSimples;

  return (
    <ScreenContainer
      rodape={
        <>
          <AppButton titulo="Cancelar" variante="secundario" onPress={() => router.back()} />
          <AppButton
            titulo="Finalizar venda"
            icone="check-bold"
            variante="sucesso"
            onPress={finalizar}
            loading={registrar.isPending}
            disabled={registrar.isPending}
          />
        </>
      }
    >
      <PageHeader
        titulo="Realizar venda"
        subtitulo={
          simplificado
            ? 'Preencha as informações e finalize a venda.'
            : 'Adicione os produtos, informe o cliente e finalize a venda.'
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
        <>
          <AppCard>
            <TextField
              rotulo="Cliente (opcional)"
              value={cliente}
              onChangeText={setCliente}
              placeholder="Ex.: Maria Silva"
              icone="account-outline"
            />
            <SelectField
              rotulo="Forma de pagamento"
              obrigatorio
              opcoes={FORMAS_PAGAMENTO}
              valor={pagamento}
              aoSelecionar={(v) => {
                setPagamento(v);
                setErroPagamento(undefined);
              }}
              erro={erroPagamento}
              icone="credit-card-outline"
            />
          </AppCard>

          <AppCard>
            <Text variant="titleLarge" style={{ color: cores.navy }}>
              {simplificado ? 'Produto' : 'Produtos da venda'}
            </Text>
            <SelectField
              rotulo="Produto"
              obrigatorio
              placeholder="Selecione o produto"
              opcoes={opcoesDeProduto(produtos.data)}
              valor={produtoEscolhido}
              aoSelecionar={(id) => {
                setProdutoEscolhido(id);
                setQuantidadeSimples(1);
                setErroItens(undefined);
              }}
              erro={erroItens}
              icone="cube-outline"
            />

            {simplificado ? (
              <QuantityStepper
                rotulo="Quantidade"
                valor={quantidadeSimples}
                aoAlterar={setQuantidadeSimples}
                minimo={1}
                maximo={produtoSelecionado?.quantidadeEstoque}
              />
            ) : (
              <>
                <AppButton titulo="Adicionar à venda" icone="plus" onPress={adicionarProduto} />
                {carrinho.itens.length === 0 ? (
                  <Text variant="bodyLarge" style={{ color: cores.textSecondary }}>
                    Nenhum produto adicionado ainda.
                  </Text>
                ) : null}
                <View style={styles.itens}>
                  {carrinho.itens.map((item) => (
                    <ItemVendaRow
                      key={item.produto.id}
                      item={item}
                      aoAlterarQuantidade={(q) => carrinho.alterarQuantidade(item.produto.id, q)}
                      aoRemover={() => carrinho.remover(item.produto.id)}
                    />
                  ))}
                </View>
              </>
            )}
          </AppCard>

          <TotalVendaBar total={simplificado ? totalSimples : carrinho.total} />
        </>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  itens: { gap: espaco.md },
});
