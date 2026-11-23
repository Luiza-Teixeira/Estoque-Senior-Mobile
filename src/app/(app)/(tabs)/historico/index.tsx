import { useLocalSearchParams } from 'expo-router';

import { HistoricoMenuSimplificado } from '@/features/acompanhamento/screens/HistoricoMenuSimplificado';
import { HistoricoScreen } from '@/features/acompanhamento/screens/HistoricoScreen';
import { useModo } from '@/hooks/useModo';

export default function HistoricoRoute() {
  const { simplificado } = useModo();
  const { ver } = useLocalSearchParams<{ ver?: string }>();
  return simplificado && ver !== 'lista' ? <HistoricoMenuSimplificado /> : <HistoricoScreen />;
}
