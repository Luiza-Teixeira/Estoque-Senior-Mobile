import { StyleSheet, View } from 'react-native';
import { Icon, Text, TouchableRipple } from 'react-native-paper';

import { espaco, raio } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';

export type CorIndicador = 'azul' | 'verde' | 'laranja' | 'vermelho';

interface IndicadorCardProps {
  rotulo: string;
  valor: string;
  icone: string;
  cor?: CorIndicador;
  detalhe?: string;
  aoPressionar?: () => void;
}

export function IndicadorCard({
  rotulo,
  valor,
  icone,
  cor = 'azul',
  detalhe,
  aoPressionar,
}: IndicadorCardProps) {
  const { cores } = useAppTheme();
  const paleta = {
    azul: { fundo: cores.primaryLight, destaque: cores.primary },
    verde: { fundo: cores.successBg, destaque: cores.success },
    laranja: { fundo: cores.warningBg, destaque: cores.warning },
    vermelho: { fundo: cores.dangerBg, destaque: cores.danger },
  }[cor];

  return (
    <TouchableRipple
      onPress={aoPressionar}
      disabled={!aoPressionar}
      accessibilityRole={aoPressionar ? 'button' : 'summary'}
      accessibilityLabel={`${rotulo}: ${valor}${detalhe ? `. ${detalhe}` : ''}`}
      style={[styles.card, { backgroundColor: paleta.fundo, borderColor: cores.border }]}
      borderless
    >
      <View style={styles.conteudo}>
        <View style={[styles.icone, { backgroundColor: cores.surface }]}>
          <Icon source={icone} size={30} color={paleta.destaque} />
        </View>
        <Text variant="titleSmall" style={{ color: cores.text }}>
          {rotulo}
        </Text>
        <Text
          variant="displaySmall"
          style={{ color: cores.navy }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {valor}
        </Text>
        {detalhe ? (
          <Text variant="bodySmall" style={{ color: cores.textSecondary }}>
            {detalhe}
          </Text>
        ) : null}
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: 150, borderWidth: 1, borderRadius: raio.card, padding: espaco.md },
  conteudo: { gap: espaco.xs },
  icone: {
    width: 52,
    height: 52,
    borderRadius: raio.botao,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: espaco.xs,
  },
});
