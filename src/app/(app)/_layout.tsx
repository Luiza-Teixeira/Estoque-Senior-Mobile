import { Redirect, Stack } from 'expo-router';

import { useAuthStore } from '@/stores/authStore';

export default function AppLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) return <Redirect href="/login" />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="configuracoes" />
      <Stack.Screen name="sobre" />
    </Stack>
  );
}
