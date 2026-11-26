import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { espaco, raio } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';

interface AppCardProps {
  children: ReactNode;
  destaque?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function AppCard({
  children,
  destaque = false,
  style,
}: AppCardProps) {
  const { cores } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: destaque ? cores.primaryLight : cores.surface,
          borderColor: cores.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: raio.card,
    padding: espaco.md,
    gap: espaco.sm,
  },
});