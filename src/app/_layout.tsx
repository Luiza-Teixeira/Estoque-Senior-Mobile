import { Stack } from 'expo-router';
import { useEffect } from 'react';

import { LoadingState } from '@/components/feedback/LoadingState';
import { AppProviders } from '@/providers/AppProviders';
import { useAuthStore } from '@/stores/authStore';

export default function RootLayout() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}

function RootNavigator() {
  const carregando = useAuthStore((s) => s.carregando);
  const restaurarSessao = useAuthStore((s) => s.restaurarSessao);

  useEffect(() => {
    restaurarSessao();
  }, [restaurarSessao]);

  if (carregando) return <LoadingState mensagem="Abrindo o Estoque Sênior..." />;

  return <Stack screenOptions={{ headerShown: false }} />;
}