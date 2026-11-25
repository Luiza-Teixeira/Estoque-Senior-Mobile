import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { espaco, raio } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';
import { formatarMoeda } from '@/utils/formatadores';

export function TotalVendaBar({ total }: { total: number }) {
  const { cores } = useAppTheme();
  return (
    <View
      style={[styles.barra, { backgroundColor: cores.primarySoft }]}
      accessibilityLabel={`Total da venda: ${formatarMoeda(total)}`}
      accessibilityLiveRegion="polite"
    >
      <Text variant="titleMedium" style={{ color: cores.navy }}>
        Total da venda
      </Text>
      <Text variant="headlineSmall" style={{ color: cores.navy }}>
        {formatarMoeda(total)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  barra: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: espaco.md,
    borderRadius: raio.card,
  },
});
