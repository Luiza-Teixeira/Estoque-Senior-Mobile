import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Dialog, HelperText, Icon, Portal, Text, TouchableRipple } from 'react-native-paper';

import { AppButton } from '@/components/ui/AppButton';
import { espaco, raio } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';

export interface OpcaoSelect<V extends string | number = string | number> {
  valor: V;
  rotulo: string;
  descricao?: string;
  desabilitado?: boolean;
}

export interface SelectFieldProps<V extends string | number> {
  rotulo: string;
  opcoes: OpcaoSelect<V>[];
  valor: V | null | undefined;
  aoSelecionar: (valor: V) => void;
  placeholder?: string;
  obrigatorio?: boolean;
  erro?: string;
  icone?: string;
}

export function SelectField<V extends string | number>({
  rotulo,
  opcoes,
  valor,
  aoSelecionar,
  placeholder = 'Selecione',
  obrigatorio,
  erro,
  icone,
}: SelectFieldProps<V>) {
  const { cores } = useAppTheme();
  const [aberto, setAberto] = useState(false);
  const selecionada = opcoes.find((o) => o.valor === valor);

  return (
    <View style={styles.container}>
      <Text variant="titleSmall" style={{ color: cores.text }}>
        {rotulo}
        {obrigatorio ? <Text style={{ color: cores.danger }}> *</Text> : null}
      </Text>

      <TouchableRipple
        onPress={() => setAberto(true)}
        accessibilityRole="button"
        accessibilityLabel={`${rotulo}: ${selecionada?.rotulo ?? placeholder}. Toque para escolher.`}
        style={[
          styles.campo,
          { borderColor: erro ? cores.danger : cores.border, backgroundColor: cores.surface },
        ]}
      >
        <View style={styles.linhaCampo}>
          {icone ? <Icon source={icone} size={24} color={cores.textSecondary} /> : null}
          <Text
            variant="bodyLarge"
            style={[styles.textoCampo, { color: selecionada ? cores.text : cores.textSecondary }]}
            numberOfLines={1}
          >
            {selecionada?.rotulo ?? placeholder}
          </Text>
          <Icon source="chevron-down" size={28} color={cores.text} />
        </View>
      </TouchableRipple>

      {erro ? (
        <HelperText type="error" visible>
          {erro}
        </HelperText>
      ) : null}

      <Portal>
        <Dialog visible={aberto} onDismiss={() => setAberto(false)} style={styles.dialogo}>
          <Dialog.Title>{rotulo}</Dialog.Title>
          <Dialog.ScrollArea style={styles.area}>
            <ScrollView>
              {opcoes.length === 0 ? (
                <Text variant="bodyLarge" style={styles.vazio}>
                  Nenhuma opção disponível.
                </Text>
              ) : null}
              {opcoes.map((opcao) => {
                const marcada = opcao.valor === valor;
                return (
                  <TouchableRipple
                    key={String(opcao.valor)}
                    disabled={opcao.desabilitado}
                    onPress={() => {
                      aoSelecionar(opcao.valor);
                      setAberto(false);
                    }}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: marcada, disabled: opcao.desabilitado }}
                    style={[
                      styles.opcao,
                      { borderBottomColor: cores.border },
                      marcada && { backgroundColor: cores.primarySoft },
                    ]}
                  >
                    <View style={styles.linhaOpcao}>
                      <Icon
                        source={marcada ? 'radiobox-marked' : 'radiobox-blank'}
                        size={26}
                        color={opcao.desabilitado ? cores.border : cores.primary}
                      />
                      <View style={styles.textosOpcao}>
                        <Text
                          variant="bodyLarge"
                          style={{ color: opcao.desabilitado ? cores.textSecondary : cores.text }}
                        >
                          {opcao.rotulo}
                        </Text>
                        {opcao.descricao ? (
                          <Text variant="bodySmall" style={{ color: cores.textSecondary }}>
                            {opcao.descricao}
                          </Text>
                        ) : null}
                      </View>
                    </View>
                  </TouchableRipple>
                );
              })}
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <AppButton titulo="Fechar" variante="texto" onPress={() => setAberto(false)} />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: espaco.xs },
  campo: {
    borderWidth: 1.5,
    borderRadius: raio.campo,
    minHeight: 56,
    justifyContent: 'center',
    paddingHorizontal: espaco.md,
  },
  linhaCampo: { flexDirection: 'row', alignItems: 'center', gap: espaco.sm },
  textoCampo: { flex: 1 },
  dialogo: { maxHeight: '85%' },
  area: { paddingHorizontal: 0, maxHeight: 420 },
  vazio: { padding: espaco.md },
  opcao: {
    minHeight: 56,
    paddingHorizontal: espaco.lg,
    paddingVertical: espaco.sm,
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  linhaOpcao: { flexDirection: 'row', alignItems: 'center', gap: espaco.md },
  textosOpcao: { flex: 1 },
});
