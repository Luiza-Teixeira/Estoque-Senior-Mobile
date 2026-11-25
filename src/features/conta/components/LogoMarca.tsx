import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';

import { espaco } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';

export function LogoMarca() {
  const { cores } = useAppTheme();
  return (
    <View style={styles.container} accessibilityRole="header" accessibilityLabel="Estoque Sênior">
      <Icon source="cube" size={72} color={cores.primary} />
      <View>
        <Text variant="headlineLarge" style={{ color: cores.navy }}>
          Estoque
        </Text>
        <Text variant="headlineLarge" style={{ color: cores.navy, marginTop: -6 }}>
          Sênior
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: espaco.md,
  },
});
