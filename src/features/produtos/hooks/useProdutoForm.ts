import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { Produto, ProdutoInput } from '@/features/produtos/types/produto';
import { paraNumero } from '@/utils/formatadores';

const inteiroNaoNegativo = (mensagem: string) =>
  z.string().refine((v) => Number.isInteger(paraNumero(v)) && paraNumero(v) >= 0, mensagem);

export const produtoSchema = z.object({
  nome: z.string().trim().min(2, 'Informe o nome do produto.'),
  precoVenda: z
    .string()
    .refine((v) => paraNumero(v) > 0, 'Informe um preço maior que zero. Ex.: 12,90'),
  quantidadeEstoque: inteiroNaoNegativo('Informe a quantidade (0 ou mais, sem vírgula).'),
  estoqueMinimo: inteiroNaoNegativo('Informe o estoque mínimo (0 ou mais, sem vírgula).'),
  categoria: z.string(),
  descricao: z.string(),
});

export type ProdutoFormValores = z.infer<typeof produtoSchema>;

export function useProdutoForm(produto?: Produto) {
  return useForm<ProdutoFormValores>({
    resolver: zodResolver(produtoSchema),
    defaultValues: {
      nome: produto?.nome ?? '',
      precoVenda: produto ? produto.precoVenda.toFixed(2).replace('.', ',') : '',
      quantidadeEstoque: produto ? String(produto.quantidadeEstoque) : '',
      estoqueMinimo: produto ? String(produto.estoqueMinimo) : '5',
      categoria: produto?.categoria ?? '',
      descricao: produto?.descricao ?? '',
    },
  });
}

export function valoresParaInput(v: ProdutoFormValores): ProdutoInput {
  return {
    nome: v.nome.trim(),
    precoVenda: paraNumero(v.precoVenda),
    quantidadeEstoque: paraNumero(v.quantidadeEstoque),
    estoqueMinimo: paraNumero(v.estoqueMinimo),
    categoria: v.categoria || undefined,
    descricao: v.descricao.trim() || undefined,
  };
}
