import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';

import { AppButton } from '@/components/ui/AppButton';
import { espaco } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';

interface EmptyStateProps {
  titulo: string;
  mensagem?: string;
  icone?: string;
  acao?: { titulo: string; aoPressionar: () => void; icone?: string };
}

export function EmptyState({ titulo, mensagem, icone = 'inbox-outline', acao }: EmptyStateProps) {
  const { cores } = useAppTheme();
  return (
    <View style={styles.container}>
      <Icon source={icone} size={56} color={cores.textSecondary} />
      <Text variant="titleMedium" style={[styles.centro, { color: cores.text }]}>
        {titulo}
      </Text>
      {mensagem ? (
        <Text variant="bodyLarge" style={[styles.centro, { color: cores.textSecondary }]}>
          {mensagem}
        </Text>
      ) : null}
      {acao ? (
        <AppButton titulo={acao.titulo} icone={acao.icone} onPress={acao.aoPressionar} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: espaco.xl, gap: espaco.md },
  centro: { textAlign: 'center' },
});
