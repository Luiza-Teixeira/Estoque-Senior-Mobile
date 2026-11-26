import { MD3LightTheme, MD3Theme, useTheme } from 'react-native-paper';

import { cores, coresAltoContraste, Paleta } from '@/constants/colors';
import { raio } from '@/constants/spacing';
import { fontes, tamanhoFonte } from '@/constants/typography';

export type AppTheme = MD3Theme & {
  cores: Paleta;
  escalaTexto: number;
};

type MD3Typescale = MD3Theme['fonts'];
type MD3Type = MD3Typescale['bodyLarge'];
type Variante = Exclude<keyof MD3Typescale, 'default'>;

const BASE: Record<Variante, { tamanho: number; fonte: string }> = {
  displayLarge: { tamanho: 40, fonte: fontes.extrabold },
  displayMedium: { tamanho: 36, fonte: fontes.extrabold },
  displaySmall: { tamanho: tamanhoFonte.destaque, fonte: fontes.extrabold },
  headlineLarge: { tamanho: 30, fonte: fontes.extrabold },
  headlineMedium: {
    tamanho: tamanhoFonte.tituloTela,
    fonte: fontes.extrabold,
  },
  headlineSmall: { tamanho: 24, fonte: fontes.bold },
  titleLarge: { tamanho: tamanhoFonte.titulo, fonte: fontes.bold },
  titleMedium: { tamanho: tamanhoFonte.subtitulo, fonte: fontes.bold },
  titleSmall: { tamanho: tamanhoFonte.corpo, fonte: fontes.bold },
  labelLarge: { tamanho: tamanhoFonte.corpo, fonte: fontes.bold },
  labelMedium: { tamanho: tamanhoFonte.apoio, fonte: fontes.semibold },
  labelSmall: { tamanho: tamanhoFonte.apoio, fonte: fontes.semibold },
  bodyLarge: { tamanho: tamanhoFonte.corpo, fonte: fontes.regular },
  bodyMedium: { tamanho: tamanhoFonte.corpoMenor, fonte: fontes.regular },
  bodySmall: { tamanho: tamanhoFonte.apoio, fonte: fontes.regular },
};

function criarFontes(escala: number): MD3Typescale {
  const variantes = Object.keys(BASE) as Variante[];
  const resultado = {
    default: {
      ...MD3LightTheme.fonts.default,
      fontFamily: fontes.regular,
    },
  };

  for (const v of variantes) {
    const tamanho = Math.round(BASE[v].tamanho * escala);

    const tipo: MD3Type = {
      ...MD3LightTheme.fonts[v],
      fontFamily: BASE[v].fonte,
      fontWeight: 'normal',
      fontSize: tamanho,
      lineHeight: Math.round(tamanho * 1.3),
      letterSpacing: 0,
    };

    Object.assign(resultado, { [v]: tipo });
  }

  return resultado as MD3Typescale;
}

export function criarTema(opcoes: {
  escalaTexto: number;
  altoContraste: boolean;
}): AppTheme {
  const paleta = opcoes.altoContraste ? coresAltoContraste : cores;

  return {
    ...MD3LightTheme,
    roundness: raio.botao / 4,
    fonts: criarFontes(opcoes.escalaTexto),
    colors: {
      ...MD3LightTheme.colors,
      primary: paleta.primary,
      onPrimary: paleta.textOnPrimary,
      primaryContainer: paleta.primarySoft,
      onPrimaryContainer: paleta.navy,
      secondary: paleta.navy,
      secondaryContainer: paleta.primarySoft,
      onSecondaryContainer: paleta.navy,
      background: paleta.background,
      surface: paleta.surface,
      surfaceVariant: paleta.primaryLight,
      onSurface: paleta.text,
      onSurfaceVariant: paleta.textSecondary,
      outline: paleta.border,
      error: paleta.danger,
      elevation: {
        ...MD3LightTheme.colors.elevation,
        level2: paleta.surface,
        level3: paleta.surface,
      },
    },
    cores: paleta,
    escalaTexto: opcoes.escalaTexto,
  };
}

export const useAppTheme = () => useTheme<AppTheme>();