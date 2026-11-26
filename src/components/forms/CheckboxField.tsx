import { Checkbox } from 'react-native-paper';

import { useAppTheme } from '@/constants/theme';

interface CheckboxFieldProps {
  rotulo: string;
  marcado: boolean;
  aoAlterar: (marcado: boolean) => void;
}

export function CheckboxField({ rotulo, marcado, aoAlterar }: CheckboxFieldProps) {
  const { cores, fonts } = useAppTheme();
  return (
    <Checkbox.Item
      label={rotulo}
      status={marcado ? 'checked' : 'unchecked'}
      onPress={() => aoAlterar(!marcado)}
      position="leading"
      color={cores.primary}
      labelStyle={[fonts.bodyLarge, { color: cores.text, textAlign: 'left' }]}
      style={{ paddingHorizontal: 0, minHeight: 48 }}
      accessibilityLabel={rotulo}
    />
  );
}
