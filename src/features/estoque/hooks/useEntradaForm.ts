import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { EntradaInput } from '@/features/estoque/types/estoque';
import { paraNumero } from '@/utils/formatadores';

export const entradaSchema = z.object({
  produtoId: z
    .number()
    .nullable()
    .refine((v) => (v ?? 0) > 0, 'Escolha o produto que chegou.'),
  quantidade: z
    .string()
    .refine(
      (v) => Number.isInteger(paraNumero(v)) && paraNumero(v) > 0,
      'Informe uma quantidade maior que zero.',
    ),
  custoUnitario: z
    .string()
    .refine((v) => paraNumero(v) > 0, 'Informe quanto custou cada unidade. Ex.: 8,50'),
  fornecedor: z.string(),
  observacao: z.string(),
});

export type EntradaFormValores = z.infer<typeof entradaSchema>;

export function useEntradaForm(produtoIdInicial?: number) {
  return useForm<EntradaFormValores>({
    resolver: zodResolver(entradaSchema),
    defaultValues: {
      produtoId: produtoIdInicial ?? null,
      quantidade: '',
      custoUnitario: '',
      fornecedor: '',
      observacao: '',
    },
  });
}

export function valoresParaEntrada(v: EntradaFormValores): EntradaInput {
  return {
    produtoId: v.produtoId ?? 0,
    quantidade: paraNumero(v.quantidade),
    custoUnitario: paraNumero(v.custoUnitario),
    fornecedor: v.fornecedor.trim() || undefined,
    observacao: v.observacao.trim() || undefined,
  };
}
