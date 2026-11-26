import { StyleSheet, View } from 'react-native';
import { HelperText, Text, TextInput, TextInputProps } from 'react-native-paper';

import { espaco, raio } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';

export interface TextFieldProps extends Omit<TextInputProps, 'label' | 'error' | 'mode'> {
  rotulo: string;
  obrigatorio?: boolean;
  erro?: string;
  ajuda?: string;
  icone?: string;
}

export function TextField({
  rotulo,
  obrigatorio,
  erro,
  ajuda,
  icone,
  style,
  ...props
}: TextFieldProps) {
  const { cores, fonts } = useAppTheme();

  return (
    <View style={styles.container}>
      <Text variant="titleSmall" style={{ color: cores.text }}>
        {rotulo}
        {obrigatorio ? <Text style={{ color: cores.danger }}> *</Text> : null}
      </Text>
      <TextInput
        mode="outlined"
        accessibilityLabel={obrigatorio ? `${rotulo}, obrigatório` : rotulo}
        error={!!erro}
        left={icone ? <TextInput.Icon icon={icone} /> : undefined}
        outlineStyle={{ borderRadius: raio.campo, borderWidth: 1.5 }}
        outlineColor={cores.border}
        style={[{ backgroundColor: cores.surface, minHeight: 56 }, fonts.bodyLarge, style]}
        placeholderTextColor={cores.textSecondary}
        {...props}
      />
      {erro ? (
        <HelperText type="error" visible style={fonts.bodySmall}>
          {erro}
        </HelperText>
      ) : ajuda ? (
        <HelperText type="info" visible style={[fonts.bodySmall, { color: cores.textSecondary }]}>
          {ajuda}
        </HelperText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: espaco.xs },
});
