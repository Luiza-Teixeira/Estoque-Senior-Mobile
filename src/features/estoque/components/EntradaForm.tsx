import { Control } from 'react-hook-form';

import { FormSelectField } from '@/components/forms/FormSelectField';
import { FormTextField } from '@/components/forms/FormTextField';
import { TextField } from '@/components/forms/TextField';
import { AppCard } from '@/components/ui/AppCard';
import type { EntradaFormValores } from '@/features/estoque/hooks/useEntradaForm';
import type { Produto } from '@/features/produtos';
import { formatarData } from '@/utils/formatadores';

interface EntradaFormProps {
  control: Control<EntradaFormValores>;
  produtos: Produto[];
  simplificado: boolean;
}

export function EntradaForm({ control, produtos, simplificado }: EntradaFormProps) {
  return (
    <AppCard>
      <FormSelectField
        control={control}
        name="produtoId"
        rotulo="Produto"
        obrigatorio
        placeholder="Selecione o produto"
        icone="cube-outline"
        opcoes={produtos.map((p) => ({
          valor: p.id,
          rotulo: p.nome,
          descricao: `Hoje há ${p.quantidadeEstoque} unidade(s)`,
        }))}
      />
      <FormTextField
        control={control}
        name="quantidade"
        rotulo="Quantidade que chegou"
        obrigatorio
        placeholder="Ex.: 10"
        keyboardType="number-pad"
        icone="package-variant"
      />
      <FormTextField
        control={control}
        name="custoUnitario"
        rotulo="Custo de cada unidade (R$)"
        obrigatorio
        placeholder="Ex.: 8,50"
        keyboardType="decimal-pad"
        icone="currency-usd"
      />
      <TextField
        rotulo="Data da entrada"
        value={`Hoje, ${formatarData(new Date().toISOString())}`}
        editable={false}
        icone="calendar"
        ajuda="A data é registrada automaticamente."
      />
      {!simplificado ? (
        <>
          <FormTextField
            control={control}
            name="fornecedor"
            rotulo="Fornecedor (opcional)"
            placeholder="Ex.: Distribuidora ABC"
          />
          <FormTextField
            control={control}
            name="observacao"
            rotulo="Observação (opcional)"
            placeholder="Ex.: Reposição do estoque mensal."
            multiline
          />
        </>
      ) : null}
    </AppCard>
  );
}
