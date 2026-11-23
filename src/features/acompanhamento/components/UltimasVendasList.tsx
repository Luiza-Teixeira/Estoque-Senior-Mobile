import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';

import { espaco } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';
import type { Venda } from '@/features/vendas';
import { formatarDataHora, formatarMoeda } from '@/utils/formatadores';

function descricao(venda: Venda): string {
  const [primeiro, ...resto] = venda.itens;
  if (!primeiro) return '—';
  return resto.length > 0 ? `${primeiro.nomeProduto} + ${resto.length}` : primeiro.nomeProduto;
}

export function UltimasVendasList({ vendas }: { vendas: Venda[] }) {
  const { cores } = useAppTheme();

  if (vendas.length === 0) {
    return (
      <Text variant="bodyLarge" style={{ color: cores.textSecondary }}>
        Nenhuma venda registrada ainda.
      </Text>
    );
  }

  return (
    <View>
      {vendas.slice(0, 5).map((venda) => (
        <TouchableRipple
          key={venda.id}
          onPress={() => router.push(`/vendas/${venda.id}`)}
          accessibilityRole="button"
          accessibilityLabel={`${descricao(venda)}, ${formatarMoeda(venda.total)}, ${formatarDataHora(venda.dataHora)}`}
          style={[styles.linha, { borderBottomColor: cores.border }]}
        >
          <View style={styles.conteudo}>
            <View style={styles.textos}>
              <Text variant="bodyLarge" style={{ color: cores.text }} numberOfLines={1}>
                {descricao(venda)}
              </Text>
              <Text variant="bodySmall" style={{ color: cores.textSecondary }}>
                {formatarDataHora(venda.dataHora)}
              </Text>
            </View>
            <Text variant="titleSmall" style={{ color: cores.navy }}>
              {formatarMoeda(venda.total)}
            </Text>
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
