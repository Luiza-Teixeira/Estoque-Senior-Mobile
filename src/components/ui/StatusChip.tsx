import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';

import { espaco } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';

export type TipoStatus = 'sucesso' | 'alerta' | 'perigo' | 'info';

interface StatusChipProps {
  texto: string;
  tipo: TipoStatus;
  icone?: string;
}

export function StatusChip({ texto, tipo, icone }: StatusChipProps) {
  const { cores } = useAppTheme();
  const paleta = {
    sucesso: { fundo: cores.successBg, texto: cores.success },
    alerta: { fundo: cores.warningBg, texto: cores.warning },
    perigo: { fundo: cores.dangerBg, texto: cores.danger },
    info: { fundo: cores.infoBg, texto: cores.info },
  }[tipo];

  return (
    <View style={[styles.chip, { backgroundColor: paleta.fundo }]}>
      {icone ? <Icon source={icone} size={18} color={paleta.texto} /> : null}
      <Text variant="labelMedium" style={{ color: paleta.texto }}>
        {texto}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.xs,
    alignSelf: 'flex-start',
    paddingHorizontal: espaco.sm + 4,
    paddingVertical: espaco.xs,
    borderRadius: 999,
  },
});
