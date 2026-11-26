import { useLocalSearchParams } from 'expo-router';

import { EntradaMercadoriaScreen } from '@/features/estoque/screens/EntradaMercadoriaScreen';

export default function EntradaRoute() {
  const { produtoId } = useLocalSearchParams<{ produtoId?: string }>();
  return <EntradaMercadoriaScreen produtoIdInicial={produtoId ? Number(produtoId) : undefined} />;
}
