import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';

import { espaco } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';

interface InfoRowProps {
  rotulo: string;
  valor: ReactNode;
  icone?: string;
}

export function InfoRow({ rotulo, valor, icone }: InfoRowProps) {
  const { cores } = useAppTheme();

  return (
    <View style={[styles.linha, { borderBottomColor: cores.border }]}>
      {icone ? <Icon source={icone} size={26} color={cores.primary} /> : null}

      <Text variant="titleSmall" style={[styles.rotulo, { color: cores.text }]}>
        {rotulo}
      </Text>

      <View style={styles.valor}>
        {typeof valor === 'string' || typeof valor === 'number' ? (
          <Text variant="bodyLarge" style={{ color: cores.text }}>
            {valor}
          </Text>
        ) : (
          valor
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.sm,
    paddingVertical: espaco.sm + 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rotulo: {
    width: 130,
  },
  valor: {
    flex: 1,
  },
});