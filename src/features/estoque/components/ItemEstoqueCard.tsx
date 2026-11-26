import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { StatusEstoqueChip } from '@/components/ui/StatusEstoqueChip';
import { espaco } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';
import type { ItemEstoque } from '@/features/estoque/types/estoque';
import { formatarCodigo } from '@/utils/formatadores';

interface ItemEstoqueCardProps {
  item: ItemEstoque;
  aoRegistrarEntrada: () => void;
}

export function ItemEstoqueCard({ item, aoRegistrarEntrada }: ItemEstoqueCardProps) {
  const { cores } = useAppTheme();
  return (
    <AppCard>
      <View style={styles.linha}>
        <View style={styles.textos}>
          <Text variant="bodySmall" style={{ color: cores.textSecondary }}>
            {formatarCodigo('P', item.produtoId)} · mínimo {item.estoqueMinimo} un
          </Text>
          <Text variant="titleMedium" style={{ color: cores.text }}>
            {item.nomeProduto}
          </Text>
          <StatusEstoqueChip quantidade={item.quantidadeEstoque} minimo={item.estoqueMinimo} />
        </View>
        <View
          style={styles.quantidade}
          accessibilityLabel={`${item.quantidadeEstoque} unidades em estoque`}
        >
          <Text
            variant="displaySmall"
            style={{ color: item.estoqueBaixo ? cores.warning : cores.navy }}
          >
            {item.quantidadeEstoque}
          </Text>
          <Text variant="bodySmall" style={{ color: cores.textSecondary }}>
            unidades
          </Text>
        </View>
      </View>
      <AppButton
        titulo="Registrar entrada"
        icone="plus"
        variante="secundario"
        onPress={aoRegistrarEntrada}
      />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', alignItems: 'center', gap: espaco.md },
  textos: { flex: 1, gap: espaco.xs },
  quantidade: { alignItems: 'center', minWidth: 72 },
});
