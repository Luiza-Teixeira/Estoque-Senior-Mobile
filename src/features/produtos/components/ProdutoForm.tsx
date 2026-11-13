import { Control } from 'react-hook-form';

import { FormSelectField } from '@/components/forms/FormSelectField';
import { FormTextField } from '@/components/forms/FormTextField';
import { AppCard } from '@/components/ui/AppCard';
import type { ProdutoFormValores } from '@/features/produtos/hooks/useProdutoForm';
import { CATEGORIAS } from '@/features/produtos/types/produto';

interface ProdutoFormProps {
  control: Control<ProdutoFormValores>;
  edicao: boolean;
  simplificado: boolean;
}

export function ProdutoForm({ control, edicao, simplificado }: ProdutoFormProps) {
  return (
    <AppCard>
      <FormTextField
        control={control}
        name="nome"
        rotulo="Nome do produto"
        obrigatorio
        placeholder="Ex.: Café (500 g)"
        icone="cube-outline"
      />
      <FormSelectField
        control={control}
        name="categoria"
        rotulo="Categoria (opcional)"
        placeholder="Selecione uma categoria"
        opcoes={CATEGORIAS.map((c) => ({ valor: c, rotulo: c }))}
        icone="tag-outline"
      />
      {!edicao ? (
        <FormTextField
          control={control}
          name="quantidadeEstoque"
          rotulo="Quantidade em estoque"
          obrigatorio
          placeholder="Ex.: 10"
          keyboardType="number-pad"
          icone="package-variant"
        />
      ) : null}
      <FormTextField
        control={control}
        name="precoVenda"
        rotulo="Preço de venda (R$)"
        obrigatorio
        placeholder="Ex.: 12,90"
        keyboardType="decimal-pad"
        icone="currency-usd"
      />
      {!simplificado ? (
        <>
          <FormTextField
            control={control}
            name="estoqueMinimo"
            rotulo="Estoque mínimo"
            obrigatorio
            placeholder="Ex.: 5"
            keyboardType="number-pad"
            ajuda="Abaixo desta quantidade o produto aparece como estoque baixo."
          />
          <FormTextField
            control={control}
            name="descricao"
            rotulo="Descrição (opcional)"
            placeholder="Ex.: Café torrado e moído, pacote de 500 g"
            multiline
          />
        </>
      ) : null}
    </AppCard>
  );
}
