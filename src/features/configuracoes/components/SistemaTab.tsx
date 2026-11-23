import Constants from 'expo-constants';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native-paper';

import { ConfirmDialog } from '@/components/feedback/ConfirmDialog';
import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { InfoRow } from '@/components/ui/InfoRow';
import { useAppTheme } from '@/constants/theme';
import { useAuthStore } from '@/stores/authStore';

export function SistemaTab() {
  const { cores } = useAppTheme();
  const usuario = useAuthStore((s) => s.usuario);
  const logout = useAuthStore((s) => s.logout);
  const [confirmandoSaida, setConfirmandoSaida] = useState(false);

  return (
    <AppCard>
      <Text variant="titleLarge" style={{ color: cores.navy }}>
        Sistema
      </Text>

      <InfoRow
        rotulo="Usuário"
        valor={usuario?.nome ?? '—'}
        icone="account-outline"
      />

      <InfoRow
        rotulo="Versão"
        valor={Constants.expoConfig?.version ?? '1.0.0'}
        icone="information-outline"
      />

      <AppButton
        titulo="Sobre o aplicativo"
        icone="information-outline"
        variante="secundario"
        onPress={() => router.push('/sobre')}
      />

      <AppButton
        titulo="Sair da conta"
        icone="logout"
        variante="perigo"
        onPress={() => setConfirmandoSaida(true)}
      />

      <ConfirmDialog
        visivel={confirmandoSaida}
        titulo="Sair da conta?"
        mensagem="Você vai precisar digitar o e-mail e a senha para entrar de novo."
        textoConfirmar="Sim, sair"
        perigo
        aoConfirmar={() => {
          setConfirmandoSaida(false);
          logout();
        }}
        aoCancelar={() => setConfirmandoSaida(false)}
      />
    </AppCard>
  );
}