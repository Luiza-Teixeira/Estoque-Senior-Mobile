import { StyleSheet } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';

import { tamanhos } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';

type Variante = 'primario' | 'secundario' | 'sucesso' | 'perigo' | 'texto';

interface AppButtonProps extends Omit<ButtonProps, 'mode' | 'children'> {
  titulo: string;
  variante?: Variante;
  icone?: string;
}

export function AppButton({
  titulo,
  variante = 'primario',
  icone,
  style,
  contentStyle,
  ...props
}: AppButtonProps) {
  const { cores, fonts } = useAppTheme();

  const visual = {
    primario: {
      mode: 'contained',
      fundo: cores.primary,
      texto: cores.textOnPrimary,
      borda: cores.primary,
    },
    secundario: {
      mode: 'outlined',
      fundo: cores.primaryLight,
      texto: cores.primary,
      borda: cores.primary,
    },
    sucesso: {
      mode: 'contained',
      fundo: cores.success,
      texto: cores.textOnPrimary,
      borda: cores.success,
    },
    perigo: {
      mode: 'contained',
      fundo: cores.danger,
      texto: cores.textOnPrimary,
      borda: cores.danger,
    },
    texto: {
      mode: 'text',
      fundo: 'transparent',
      texto: cores.primary,
      borda: 'transparent',
    },
  } as const;

  const v = visual[variante];

  return (
    <Button
      mode={v.mode}
      icon={icone}
      buttonColor={v.fundo}
      textColor={v.texto}
      accessibilityLabel={titulo}
      style={[styles.botao, { borderColor: v.borda }, style]}
      contentStyle={[styles.conteudo, contentStyle]}
      labelStyle={fonts.labelLarge}
      {...props}
    >
      {titulo}
    </Button>
  );
}

const styles = StyleSheet.create({
  botao: {
    borderWidth: 1.5,
  },
  conteudo: {
    minHeight: tamanhos.alturaBotao,
    paddingHorizontal: 8,
  },
});