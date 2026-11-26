import { StyleSheet, View } from 'react-native';
import { Icon, Text, TouchableRipple } from 'react-native-paper';

import { AppCard } from '@/components/ui/AppCard';
import { espaco } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';
import type { EntradaMercadoria } from '@/features/estoque/types/estoque';
import { formatarDataHora, formatarMoeda } from '@/utils/formatadores';

export function EntradaCard({ entrada, aoVer }: { entrada: EntradaMercadoria; aoVer: () => void }) {
  const { cores } = useAppTheme();
  return (
    <AppCard>
      <TouchableRipple
        onPress={aoVer}
        accessibilityRole="button"
        accessibilityLabel={`Entrada de ${entrada.quantidade} ${entrada.produto.nome}, ${formatarDataHora(entrada.dataHora)}. Ver detalhes.`}
      >
        <View style={styles.linha}>
          <Icon source="arrow-up-bold-circle-outline" size={36} color={cores.success} />
          <View style={styles.textos}>
            <Text variant="titleMedium" style={{ color: cores.text }}>
              {entrada.produto.nome}
            </Text>
            <Text variant="bodyMedium" style={{ color: cores.textSecondary }}>
              {formatarDataHora(entrada.dataHora)} · custo {formatarMoeda(entrada.custoUnitario)}/un
            </Text>
          </View>
          <Text variant="titleMedium" style={{ color: cores.success }}>
            +{entrada.quantidade}
          </Text>
          <Icon source="chevron-right" size={28} color={cores.textSecondary} />
        </View>
      </TouchableRipple>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', alignItems: 'center', gap: espaco.sm },
  textos: { flex: 1, gap: 2 },
});
