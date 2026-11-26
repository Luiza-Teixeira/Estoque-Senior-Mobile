import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/nunito';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { ReactNode, useMemo } from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { FeedbackSnackbar } from '@/components/feedback/FeedbackSnackbar';
import { criarTema } from '@/constants/theme';
import { queryClient } from '@/services/queryClient';
import { usePreferenciasStore } from '@/stores/preferenciasStore';

export function AppProviders({ children }: { children: ReactNode }) {
  const [fontesCarregadas] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  const escalaTexto = usePreferenciasStore((s) => s.escalaTexto);
  const altoContraste = usePreferenciasStore((s) => s.altoContraste);

  const tema = useMemo(
    () => criarTema({ escalaTexto, altoContraste }),
    [escalaTexto, altoContraste]
  );

  if (!fontesCarregadas) return null;

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={tema}>
          <StatusBar style="light" />
          {children}
          <FeedbackSnackbar />
        </PaperProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}