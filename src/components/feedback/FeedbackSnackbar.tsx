import { StyleSheet, View } from 'react-native';
import { Icon, Snackbar, Text } from 'react-native-paper';

import { useFeedbackStore } from '@/components/feedback/feedbackStore';
import { espaco } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';

export function FeedbackSnackbar() {
  const { cores } = useAppTheme();
  const { visivel, mensagem, tipo, esconder } = useFeedbackStore();
  const sucesso = tipo === 'sucesso';

  return (
    <Snackbar
      visible={visivel}
      onDismiss={esconder}
      duration={4000}
      action={{ label: 'OK', onPress: esconder, textColor: cores.textOnPrimary }}
      style={{ backgroundColor: sucesso ? cores.success : cores.danger, marginBottom: 90 }}
    >
      <View style={styles.linha} accessibilityLiveRegion="assertive">
        <Icon
          source={sucesso ? 'check-circle' : 'alert-circle'}
          size={24}
          color={cores.textOnPrimary}
        />
        <Text variant="bodyLarge" style={[styles.texto, { color: cores.textOnPrimary }]}>
          {mensagem}
        </Text>
      </View>
    </Snackbar>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', alignItems: 'center', gap: espaco.sm },
  texto: { flex: 1 },
});
