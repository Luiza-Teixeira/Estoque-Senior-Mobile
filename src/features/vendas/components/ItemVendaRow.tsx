import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { QuantityStepper } from '@/components/forms/QuantityStepper';
import { AppButton } from '@/components/ui/AppButton';
import { espaco } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';
import type { ItemCarrinho } from '@/features/vendas/hooks/useCarrinho';
import { formatarMoeda } from '@/utils/formatadores';

interface ItemVendaRowProps {
  item: ItemCarrinho;
  aoAlterarQuantidade: (quantidade: number) => void;
  aoRemover: () => void;
}

export function ItemVendaRow({ item, aoAlterarQuantidade, aoRemover }: ItemVendaRowProps) {
  const { cores } = useAppTheme();
  const subtotal = item.quantidade * item.produto.precoVenda;

  return (
    <View style={[styles.item, { borderBottomColor: cores.border }]}>
      <Text variant="titleSmall" style={{ color: cores.text }}>
        {item.produto.nome}
      </Text>
      <Text variant="bodyMedium" style={{ color: cores.textSecondary }}>
        {formatarMoeda(item.produto.precoVenda)} cada · subtotal {formatarMoeda(subtotal)}
      </Text>
      <View style={styles.linha}>
        <QuantityStepper
          valor={item.quantidade}
          aoAlterar={aoAlterarQuantidade}
          minimo={1}
          maximo={item.produto.quantidadeEstoque}
        />
        <AppButton
          titulo="Remover"
          icone="trash-can-outline"
          variante="texto"
          textColor={cores.danger}
          onPress={aoRemover}
          accessibilityLabel={`Remover ${item.produto.nome} da venda`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { gap: espaco.xs, paddingBottom: espaco.md, borderBottomWidth: StyleSheet.hairlineWidth },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
