import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { espaco } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';

export function LoadingState({ mensagem = 'Carregando...' }: { mensagem?: string }) {
  const { cores } = useAppTheme();
  return (
    <View style={styles.container} accessibilityLabel={mensagem} accessibilityLiveRegion="polite">
      <ActivityIndicator size="large" color={cores.primary} />
      <Text variant="bodyLarge" style={{ color: cores.textSecondary }}>
        {mensagem}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', padding: espaco.xl, gap: espaco.md },
});
