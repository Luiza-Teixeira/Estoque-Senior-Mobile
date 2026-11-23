import { StyleSheet, View } from 'react-native';
import { RadioButton, SegmentedButtons, Switch, Text } from 'react-native-paper';

import { AppCard } from '@/components/ui/AppCard';
import { espaco } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';
import { EscalaTexto, Modo, usePreferenciasStore } from '@/stores/preferenciasStore';

export function AcessibilidadeTab() {
  const { cores, fonts } = useAppTheme();
  const {
    escalaTexto,
    altoContraste,
    modo,
    definirEscalaTexto,
    definirAltoContraste,
    definirModo,
  } = usePreferenciasStore();

  return (
    <>
      <AppCard>
        <Text variant="titleLarge" style={{ color: cores.navy }}>
          Acessibilidade
        </Text>
        <Text variant="bodyMedium" style={{ color: cores.textSecondary }}>
          Ajuste o sistema para uma experiência mais confortável. As mudanças valem na hora.
        </Text>

        <Text variant="titleSmall" style={{ color: cores.text }}>
          Tamanho do texto
        </Text>
        <SegmentedButtons
          value={String(escalaTexto)}
          onValueChange={(v) => definirEscalaTexto(Number(v) as EscalaTexto)}
          buttons={[
            { value: '1', label: 'Normal', labelStyle: fonts.labelMedium },
            { value: '1.15', label: 'Grande', labelStyle: fonts.labelMedium },
            { value: '1.3', label: 'Maior', labelStyle: fonts.labelMedium },
          ]}
        />

        <View style={styles.linha}>
          <View style={styles.flex}>
            <Text variant="titleSmall" style={{ color: cores.text }}>
              Alto contraste
            </Text>
            <Text variant="bodySmall" style={{ color: cores.textSecondary }}>
              Cores mais fortes para enxergar melhor.
            </Text>
          </View>
          <Switch
            value={altoContraste}
            onValueChange={definirAltoContraste}
            color={cores.primary}
            accessibilityLabel="Alto contraste"
          />
        </View>
      </AppCard>

      <AppCard>
        <Text variant="titleLarge" style={{ color: cores.navy }}>
          Preferência de modo
        </Text>
        <Text variant="bodyMedium" style={{ color: cores.textSecondary }}>
          Escolha como deseja utilizar o sistema.
        </Text>
        <RadioButton.Group value={modo} onValueChange={(v) => definirModo(v as Modo)}>
          <RadioButton.Item
            value="padrao"
            label={'Modo Padrão\nMais controles e informações.'}
            position="leading"
            labelStyle={[fonts.bodyLarge, styles.esquerda]}
            color={cores.primary}
          />
          <RadioButton.Item
            value="simplificado"
            label={'Modo Simplificado\nVisual mais direto e objetivo.'}
            position="leading"
            labelStyle={[fonts.bodyLarge, styles.esquerda]}
            color={cores.primary}
          />
        </RadioButton.Group>
      </AppCard>
    </>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', alignItems: 'center', gap: espaco.md, minHeight: 56 },
  flex: { flex: 1 },
  esquerda: { textAlign: 'left' },
});
