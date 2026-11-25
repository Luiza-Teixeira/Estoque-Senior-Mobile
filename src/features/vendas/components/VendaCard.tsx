import { StyleSheet, View } from 'react-native';
import { Icon, Text, TouchableRipple } from 'react-native-paper';

import { AppCard } from '@/components/ui/AppCard';
import { espaco } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';
import { FormaPagamentoChip } from '@/features/vendas/components/FormaPagamentoChip';
import type { Venda } from '@/features/vendas/types/venda';
import { formatarCodigo, formatarDataHora, formatarMoeda } from '@/utils/formatadores';

export function VendaCard({ venda, aoVer }: { venda: Venda; aoVer: () => void }) {
  const { cores } = useAppTheme();
  const qtdItens = venda.itens.reduce((s, i) => s + i.quantidade, 0);

  return (
    <AppCard>
      <TouchableRipple
        onPress={aoVer}
        accessibilityRole="button"
        accessibilityLabel={`Venda ${formatarCodigo('V', venda.id)}, ${formatarMoeda(venda.total)}, ${formatarDataHora(venda.dataHora)}. Ver detalhes.`}
      >
        <View style={styles.linha}>
          <View style={styles.textos}>
            <Text variant="bodySmall" style={{ color: cores.textSecondary }}>
              {formatarCodigo('V', venda.id)} · {formatarDataHora(venda.dataHora)}
            </Text>
            <Text variant="titleMedium" style={{ color: cores.text }}>
              {venda.cliente ?? 'Cliente não informado'}
            </Text>
            <Text variant="bodyMedium" style={{ color: cores.textSecondary }}>
              {qtdItens} item(ns)
            </Text>
            <FormaPagamentoChip forma={venda.formaPagamento} />
          </View>
          <Text variant="titleLarge" style={{ color: cores.navy }}>
            {formatarMoeda(venda.total)}
          </Text>
          <Icon source="chevron-right" size={28} color={cores.textSecondary} />
        </View>
      </TouchableRipple>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', alignItems: 'center', gap: espaco.sm },
  textos: { flex: 1, gap: espaco.xs },
});
