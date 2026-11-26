import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';

import { AppButton } from '@/components/ui/AppButton';
import { espaco, raio } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';

interface ErrorStateProps {
  mensagem: string;
  aoTentarNovamente?: () => void;
}

export function ErrorState({ mensagem, aoTentarNovamente }: ErrorStateProps) {
  const { cores } = useAppTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: cores.dangerBg, borderColor: cores.danger }]}
      accessibilityLiveRegion="assertive"
    >
      <Icon source="alert-circle-outline" size={48} color={cores.danger} />
      <Text variant="titleMedium" style={[styles.centro, { color: cores.text }]}>
        Algo deu errado
      </Text>
      <Text variant="bodyLarge" style={[styles.centro, { color: cores.text }]}>
        {mensagem}
      </Text>
      {aoTentarNovamente ? (
        <AppButton titulo="Tentar novamente" icone="refresh" onPress={aoTentarNovamente} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: espaco.lg,
    gap: espaco.md,
    borderWidth: 1,
    borderRadius: raio.card,
  },
  centro: { textAlign: 'center' },
});
