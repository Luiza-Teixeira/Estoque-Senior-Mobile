import { useLocalSearchParams } from 'expo-router';

import { ProdutoDetalheScreen } from '@/features/produtos/screens/ProdutoDetalheScreen';

export default function ProdutoDetalheRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ProdutoDetalheScreen id={Number(id)} />;
}
