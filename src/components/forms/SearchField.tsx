import { Searchbar } from 'react-native-paper';

import { raio } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';

interface SearchFieldProps {
  valor: string;
  aoAlterar: (texto: string) => void;
  placeholder: string;
  autoFocus?: boolean;
}

export function SearchField({ valor, aoAlterar, placeholder, autoFocus }: SearchFieldProps) {
  const { cores, fonts } = useAppTheme();
  return (
    <Searchbar
      value={valor}
      onChangeText={aoAlterar}
      placeholder={placeholder}
      autoFocus={autoFocus}
      accessibilityLabel={placeholder}
      inputStyle={[fonts.bodyLarge, { minHeight: 0 }]}
      style={{
        backgroundColor: cores.surface,
        borderWidth: 1.5,
        borderColor: cores.border,
        borderRadius: raio.campo,
        elevation: 0,
      }}
      placeholderTextColor={cores.textSecondary}
    />
  );
}
