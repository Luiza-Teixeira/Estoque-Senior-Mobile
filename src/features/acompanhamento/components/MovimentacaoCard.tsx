import { StyleSheet, View } from 'react-native';
import { Icon, Text, TouchableRipple } from 'react-native-paper';

import { AppCard } from '@/components/ui/AppCard';
import { espaco } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';
import { TipoMovimentacaoChip } from '@/features/acompanhamento/components/TipoMovimentacaoChip';
import type { Movimentacao } from '@/features/acompanhamento/types/acompanhamento';
import { formatarDataHora, formatarMoeda } from '@/utils/formatadores';

export function MovimentacaoCard({
  registro,
  aoVer,
}: {
  registro: Movimentacao;
  aoVer: () => void;
}) {
  const { cores } = useAppTheme();
  const total = registro.quantidade * registro.valorUnitario;
  const tipoTexto = registro.tipo === 'ENTRADA' ? 'Entrada' : 'Venda';

  return (
    <AppCard>
      <TouchableRipple
        onPress={aoVer}
        accessibilityRole="button"
        accessibilityLabel={`${tipoTexto}: ${registro.nomeProduto}, ${registro.quantidade} unidades, ${formatarDataHora(registro.dataHora)}. Ver detalhes.`}
      >
        <View style={styles.linha}>
          <View style={styles.textos}>
            <TipoMovimentacaoChip tipo={registro.tipo} />
            <Text variant="titleSmall" style={{ color: cores.text }}>
              {registro.nomeProduto} — {registro.quantidade} un
            </Text>
            <Text variant="bodySmall" style={{ color: cores.textSecondary }}>
              {formatarDataHora(registro.dataHora)} · {formatarMoeda(total)}
            </Text>
          </View>
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
