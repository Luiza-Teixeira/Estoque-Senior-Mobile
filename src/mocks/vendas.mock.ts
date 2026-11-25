import type { Venda, VendaInput } from '@/features/vendas/types/venda';
import { db, erroMock, proximoId, simularRede, VendaRegistro } from '@/mocks/db';

function paraVenda(v: VendaRegistro): Venda {
  const total = v.itens.reduce((soma, item) => soma + item.quantidade * item.valorUnitario, 0);
  return { ...v, total: Math.round(total * 100) / 100 };
}

export const vendasMock = {
  listar: () =>
    simularRede<Venda[]>(() =>
      [...db.vendas].sort((a, b) => b.dataHora.localeCompare(a.dataHora)).map(paraVenda),
    ),

  buscarPorId: (id: number) =>
    simularRede<Venda>(() => {
      const venda = db.vendas.find((v) => v.id === id);
      if (!venda) throw erroMock(404, 'Venda não encontrada.');
      return paraVenda(venda);
    }),

  registrar: (dados: VendaInput) =>
    simularRede<Venda>(() => {
      if (dados.itens.length === 0) throw erroMock(400, 'Adicione pelo menos um produto.');

      // 1) Confere tudo antes de mexer no estoque.
      const itens = dados.itens.map(({ produtoId, quantidade }) => {
        if (quantidade <= 0) throw erroMock(400, 'A quantidade da venda deve ser maior que zero.');
        const produto = db.produtos.find((p) => p.id === produtoId);
        if (!produto) throw erroMock(404, 'Produto não encontrado.');
        const pedido = dados.itens
          .filter((i) => i.produtoId === produtoId)
          .reduce((soma, i) => soma + i.quantidade, 0);
        if (pedido > produto.quantidadeEstoque) {
          throw erroMock(
            409,
            `Estoque insuficiente para ${produto.nome}. Disponível: ${produto.quantidadeEstoque}.`,
          );
        }
        return { produto, quantidade };
      });

      itens.forEach(({ produto, quantidade }) => {
        produto.quantidadeEstoque -= quantidade;
      });
      const nova: VendaRegistro = {
        id: proximoId(db.vendas),
        itens: itens.map(({ produto, quantidade }) => ({
          produtoId: produto.id,
          nomeProduto: produto.nome,
          quantidade,
          valorUnitario: produto.precoVenda,
        })),
        formaPagamento: dados.formaPagamento,
        cliente: dados.cliente,
        dataHora: new Date().toISOString(),
      };
      db.vendas.push(nova);
      return paraVenda(nova);
    }),
};