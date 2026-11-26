import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

import { espaco, tamanhos } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';

interface QuantityStepperProps {
  valor: number;
  aoAlterar: (valor: number) => void;
  minimo?: number;
  maximo?: number;
  rotulo?: string;
}

export function QuantityStepper({
  valor,
  aoAlterar,
  minimo = 1,
  maximo,
  rotulo,
}: QuantityStepperProps) {
  const { cores } = useAppTheme();
  const podeDiminuir = valor > minimo;
  const podeAumentar = maximo === undefined || valor < maximo;

  return (
    <View style={styles.container}>
      {rotulo ? (
        <Text variant="titleSmall" style={{ color: cores.text }}>
          {rotulo}
        </Text>
      ) : null}
      <View style={styles.linha}>
        <IconButton
          icon="minus"
          mode="contained-tonal"
          size={28}
          disabled={!podeDiminuir}
          onPress={() => aoAlterar(valor - 1)}
          accessibilityLabel="Diminuir quantidade"
          style={styles.botao}
        />
        <Text
          variant="headlineSmall"
          style={[styles.valor, { color: cores.text }]}
          accessibilityLabel={`Quantidade: ${valor}`}
          accessibilityLiveRegion="polite"
        >
          {valor}
        </Text>
        <IconButton
          icon="plus"
          mode="contained-tonal"
          size={28}
          disabled={!podeAumentar}
          onPress={() => aoAlterar(valor + 1)}
          accessibilityLabel="Aumentar quantidade"
          style={styles.botao}
        />
      </View>
      {maximo !== undefined && !podeAumentar ? (
        <Text variant="bodySmall" style={{ color: cores.warning }}>
          Máximo disponível em estoque: {maximo}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: espaco.xs },
  linha: { flexDirection: 'row', alignItems: 'center', gap: espaco.sm },
  botao: { width: tamanhos.alturaBotao, height: tamanhos.alturaBotao, margin: 0 },
  valor: { minWidth: 48, textAlign: 'center' },
});
