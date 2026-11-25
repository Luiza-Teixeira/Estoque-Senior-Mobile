import { useLocalSearchParams } from 'expo-router';

import { VendasMenuSimplificado } from '@/features/vendas/screens/VendasMenuSimplificado';
import { VendasScreen } from '@/features/vendas/screens/VendasScreen';
import { useModo } from '@/hooks/useModo';

export default function VendasRoute() {
  const { simplificado } = useModo();
  const { ver } = useLocalSearchParams<{ ver?: string }>();
  return simplificado && ver !== 'lista' ? <VendasMenuSimplificado /> : <VendasScreen />;
}
