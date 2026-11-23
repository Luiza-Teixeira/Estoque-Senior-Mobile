import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';

import { StatusEstoqueChip } from '@/components/ui/StatusEstoqueChip';
import { espaco } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';
import type { ItemEstoque } from '@/features/estoque';

export function EstoqueBaixoList({ itens }: { itens: ItemEstoque[] }) {
  const { cores } = useAppTheme();

  if (itens.length === 0) {
    return (
      <Text variant="bodyLarge" style={{ color: cores.textSecondary }}>
        Nenhum produto com estoque baixo. Muito bem!
      </Text>
    );
  }

  return (
    <View>
      {[...itens]
        .sort((a, b) => a.quantidadeEstoque - b.quantidadeEstoque)
        .slice(0, 5)
        .map((item) => (
          <TouchableRipple
            key={item.produtoId}
            onPress={() => router.push(`/estoque/entrada?produtoId=${item.produtoId}`)}
            accessibilityRole="button"
            accessibilityLabel={`${item.nomeProduto}, ${item.quantidadeEstoque} unidades. Toque para registrar entrada.`}
            style={[styles.linha, { borderBottomColor: cores.border }]}
          >
            <View style={styles.conteudo}>
              <View style={styles.textos}>
                <Text variant="bodyLarge" style={{ color: cores.text }}>
                  {item.nomeProduto}
                </Text>
                <Text variant="bodySmall" style={{ color: cores.textSecondary }}>
                  Estoque: {item.quantidadeEstoque} unidade(s)
                </Text>
              </View>
              <StatusEstoqueChip quantidade={item.quantidadeEstoque} minimo={item.estoqueMinimo} />
            </View>
          </TouchableRipple>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  linha: { paddingVertical: espaco.sm + 2, borderBottomWidth: StyleSheet.hairlineWidth },
  conteudo: { flexDirection: 'row', alignItems: 'center', gap: espaco.sm },
  textos: { flex: 1 },
});
