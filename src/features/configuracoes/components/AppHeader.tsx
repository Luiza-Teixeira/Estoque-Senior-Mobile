import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  Button,
  Dialog,
  Icon,
  Portal,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppButton } from '@/components/ui/AppButton';
import { espaco, tamanhos } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';
import { usePreferenciasStore } from '@/stores/preferenciasStore';

const NOMES_TAMANHO = {
  1: 'normal',
  1.15: 'grande',
  1.3: 'muito grande',
} as const;

export function AppHeader() {
  const { cores } = useAppTheme();
  const insets = useSafeAreaInsets();
  const escala = usePreferenciasStore((s) => s.escalaTexto);
  const proximaEscala = usePreferenciasStore((s) => s.proximaEscalaTexto);
  const [ajudaAberta, setAjudaAberta] = useState(false);

  return (
    <View
      style={[
        styles.barra,
        {
          backgroundColor: cores.navy,
          paddingTop: insets.top + espaco.sm,
        },
      ]}
    >
      <View
        style={styles.marca}
        accessibilityRole="header"
        accessibilityLabel="Estoque Sênior"
      >
        <Icon source="cube-outline" size={32} color={cores.textOnPrimary} />

        <Text variant="titleMedium" style={{ color: cores.textOnPrimary }}>
          Estoque{'\n'}Sênior
        </Text>
      </View>

      <Button
        icon="help-circle-outline"
        textColor={cores.textOnPrimary}
        onPress={() => setAjudaAberta(true)}
        accessibilityLabel="Ajuda"
        compact
      >
        Ajuda
      </Button>

      <TouchableRipple
        onPress={proximaEscala}
        accessibilityRole="button"
        accessibilityLabel={`Tamanho do texto: ${NOMES_TAMANHO[escala]}. Toque para mudar.`}
        style={[styles.aaa, { borderColor: cores.textOnPrimary }]}
      >
        <Text style={{ color: cores.textOnPrimary, fontSize: 14 }}>
          A{' '}
          <Text style={{ color: cores.textOnPrimary, fontSize: 17 }}>
            A
          </Text>{' '}
          <Text
            style={{
              color: cores.textOnPrimary,
              fontSize: 21,
              fontWeight: 'bold',
            }}
          >
            A
          </Text>
        </Text>
      </TouchableRipple>

      <TouchableRipple
        onPress={() => router.push('/configuracoes')}
        accessibilityRole="button"
        accessibilityLabel="Perfil e configurações"
        borderless
        style={styles.avatar}
      >
        <Avatar.Icon
          size={44}
          icon="account"
          style={{ backgroundColor: cores.primarySoft }}
          color={cores.navy}
        />
      </TouchableRipple>

      <Portal>
        <Dialog
          visible={ajudaAberta}
          onDismiss={() => setAjudaAberta(false)}
        >
          <Dialog.Title>Como usar o app</Dialog.Title>

          <Dialog.Content style={styles.ajuda}>
            <Text variant="bodyLarge">
              • Use as abas na parte de baixo da tela para mudar de área.
            </Text>

            <Text variant="bodyLarge">
              • O botão “A A A” aumenta o tamanho das letras.
            </Text>

            <Text variant="bodyLarge">
              • No ícone de pessoa (canto direito) ficam o perfil, a
              acessibilidade e o botão Sair.
            </Text>

            <Text variant="bodyLarge">
              • O Modo Simplificado mostra só as ações principais, com botões
              grandes.
            </Text>
          </Dialog.Content>

          <Dialog.Actions>
            <AppButton
              titulo="Entendi"
              onPress={() => setAjudaAberta(false)}
            />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  barra: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.xs,
    paddingHorizontal: espaco.md,
    paddingBottom: espaco.sm,
  },
  marca: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.sm,
  },
  aaa: {
    minHeight: tamanhos.toqueMinimo,
    minWidth: tamanhos.toqueMinimo,
    paddingHorizontal: espaco.sm,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    borderRadius: 24,
    marginLeft: espaco.xs,
  },
  ajuda: {
    gap: espaco.sm,
  },
});