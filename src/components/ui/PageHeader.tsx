import { router } from 'expo-router';
import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { espaco } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';

interface PageHeaderProps {
  titulo: string;
  subtitulo?: string;
  voltar?: boolean;
  acao?: ReactNode;
}

export function PageHeader({ titulo, subtitulo, voltar = false, acao }: PageHeaderProps) {
  const { cores, fonts } = useAppTheme();

  return (
    <View style={styles.container}>
      {voltar ? (
        <Button
          icon="arrow-left"
          mode="text"
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
          accessibilityLabel="Voltar para a tela anterior"
          labelStyle={fonts.labelLarge}
          style={styles.voltar}
          textColor={cores.primary}
        >
          Voltar
        </Button>
      ) : null}
      <View style={styles.linha}>
        <View style={styles.textos}>
          <Text variant="headlineMedium" accessibilityRole="header" style={{ color: cores.navy }}>
            {titulo}
          </Text>
          {subtitulo ? (
            <Text variant="bodyLarge" style={{ color: cores.textSecondary }}>
              {subtitulo}
            </Text>
          ) : null}
        </View>
      </View>
      {acao ? <View>{acao}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: espaco.sm },
  voltar: { alignSelf: 'flex-start', marginLeft: -espaco.sm },
  linha: { flexDirection: 'row', alignItems: 'center' },
  textos: { flex: 1, gap: 2 },
});
