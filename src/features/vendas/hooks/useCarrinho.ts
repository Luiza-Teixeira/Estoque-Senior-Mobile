import { useMemo, useState } from 'react';

import type { Produto } from '@/features/produtos';
import type { FormaPagamento, VendaInput } from '@/features/vendas/types/venda';

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}

export function useCarrinho() {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  const limitar = (produto: Produto, quantidade: number) =>
    Math.max(1, Math.min(quantidade, produto.quantidadeEstoque));

  function adicionar(produto: Produto, quantidade = 1) {
    if (produto.quantidadeEstoque <= 0) return;
    setItens((atuais) => {
      const existente = atuais.find((i) => i.produto.id === produto.id);
      if (existente) {
        return atuais.map((i) =>
          i.produto.id === produto.id
            ? { ...i, quantidade: limitar(produto, i.quantidade + quantidade) }
            : i,
        );
      }
      return [...atuais, { produto, quantidade: limitar(produto, quantidade) }];
    });
  }

  function alterarQuantidade(produtoId: number, quantidade: number) {
    setItens((atuais) =>
      atuais.map((i) =>
        i.produto.id === produtoId ? { ...i, quantidade: limitar(i.produto, quantidade) } : i,
      ),
    );
  }

  function remover(produtoId: number) {
    setItens((atuais) => atuais.filter((i) => i.produto.id !== produtoId));
  }

  function limpar() {
    setItens([]);
  }

  const total = useMemo(
    () => itens.reduce((soma, i) => soma + i.quantidade * i.produto.precoVenda, 0),
    [itens],
  );

  function paraInput(formaPagamento: FormaPagamento, cliente?: string): VendaInput {
    return {
      itens: itens.map((i) => ({ produtoId: i.produto.id, quantidade: i.quantidade })),
      formaPagamento,
      cliente: cliente?.trim() || undefined,
    };
  }

  return { itens, total, adicionar, alterarQuantidade, remover, limpar, paraInput };
}
