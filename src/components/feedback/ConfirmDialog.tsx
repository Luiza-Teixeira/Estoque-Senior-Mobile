import { StyleSheet } from 'react-native';
import { Dialog, Portal, Text } from 'react-native-paper';

import { AppButton } from '@/components/ui/AppButton';
import { espaco } from '@/constants/spacing';

interface ConfirmDialogProps {
  visivel: boolean;
  titulo: string;
  mensagem: string;
  textoConfirmar?: string;
  perigo?: boolean;
  carregando?: boolean;
  aoConfirmar: () => void;
  aoCancelar: () => void;
}

export function ConfirmDialog({
  visivel,
  titulo,
  mensagem,
  textoConfirmar = 'Confirmar',
  perigo = false,
  carregando = false,
  aoConfirmar,
  aoCancelar,
}: ConfirmDialogProps) {
  return (
    <Portal>
      <Dialog visible={visivel} onDismiss={aoCancelar}>
        <Dialog.Title>{titulo}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyLarge">{mensagem}</Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.acoes}>
          <AppButton
            titulo="Cancelar"
            variante="secundario"
            onPress={aoCancelar}
            style={styles.botao}
          />
          <AppButton
            titulo={textoConfirmar}
            variante={perigo ? 'perigo' : 'primario'}
            onPress={aoConfirmar}
            loading={carregando}
            disabled={carregando}
            style={styles.botao}
          />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  acoes: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: espaco.sm,
    paddingHorizontal: espaco.lg,
  },
  botao: { marginLeft: 0 },
});
