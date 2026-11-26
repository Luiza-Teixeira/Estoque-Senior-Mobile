import { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { espaco } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';

interface ScreenContainerProps {
  children: ReactNode;
  rodape?: ReactNode;
  seguroTopo?: boolean;
}

export function ScreenContainer({
  children,
  rodape,
  seguroTopo = false,
}: ScreenContainerProps) {
  const { cores } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={[styles.tela, { backgroundColor: cores.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.conteudo,
          seguroTopo && { paddingTop: insets.top + espaco.md },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>

      {rodape ? (
        <View
          style={[
            styles.rodape,
            {
              backgroundColor: cores.surface,
              borderTopColor: cores.border,
            },
            seguroTopo && {
              paddingBottom: insets.bottom + espaco.md,
            },
          ]}
        >
          {rodape}
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
  },
  conteudo: {
    padding: espaco.md,
    gap: espaco.md,
    paddingBottom: espaco.xl,
  },
  rodape: {
    flexDirection: 'column-reverse',
    gap: espaco.sm,
    padding: espaco.md,
    borderTopWidth: 1,
  },
});