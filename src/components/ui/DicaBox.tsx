import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';

import { espaco, raio } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';

export function DicaBox({
  texto,
  titulo = 'Dica',
}: {
  texto: string;
  titulo?: string;
}) {
  const { cores } = useAppTheme();

  return (
    <View
      style={[
        styles.caixa,
        {
          backgroundColor: cores.primaryLight,
          borderColor: cores.border,
        },
      ]}
      accessibilityLabel={`${titulo}: ${texto}`}
    >
      <Icon source="information-outline" size={32} color={cores.primary} />

      <View style={styles.textos}>
        <Text variant="titleSmall" style={{ color: cores.navy }}>
          {titulo}
        </Text>

        <Text variant="bodyLarge" style={{ color: cores.text }}>
          {texto}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  caixa: {
    flexDirection: 'row',
    gap: espaco.md,
    padding: espaco.md,
    borderRadius: raio.card,
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  textos: {
    flex: 1,
    gap: 2,
  },
});