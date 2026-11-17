import { useLocalSearchParams } from 'expo-router';

import { ProdutosMenuSimplificado } from '@/features/produtos/screens/ProdutosMenuSimplificado';
import { ProdutosScreen } from '@/features/produtos/screens/ProdutosScreen';
import { useModo } from '@/hooks/useModo';

export default function ProdutosRoute() {
  const { simplificado } = useModo();
  const { ver } = useLocalSearchParams<{ ver?: string }>();
  return simplificado && ver !== 'lista' ? <ProdutosMenuSimplificado /> : <ProdutosScreen />;
}
