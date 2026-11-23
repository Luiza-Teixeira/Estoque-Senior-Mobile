import { useLocalSearchParams } from 'expo-router';

import { EstoqueMenuSimplificado } from '@/features/estoque/screens/EstoqueMenuSimplificado';
import { EstoqueScreen } from '@/features/estoque/screens/EstoqueScreen';
import { useModo } from '@/hooks/useModo';

export default function EstoqueRoute() {
  const { simplificado } = useModo();
  const { ver } = useLocalSearchParams<{ ver?: string }>();
  return simplificado && ver !== 'lista' ? <EstoqueMenuSimplificado /> : <EstoqueScreen />;
}
