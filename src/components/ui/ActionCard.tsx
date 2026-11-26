import { StyleSheet, View } from 'react-native';
import { Icon, Text, TouchableRipple } from 'react-native-paper';

import { espaco, raio, tamanhos } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';

export type CorAcao = 'azul' | 'verde' | 'laranja';

interface ActionCardProps {
  titulo: string;
  descricao?: string;
  icone: string;
  cor?: CorAcao;
  aoPressionar: () => void;
}

export function ActionCard({
  titulo,
  descricao,
  icone,
  cor = 'azul',
  aoPressionar,
}: ActionCardProps) {
  const { cores } = useAppTheme();
  const paleta = {
    azul: { fundo: cores.primaryLight, destaque: cores.primary },
    verde: { fundo: cores.successBg, destaque: cores.success },
    laranja: { fundo: cores.warningBg, destaque: cores.warning },
  }[cor];

  return (
    <TouchableRipple
      onPress={aoPressionar}
      accessibilityRole="button"
      accessibilityLabel={descricao ? `${titulo}. ${descricao}` : titulo}
      style={[styles.card, { backgroundColor: paleta.fundo, borderColor: cores.border }]}
      borderless
    >
      <View style={styles.linha}>
        <View style={[styles.icone, { backgroundColor: cores.surface }]}>
          <Icon source={icone} size={tamanhos.iconeGrande} color={paleta.destaque} />
        </View>
        <View style={styles.textos}>
          <Text variant="titleLarge" style={{ color: cores.text }}>
            {titulo}
          </Text>
          {descricao ? (
            <Text variant="bodyLarge" style={{ color: cores.textSecondary }}>
              {descricao}
            </Text>
          ) : null}
        </View>
        <View style={[styles.seta, { backgroundColor: paleta.destaque }]}>
          <Icon source="chevron-right" size={28} color={cores.textOnPrimary} />
        </View>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: raio.card,
    padding: espaco.md,
    minHeight: 96,
    justifyContent: 'center',
  },
  linha: { flexDirection: 'row', alignItems: 'center', gap: espaco.md },
  icone: {
    width: 64,
    height: 64,
    borderRadius: raio.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textos: { flex: 1, gap: 2 },
  seta: {
    width: tamanhos.toqueMinimo,
    height: tamanhos.toqueMinimo,
    borderRadius: tamanhos.toqueMinimo / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
